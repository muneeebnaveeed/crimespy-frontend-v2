import axios from "axios";
import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { object } from "joi";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteProductDisclosure } from "store/routes/products/actions";

function VerifyPost({ isOpen, toggle, post }) {
    console.log(post.verified);
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>Verify Post</ModalHeader>
            <ModalBody>
                <FormGroup check inline>
                    <Label check>
                        <Input
                            type="checkbox"
                            //defaultChecked={Object.values(post.verified).filter(Boolean).length >= 2}
                        />{" "}
                        Verify post
                    </Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="light" w="55.5px" size="sm" onClick={toggle}>
                    Close
                </Button>
                <Button color="light" w="55.5px" size="sm" onClick={toggle} color="primary">
                    Submit
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default VerifyPost;
