import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, getLoggedInUser } from "helpers/auth";
import { useModifiedQuery } from "helpers/query";
import { Col } from "reactstrap";
import { Row } from "reactstrap/lib";
import { Else, If, Then } from "react-if";
import axios from "axios";
const geofire = require("geofire-common");

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
    const posts = [];

    const user = getLoggedInUser();

    const center = [user.latitude, user.longitude];

    const radius = 10 * 1000;
    const bounds = geofire.geohashQueryBounds(center, radius);
    //console.log("lalalala", center, bounds);
    const promises = [];
    for (const b of bounds) {
        const q = await db.collection("feeds").orderBy("geohash").startAt(b[0]).endAt(b[1]);
        //console.log(q.get());
        promises.push(q.get());
    }
    //console.log("here is what u need", promises);
    const snapshots = await Promise.all(promises);
    const matchingDocs = [];

    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            //console.log(doc.data());
            const lat = parseFloat(doc.get("latitude"));
            const lng = parseFloat(doc.get("longitude"));
            //console.log(lat, lng);
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            console.log("distances ", distanceInKm, distanceInM);
            if (distanceInM <= radius) {
                matchingDocs.push({ id: doc.id, ...doc.data() });
            } else {
                console.log("condition not matching", distanceInM, radius);
            }
        }
    }
    return matchingDocs;

    // return axios.get(`https://crimespy.herokuapp.com/posts`).then((res) => res.data);
};

function Posts(props) {
    const posts = useModifiedQuery("feeds", fetchPosts);
    console.log("to be tested", posts);
    // const users = useModifiedQuery("users", fetchUsers);
    //console.log("weasdadas", posts);
    // console.log("pendahoe", users);

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
