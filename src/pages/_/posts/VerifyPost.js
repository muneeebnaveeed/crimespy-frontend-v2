import Button from "components/Common/Button";
import React, { useCallback, useState } from "react";
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
    // if (!post.peopleVerifiedPost) return false;
    // return Object.values(post.peopleVerifiedPost).filter(Boolean).length >= 2;
    if (post.postVerified === true) return true;
  }, [post]);
  const [isVerified, setisVerified] = useState(null);
  const onSubmit = () => {
    console.log(isVerified);
  };

  const onchange = (bool) => {
    setisVerified(bool);
    console.log(isVerified);
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader>Verify Post</ModalHeader>
      <ModalBody>
        <FormGroup check inline>
          <Label check>
            <Input
              type="checkbox"
              defaultChecked={calculateIsVerified()}
              onChange={(e) => onchange(e.target.checked)}
            />
            Verify post
          </Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="light" w="55.5px" size="sm" onClick={toggle}>
          Close
        </Button>
        <Button w="55.5px" size="sm" onClick={onSubmit} color="primary">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default VerifyPost;
