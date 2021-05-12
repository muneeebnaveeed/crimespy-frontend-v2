import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import { Col } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then } from "react-if";

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
    const snapshot = await db
        .collection("posts")
        .doc(user.uid)
        .collection("userPosts")
        .orderBy("timestamp", "desc")
        .get();
    const docs = await snapshot.docs;

    return new Promise((resolve, reject) => {
        const posts = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        resolve(posts);
    });
};

function Posts(props) {
    const posts = useModifiedQuery("posts", fetchPosts);
    const users = useModifiedQuery("users",fetchUsers);

    return (
        <>

            {user.

            }




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
                        {!posts.data?.length ? "No posts available" : "You've reached the end of the internet"}
                    </p>
                </Else>
            </If>
        </>
    );
}

export default Posts;
