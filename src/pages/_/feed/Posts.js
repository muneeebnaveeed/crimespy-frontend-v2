import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import { Col } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then } from "react-if";
import axios from "axios";

const fetchPosts = async () => {
    // const posts = [];
    const user = getLoggedInUser();

    return axios.get(`https://crimespy.herokuapp.com/posts/id/${user.uid}`).then((res) => res.data);
};

function Posts(props) {
    const posts = useModifiedQuery("posts", fetchPosts);
    console.log("weasdadas", posts);
    return (
        <>
            {" "}
            {posts.data?.map((post, i) => (
                <Row key={i}>
                    <Col xs={12} className="d-flex justify-content-center">
                        <Post
                            key={post.id}
                            id={post.id}
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
        </>
    );
}

export default Posts;
