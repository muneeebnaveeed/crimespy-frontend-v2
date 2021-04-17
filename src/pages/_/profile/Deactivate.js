import React, { useState, useEffect, useRef } from "react";
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
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { getLoggedInUser } from "helpers/auth";
const DeactivateAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        //console.log(getLoggedInUser());
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} size="lg" block outline>
                Deactivate Account
            </Button>
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader>Deactivate Account</ModalHeader>
                <ModalBody>Are you sure you want to Deactivate Account?</ModalBody>
                <ModalFooter>
                    <Button color="light" size="sm" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button w="55.5px" size="sm" type="submit" loading={false}>
                        De-Activate
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default DeactivateAccount;
