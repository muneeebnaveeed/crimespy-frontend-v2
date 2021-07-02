/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'components/Common/Button';
import React from 'react';
import { FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function ViewPost({ isOpen, toggle, post }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>Post</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Title :</label>
                    <Label>{post.Title}</Label>
                </FormGroup>
                <FormGroup>
                    <label>Location :</label>
                    <Label>{post.location}</Label>
                </FormGroup>
                <FormGroup>
                    <label>Detail :</label>
                    <Input
                        type="textarea"
                        name="text"
                        onChange={null}
                        value={post.description}
                        style={{ height: 150 }}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Coordinates :</label>
                    <Label>
                        {post.longitude} , {post.latitude}
                    </Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button w="55.5px" size="sm" onClick={toggle} color="primary">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ViewPost;
