import { getLoggedInUser } from "helpers/auth";
import React, { useCallback, useState } from "react";
import alternate from "../../../assets/images/default.jpg";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardSubtitle,
  CardImg,
} from "reactstrap";

const UserDisplay = ({ user }) => (
  <>
    <Card>
      {console.log("user", user)}
      <CardBody>
        <Row>
          <div className="d-flex">
            {user?.photoUrl != null ? (
              <img
                className="rounded-circle header-profile-user size-lg mr-1"
                style={{ height: 150, width: 150 }}
                src={user?.photoUrl}
                alt="Header Avatar"
              />
            ) : (
              <img
                className="rounded-circle header-profile-user size-lg mr-1"
                style={{ height: 150, width: 150 }}
                src={alternate}
                alt="Header Avatar"
              />
            )}
            {/* <img
                            className="rounded-circle header-profile-user size-lg mr-1"
                            style={{ height: 150, width: 150 }}
                            src={user?.photoUrl!=null}
                            alt="Header Avatar"
                        /> */}
            <div className="d-flex mt-4 ml-2 flex-column">
              <h1>{user?.displayName}</h1>
              <p>{user?.dob}</p>
              <p>{user?.gender}</p>
              <p>{user?.phoneNumber}</p>
            </div>
          </div>
        </Row>
      </CardBody>
    </Card>
  </>
);
export default UserDisplay;
