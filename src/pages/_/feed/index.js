import React, { useState, useEffect } from "react";
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

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <div className="PostCreation">
                                <p>u can make post here</p>
                                <button onClick={toggle}>Make Post</button>
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
