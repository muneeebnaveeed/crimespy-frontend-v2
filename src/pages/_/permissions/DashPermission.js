import React, { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { Form, FormGroup, Input, Card, CardBody, Label } from 'reactstrap';
import useDisclosure from 'helpers/useDisclosure';
import { showSuccessToast } from 'helpers/showToast';
import { db, getLoggedInUser, setSession } from 'helpers/auth';
import { useQueryClient } from 'react-query';
import Button from 'components/Common/Button';
import { useHistory } from 'react-router-dom';
import { permissions } from 'config';
import CreatePreset from './CreatePreset';

const DashPermissions = ({ user }) => {
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const queryClient = useQueryClient();

    const loggedInUser = useMemo(() => getLoggedInUser(), []);

    const handleSubmit = async (values) => {
        setIsUpdatingUser(true);

        try {
            const userRef = db.collection('users').doc(user.uid);
            await userRef.update({ permissions: values });
            if (user.uid === loggedInUser.uid) {
                const updatedUser = await (await userRef.get()).data();
                setSession(updatedUser);
            }
            await queryClient.invalidateQueries(['user', user.uid]);
            showSuccessToast({ message: 'Permission updated successfully' });
        } catch (err) {
            console.error(err.message);
        }

        setIsUpdatingUser(false);
    };

    const formik = useFormik({
        initialValues: user.permissions,
        onSubmit: handleSubmit,
        validateOnChange: false,
    });

    const handleChange = (checked, permissionGroup, key) => {
        let updatedPermissions = formik.values?.[permissionGroup] ?? [];

        if (!checked) updatedPermissions = updatedPermissions.filter((permission) => permission !== key);
        else if (checked && !updatedPermissions.includes(key)) updatedPermissions.push(key);

        formik.setFieldValue(permissionGroup, updatedPermissions);
    };

    // useEffect(() => console.log("formikValues() [values:%o]", formik.values), []);
    const { isOpen, toggle } = useDisclosure();

    console.log('formikValues() [values:%o]', formik.values);

    return (
        <>
            <Card>
                <CardBody>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <div className="d-flex flex-wrap mb-4" style={{ gap: '5rem' }}>
                            {Object.keys(permissions).map((permissionGroup, i) => {
                                if (permissions[permissionGroup].length)
                                    return (
                                        <div key={`permission-${i}`}>
                                            <div className="page-title-box pb-0">
                                                <h4>{permissionGroup}</h4>
                                            </div>
                                            {permissions[permissionGroup].map((permission, j) => (
                                                <div className="mb-2" key={`permissions-group-${i * j}`}>
                                                    <FormGroup check>
                                                        <Label check style={{ cursor: 'pointer' }}>
                                                            <Input
                                                                type="checkbox"
                                                                name={permission.key}
                                                                id={permission.key}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e.target.checked,
                                                                        permissionGroup,
                                                                        permission.key
                                                                    )
                                                                }
                                                                checked={formik.values[permissionGroup]?.includes?.(
                                                                    permission.key
                                                                )}
                                                                style={{ cursor: 'pointer' }}
                                                            />{' '}
                                                            {permission.label}
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            ))}
                                        </div>
                                    );

                                return null;
                            })}
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button color="success" type="button" onClick={!isUpdatingUser ? toggle : null}>
                                <i className="fas fa-save" /> Save Preset
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <CreatePreset user={user} isOpen={isOpen} toggle={toggle} permissions={formik.values} />
        </>
    );
};
export default DashPermissions;
