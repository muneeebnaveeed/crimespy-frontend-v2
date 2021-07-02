import Button from 'components/Common/Button';
import React, { useMemo, useState } from 'react';
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
} from 'reactstrap';
import { permissions } from 'config';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { db, getLoggedInUser } from 'helpers/auth';
import { showSuccessToast } from 'helpers/showToast';

const EditPreset = ({ isOpen, toggle, preset, user }) => {
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const handleSubmit = async (values) => {
        setIsUpdatingUser(true);
        console.log(values.permissions);

        try {
            const presets = db.collection('presets').doc(values.title.toLowerCase());
            await presets
                .update({ permissions: values.permissions })
                .then(function () {
                    console.log('updated Presets info successfully');
                })
                .catch(function (error) {
                    console.log(`Errors post info ${error}`);
                });
            // if (user.id === loggedInUser) {
            //     const updatedUser = await (await userRef.get()).data();
            //     setSession(updatedUser);
            // }
            // await queryClient.invalidateQueries(["user", user.uid]);
            showSuccessToast({ message: 'Permission updated Successfully' });
        } catch (err) {
            console.error(err.message);
        }

        setIsUpdatingUser(false);
    };

    const formik = useFormik({
        initialValues: preset,
        onSubmit: handleSubmit,
        validateOnChange: false,
    });

    const handleChange = (checked, permissionGroup, key) => {
        const permissionsInFormik = formik.values.permissions;
        let updatedPermissions = permissionsInFormik[permissionGroup];

        if (!checked) updatedPermissions = updatedPermissions.filter((permission) => permission !== key);
        else if (checked && !updatedPermissions.includes(key)) updatedPermissions.push(key);

        const updatedPermissionsInFormik = { ...permissionsInFormik, [permissionGroup]: updatedPermissions };

        formik.setFieldValue('permissions', updatedPermissionsInFormik);
        console.log(updatedPermissionsInFormik);
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader>Edit Preset</ModalHeader>
                <Form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label>Title</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-tags " />
                                    </div>
                                </InputGroupAddon>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    invalid={Boolean(formik.errors.title)}
                                />
                                <FormFeedback>{formik.errors.title}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <div className="mx-2" style={{ maxHeight: 240, overflowY: 'scroll' }}>
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
                                                                    checked={formik.values.permissions[
                                                                        permissionGroup
                                                                    ].includes(permission.key)}
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
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button w="72px" color="primary" size="sm" type="submit" loading={isUpdatingUser}>
                            Submit
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
};
export default EditPreset;
