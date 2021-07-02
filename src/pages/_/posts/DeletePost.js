import Button from 'components/Common/Button';
import { db } from 'helpers/auth';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function DeleteUser({ isOpen, toggle, postId }) {
    const [isDeletePost, setIsDeletePost] = useState(false);

    const queryClient = useQueryClient();

    const toggleModal = useCallback(() => {
        if (!isDeletePost) toggle();
    }, [isDeletePost, toggle]);
    const handleDeletePost = async () => {
        setIsDeletePost(true);

        try {
            await db.collection('feeds').doc(postId).delete();
            await queryClient.invalidateQueries('feeds');
            showSuccessToast({ message: 'Post has been deleted successfully' });
        } catch (err) {
            showErrorToast({ message: 'Unable to delete user' });
        }
        setIsDeletePost(false);
        console.log('will do it in server');
    };

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered>
            <ModalHeader>Delete Post</ModalHeader>
            <ModalBody>
                <Label>Are you sure you want to delete this post?</Label>
            </ModalBody>
            <ModalFooter>
                <Button color="light" w="55.5px" size="sm" onClick={toggleModal}>
                    No
                </Button>
                <Button w="55.5px" color="primary" size="sm" onClick={handleDeletePost} loading={isDeletePost}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteUser;
