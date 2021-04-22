import { getLoggedInUser } from "helpers/auth";
import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col, CardHeader, CardSubtitle, CardImg } from "reactstrap";

const UserDisplay = ({ user }) => {
    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <div className="d-flex">
                            <img
                                className="rounded-circle header-profile-user size-lg mr-1"
                                style={{ height: 150, width: 150 }}
                                src={getLoggedInUser().photoURL}
                                alt="Header Avatar"
                            />
                            <div className="d-flex flex-column">
                                <h1>Muneeb Naveed</h1>
                                <p>Male</p>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};
export default UserDisplay;