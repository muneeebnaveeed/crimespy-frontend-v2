import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";

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
