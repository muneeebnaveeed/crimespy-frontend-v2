import React, { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { api, useModifiedQuery } from "helpers/query";
import { Col } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then, When } from "react-if";
import axios from "axios";
import useDisclosure from "helpers/useDisclosure";
import EditPost from "./EditPost.js";

// const fetchUsers = async () => {
//     const snapshot = db.collection("users").get();
//     const docs = (await snapshot).docs;

//     return new Promise((resolve, reject) => {
//         const users = docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         resolve(users);
//     });
// };

const fetchPosts = async () => {
    const user = getLoggedInUser();

    return axios
        .get(`https://crimespy.herokuapp.com/posts/lat/${user.latitude}/lon/${user.longitude}`)
        .then((res) => res.data);
};

function Posts(props) {
    const posts = useModifiedQuery("feeds", fetchPosts);
    const editPostDisclosure = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <>
            {posts.data?.map((post, i) => {
                console.log("ownerId", post.ownerId);
                return (
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
                                postVerified={post.postVerified}
                            />
                        </Col>
                    </Row>
                );
            })}
            <If condition={posts.isLoading}>
                <Then>
                    <p className="mt-4 text-center">Fetching posts...</p>
                </Then>
                <Else>
                    <If condition={posts.isError}>
                        <Then>
                            <p className="mt-4 text-center">
                                Unable to fetch posts: <b>{posts.error?.message}</b>
                            </p>
                        </Then>
                        <Else>
                            <p className="mt-4 text-center">
                                {!posts.data?.length ? "No posts available" : "You've reached the end of the internet"}
                            </p>
                        </Else>
                    </If>
                </Else>
            </If>
        </>
    );
}

export default Posts;
