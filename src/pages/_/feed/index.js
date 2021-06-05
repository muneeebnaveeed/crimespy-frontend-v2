import React, { useState, useEffect, useRef, useMemo } from "react";
import Post from "./Post";
import Breadcrumbs from "components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";

import CreatePost from "./CreatePost";
import useDisclosure from "helpers/useDisclosure";
import Posts from "./Posts";
import { getLoggedInUser } from "helpers/auth";
import usePermissions from "helpers/usePermissions";
import { When } from "react-if";
import api from "helpers/query";
import axios from "axios";

const breadcrumbItems = [
    {
        title: "Crimespy",
        link: "/",
    },
    {
        title: "Feed",
        link: "/feed",
    },
];

function Feed() {
    const { isOpen, toggle } = useDisclosure();
    const whatsOnYourMindRef = useRef();

    // useEffect(() => {
    //     const data = {
    //         firstName: 'Finn',
    //         lastName: 'Williams'
    //     }
    //     axios.post("https://crimespy.herokuapp.com/users/id/abc", data).then(res => {
    //         console.log(res)
    //     })

    // }, [])

    const isAuthorized = usePermissions("feed");

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />
                    <When condition={isAuthorized("create")}>
                        <Row>
                            <Col xs={12}>
                                <div
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#fff",
                                        cursor: "pointer",
                                    }}
                                    className="rounded d-flex justify-content-center align-items-center shadow-sm p-4"
                                    onClick={toggle}
                                    onMouseEnter={() => {
                                        whatsOnYourMindRef.current.classList.toggle("whatsOnYourMind-active", true);
                                    }}
                                    onMouseLeave={() => {
                                        whatsOnYourMindRef.current.classList.toggle("whatsOnYourMind-active", false);
                                    }}
                                >
                                    <h1
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                        }}
                                        className="m-0 mr-1"
                                        ref={whatsOnYourMindRef}
                                    >
                                        What's on your mind?
                                        <i className="fas fa-plus" />
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                    </When>
                    <Posts />
                </Container>
            </div>
            {isAuthorized("create") && <CreatePost isOpen={isOpen} toggle={toggle} />}{" "}
        </>
    );
}

export default Feed;
