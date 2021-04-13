import React from "react";
import Post from "./Post";
import Breadcrumbs from "components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";

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
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col xs={12} className="align-items-center">
                        <Post
                            username="wasef"
                            comments="This is comment"
                            profileUrl="https://graph.facebook.com/3839782289438433/picture"
                            description="Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post"
                            photoURL="https://firebasestorage.googleapis.com/v0/b/crimespy-6fc6f.appspot.com/o/images%2Fundefinedvb3tOs7tZZ.jpg?alt=media&token=cc8e3bb4-3f7e-4e50-94ab-ea1ecb84b067"
                        />
                        <Post
                            username="wasef"
                            comments="This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment This is comment"
                            profileUrl="https://graph.facebook.com/3839782289438433/picture"
                            description="Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post Hello there THis is first Post"
                            photoURL="https://firebasestorage.googleapis.com/v0/b/crimespy-6fc6f.appspot.com/o/images%2Fundefinedvb3tOs7tZZ.jpg?alt=media&token=cc8e3bb4-3f7e-4e50-94ab-ea1ecb84b067"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Feed;
