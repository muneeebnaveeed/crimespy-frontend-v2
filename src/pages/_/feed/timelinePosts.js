import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import { Col } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then } from "react-if";
import Axios from "axios";

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

const fetchPosts = async () => {
    // const posts = [];
    const user = getLoggedInUser();

    return Axios.get(`https://crimespy.herokuapp.com/posts/id/${user.id}`).then((res) => res.data);
};

function TimeLinePosts(props) {
    // const posts = useModifiedQuery("posts", fetchPosts);

    return <div>This is timeline</div>;
}

export default TimeLinePosts;
