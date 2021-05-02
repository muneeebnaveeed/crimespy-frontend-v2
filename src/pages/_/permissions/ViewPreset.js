import Button from "components/Common/Button";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    FormText,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
} from "reactstrap";

import { preSetSchema } from "helpers/schema";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { db, getLoggedInUser, setSession } from "helpers/auth";
import { showSuccessToast } from "helpers/showToast";

const ViewPreset = ({ isOpen, toggle, preset }) => {
    console.log(preset.permissions);
    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader>Permissions</ModalHeader>

                <ModalBody>
                    <div className="mx-2" style={{ maxHeight: 240, overflowY: "scroll" }}>
                        {
                            /* {preset.permissions.map((permission, i) => console.log(permission))} */
                            Object.keys(preset.permissions).map((permissionGroup, i) => {
                                if (preset.permissions[permissionGroup].length) {
                                    return (
                                        <div key={`preset.permission-${i}`}>
                                            <div className="page-title-box pb-0">
                                                <h4>{permissionGroup}</h4>
                                            </div>
                                            {preset.permissions[permissionGroup].map((permission, j) => {
                                                return (
                                                    <div className="mb-2" key={`preset.permissions-group-${i * j}`}>
                                                        <Label>{permission}</Label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default ViewPreset;
