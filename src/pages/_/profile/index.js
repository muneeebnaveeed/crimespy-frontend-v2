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
import UpdateDp from "./UpdateImage";

const user = getLoggedInUser();

const breadcrumbItems = [
  { title: "Crimespy", link: "/" },
  { title: "profile", link: "/profile" },
];

const Profile = () => {
  //console.log(user);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col xs={12}>
              <UserDisplay user={user} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <UpdateDp />
              <SetuserName />
              <SetBio />
              <Deactivate />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Profile;
