import { getLoggedInUser } from "helpers/auth";
import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col, CardHeader, CardSubtitle, CardImg } from "reactstrap";

const UserDisplay = ({ user }) => {
    console.log("right here mofo", user);
    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <div className="d-flex">
                            <img
                                className="rounded-circle header-profile-user size-lg mr-1"
                                style={{ height: 150, width: 150 }}
                                src={user?.photoUrl}
                                alt="Header Avatar"
                            />
                            <div className="d-flex mt-4 ml-2 flex-column">
                                <h1>{user?.displayName}</h1>
                                <p>{user?.dob}</p>
                                <p>{user?.gender}</p>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};
export default UserDisplay;
