import React, { useState, useEffect, useRef, useMemo } from "react";
import { Formik, useFormik } from "formik";
import {
    Col,
    Collapse,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Card,
    CardBody,
    Label,
    Row,
} from "reactstrap";
import useDisclosure from "helpers/useDisclosure";
import CreatePreset from "./CreatePreset";
import { userPermissionSchema } from "helpers/schema";
import { showSuccessToast } from "helpers/showToast";
import { db, setSession, getLoggedInUser } from "helpers/auth";
import { useQueryClient } from "react-query";
import Button from "components/Common/Button";
import { useHistory } from "react-router";
import { ButtonGroup } from "reactstrap/lib";

const permissions = {
    map: [],
    users: [
        { key: "create", label: "Create Users" },
        { key: "edit", label: "Give Permissions" },
        { key: "delete", label: "Delete User" },
    ],
    feed: [
        { key: "verify", label: "Verify Posts" },
        { key: "deleteAll", label: "Delete Others Post" },
        { key: "create", label: "Create Post" },
        { key: "createComment", label: "Comment on Post" },
        { key: "createVote", label: "up and down vote" },
    ],
    chart: [
        { key: "create", label: "Create Crime Chart" },
        { key: "delete", label: "Delete Crime Chart" },
    ],
};

// const getFormikInitialValues = () => {
//     const permissionGroups = Object.keys(permissions);
//     const perm = permissionGroups.map((permissionGroup) =>
//         permissions[permissionGroup].map((permission) => permission.key)
//     );
//     let computedPermissions = {};

//     permissionGroups.forEach((permissionGroup, index) => {
//         computedPermissions[permissionGroup] = perm[index];
//     });

//     console.log(computedPermissions);

//     return computedPermissions;
// };

const Permissions = ({ user }) => {
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const queryClient = useQueryClient();
    const history = useHistory();

    const loggedInUser = useMemo(() => getLoggedInUser(), []);

    const handleSubmit = async (values) => {
        setIsUpdatingUser(true);

        try {
            const userRef = db.collection("users").doc(user.uid);
            await userRef.update({ permissions: values });
            if (user.id === loggedInUser) {
                const updatedUser = await (await userRef.get()).data();
                setSession(updatedUser);
            }
            await queryClient.invalidateQueries(["user", user.uid]);
            showSuccessToast({ message: "Permission updated Successfully" });
        } catch (err) {
            console.error(err.message);
        }

        setIsUpdatingUser(false);
    };

    const handleChange = (checked, permissionGroup, key) => {
        let updatedPermissions = formik.values[permissionGroup];

        if (!checked) updatedPermissions = updatedPermissions.filter((permission) => permission !== key);
        else if (checked && !updatedPermissions.includes(key)) updatedPermissions.push(key);

        formik.setFieldValue(permissionGroup, updatedPermissions);
    };

    const formik = useFormik({
        initialValues: user.permissions,
        onSubmit: handleSubmit,
        validateOnChange: false,
    });

    useEffect(() => console.log(user.permissions), []);
    const { isOpen, toggle } = useDisclosure();
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
                        <div className="d-flex flex-wrap mb-4" style={{ gap: "5rem" }}>
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
                                                        <Label check style={{ cursor: "pointer" }}>
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
                                                                checked={formik.values[permissionGroup].includes(
                                                                    permission.key
                                                                )}
                                                                style={{ cursor: "pointer" }}
                                                            />{" "}
                                                            {permission.label}
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            ))}
                                        </div>
                                    );
                            })}
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button color="success" type="button" onClick={!isUpdatingUser ? toggle : null}>
                                <i class="fas fa-save" /> Save Preset
                            </Button>
                            <ButtonGroup>
                                <Button color="light" onClick={() => (!isUpdatingUser ? history.push("/users") : null)}>
                                    Go Back
                                </Button>
                                <Button w="118px" loading={isUpdatingUser} type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <CreatePreset isOpen={isOpen} toggle={toggle} permissions={formik.values} />
        </>
    );
};
export default Permissions;
