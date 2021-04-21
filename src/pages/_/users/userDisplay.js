import React, { useCallback, useState } from "react";
import { Container, Card, CardBody, Row, Col, CardHeader, CardSubtitle } from "reactstrap";

const UserDisplay = ({ Name, Email, Avatar }) => {
    return (
        <>
            <Card>
                <CardImg src={Avatar} alt="profile image" />
                <CardHeader>{Name}</CardHeader>
                <CardSubtitl>{Email}</CardSubtitl>
            </Card>
        </>
    );
};
export default UserDisplay;
