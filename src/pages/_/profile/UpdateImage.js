import React from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import {
  Col,
  Container,
  Label,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { db, getLoggedInUser, storage } from "helpers/auth";
import { showSuccessToast } from "helpers/showToast";
import SetuserName from "./SetName";
import Deactivate from "./Deactivate";
import SetBio from "./SetBio";
import UserDisplay from "../permissions/UserDisplay";
import useDisclosure from "helpers/useDisclosure";

const user = getLoggedInUser();

const UpdateDp = () => {
  const UpdateDp = useDisclosure();
  const handleImage = async (e) => {
    //console.log("Event ", e.target.files[0]);

    const selectedImageSrc = URL.createObjectURL(e.target.files[0]);
    //console.log("sdasdas", selectedImageSrc);
    const uploadTask = storage
      .ref(`users/profile_${user.id}.jpg`)
      .put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        // const postId = uuid();

        try {
          const imageUrl = await storage
            .ref()
            .child(`users/profile_${user.id}.jpg`)
            .getDownloadURL();

          const newPost = {
            photoUrl: imageUrl,
          };
          console.log("uploading");
          db.collection("users").doc(user.id).update(newPost);
          // await axios.post(`https://crimespy.herokuapp.com/posts`, newPost);

          showSuccessToast({ message: "Image has been Uploaded" });
          UpdateDp.toggle();
        } catch (err) {
          console.error(err.message);
        }
      }
    );
  };
  return (
    <>
      <Button
        onClick={UpdateDp.toggle}
        color="primary"
        style={{ marginBottom: "1rem" }}
        size="lg"
        block
        outline
      >
        Update Profile Image
      </Button>

      <Modal isOpen={UpdateDp.isOpen} toggle={UpdateDp.toggle} centered>
        <ModalHeader>Update Profile Image</ModalHeader>
        <ModalBody>
          <Input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImage}
            className="btn"

            // ref={}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={UpdateDp.toggle} color="primary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default UpdateDp;
