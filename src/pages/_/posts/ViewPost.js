import axios from "axios";
import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteProductDisclosure } from "store/routes/products/actions";

function DeleteUser({ isOpen, toggle, postId, Title, Discription, Location, Longitude, Latitude }) {
    const [isDeletePost, setIsDeletePost] = useState(false);

    const queryClient = useQueryClient();

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered>
            <ModalHeader>Post</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Title </Label>
                    <Label>{Title}</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Location </Label>
                    <Label>{Location}</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Detail </Label>
                    <Label>{Discription}</Label>
                </FormGroup>
                <FormGroup>
                    <Label>Coordinates </Label>
                    <Label>{(Longitude, Latitude)}</Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="light" w="55.5px" size="sm" onClick={toggleModal} color="primary">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteUser;
