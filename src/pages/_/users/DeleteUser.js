import axios from "axios";
import Button from "components/Common/Button";
import { db } from "helpers/auth";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteProductDisclosure } from "store/routes/products/actions";

function DeleteUser({ isOpen, toggle, userId }) {
    const [isDeletingUser, setIsDeletingUser] = useState(false);

    const queryClient = useQueryClient();

    const toggleModal = useCallback(() => {
        if (!isDeletingUser) toggle();
    }, [isDeletingUser, toggle]);

    const handleDeleteUser = async () => {
        setIsDeletingUser(true);

        try {
            // await axios.delete(`https://crimespy.herokuapp.com/users/id/${userId}`);
           
            await db.collection('users').doc(userId).delete().then(function () {
                console.log("delete Users info successfully");
            }).catch(function (error) {
                console.log(`Errors post info ${error}`);
            });
             await queryClient.invalidateQueries("users");
            showSuccessToast({ message: "User has been deleted successfully" });
        } catch (err) {
            showErrorToast({ message: "Unable to delete user" });
        }

        setIsDeletingUser(false);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered>
            <ModalHeader>Delete User</ModalHeader>
            <ModalBody>
                <Label>Are you sure you want to delete this user?</Label>
            </ModalBody>
            <ModalFooter>
                <Button color="light" w="55.5px" size="sm" onClick={toggleModal}>
                    No
                </Button>
                <Button w="55.5px" color="primary" size="sm" onClick={handleDeleteUser} loading={isDeletingUser}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteUser;
