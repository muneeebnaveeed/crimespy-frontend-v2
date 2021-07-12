import Button from "components/Common/Button";
import React, { useCallback } from "react";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function VerifyPost({ isOpen, toggle, post }) {
  const calculateIsVerified = useCallback(() => {
    if (!post.verified) return false;
    return Object.values(post.verified).filter(Boolean).length >= 2;
  }, [post]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader>Verify Post</ModalHeader>
      <ModalBody>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" defaultChecked={calculateIsVerified()} />
            Verify post
          </Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" w="55.5px" size="sm" onClick={toggle}>
          Close
        </Button>
        <Button w="55.5px" size="sm" onClick={toggle} color="primary">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default VerifyPost;
