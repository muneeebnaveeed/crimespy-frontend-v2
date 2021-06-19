import React, { useEffect, useState } from "react";
import Post from "../feed/Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import { Col, Container } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then } from "react-if";
import Axios from "axios";
import Breadcrumbs from "components/Common/Breadcrumb";
import { useSelector } from "react-redux";
import EditPost from "../feed/EditPost";
import UserDisplay from "../permissions/UserDisplay";

// const fetchPosts = async () => {
//     const user = getLoggedInUser();
//     const snapshot = await db
//         .collection("posts")
//         .doc(user.uid)
//         .collection("userPosts")
//         .orderBy("timestamp", "desc")
//         .get();
//     const docs = await snapshot.docs;

//     return new Promise((resolve, reject) => {
//         const posts = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         resolve(posts);
//     });
// };
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

const fetchPosts = async () => {
    const user = getLoggedInUser();
    return Axios.get(`https://crimespy.herokuapp.com/posts/id/${user.uid}`).then((res) => res.data);
};
const user = getLoggedInUser();

function TimeLinePosts(props) {
    const posts = useModifiedQuery("timeline", fetchPosts);
    const { editPostDisclosure } = useSelector((state) => state.Feed);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Time Line" breadcrumbItems={breadcrumbItems} />{" "}
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={user} />
                        </Col>
                    </Row>
                    {posts.data?.map((post, i) => (
                        <Row key={i}>
                            <Col xs={12} className="d-flex justify-content-center">
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    ownerId={post.ownerId}
                                    username={post.username}
                                    comments={post.comments}
                                    profileUrl={post.profileUrl}
                                    description={post.description}
                                    photoURL={post.mediaUrl}
                                    Title={post.Title}
                                    verified={post.verified}
                                />
                            </Col>
                        </Row>
                    ))}
                    <If condition={posts.isLoading}>
                        <Then>
                            <p className="mt-4 text-center">Fetching posts...</p>
                        </Then>
                        <Else>
                            <p className="mt-4 text-center">
                                {!posts.data?.length ? "No posts available" : "You've reached the end of the internet"}{" "}
                            </p>
                        </Else>
                    </If>
                </Container>
            </div>
            {editPostDisclosure && <EditPost />}
        </>
    );
}

export default TimeLinePosts;
