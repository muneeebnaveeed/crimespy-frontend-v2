import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import Breadcrumbs from "components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";

import CreatePost from "./CreatePost";
import useDisclosure from "helpers/useDisclosure";
import Posts from "./Posts";

const breadcrumbItems = [
    {
        title: "Crimespy",
        link: "/",
    },
    {
        title: "Feed",
        link: "/dashboard",
    },
];

function Feed() {
    const { isOpen, toggle } = useDisclosure();
    const whatsOnYourMindRef = useRef();

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <div
                                style={{ width: "100%", backgroundColor: "#fff", cursor: "pointer" }}
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
                                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                                    className="m-0 mr-1"
                                    ref={whatsOnYourMindRef}
                                >
                                    What's on your mind? <i className="fas fa-plus" />
                                </h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="align-items-center">
                            <Posts />
                        </Col>
                    </Row>
                </Container>
            </div>
            <CreatePost isOpen={isOpen} toggle={toggle} />
        </>
    );
}

export default Feed;
