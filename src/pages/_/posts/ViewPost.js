import axios from "axios";
import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteProductDisclosure } from "store/routes/products/actions";

function ViewPost({ isOpen, toggle, post }) {
    console.log(post);
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
                <Button color="light" w="55.5px" size="sm" onClick={toggle} color="primary">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ViewPost;
