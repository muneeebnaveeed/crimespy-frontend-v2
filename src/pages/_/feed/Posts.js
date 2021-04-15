import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";

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

    // useEffect(() => {
    //     const init = async () => {
    //         const posts = await fetchPosts();
    //         console.log(posts);
    //     };

    //     init();
    // }, []);

    console.log(posts.data);

    return (
        <div className="d-flex flex-column align-items-center">
            {posts.data?.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    comments={post.comments}
                    profileUrl={post.profileUrl}
                    description={post.description}
                    photoURL={post.mediaUrl}
                />
            ))}
            {posts.isLoading ? (
                <p className="mt-4 text-center">Fetching posts...</p>
            ) : (
                <p className="mt-4 text-center">
                    {posts.length ? "No more posts available" : "You've reached the end of the internet"}
                </p>
            )}
        </div>
    );
}

export default Posts;
