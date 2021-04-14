import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";

const fetchPosts = async () => {
    const user = getLoggedInUser();
    const postRef = db.collection("posts").doc(user.uid).collection("userPosts");

    const snapshot = await (await postRef.orderBy("timestamp", "desc").get()).docs;
    return new Promise((resolve, reject) => {
        const posts = [],
            i = 0;

        for (i of snapshot) {
            const post = snapshot[i];
            posts.push({ id: post.id, ...post.data() });
        }

        resolve(posts);
    });
};

function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const init = async () => {
            const posts = await fetchPosts();
            console.log(posts);
        };

        init();
    }, []);

    return posts.map(({ id, post }) => {
        return (
            <Post
                key={id}
                id={id}
                username={post.username}
                comments={post.comments}
                profileUrl={post.profileUrl}
                description={post.description}
                photoURL={post.mediaUrl}
            />
        );
    });
}

export default Posts;
