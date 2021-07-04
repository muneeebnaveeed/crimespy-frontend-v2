import React, { useCallback, useEffect, useState } from 'react';
import { db, getLoggedInUser } from 'helpers/auth';
import { api, useModifiedQuery } from 'helpers/query';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap/lib';
import { Else, If, Then, When } from 'react-if';
import axios from 'axios';
import useDisclosure from 'helpers/useDisclosure';
import haversine from 'haversine-distance';
import EditPost from './EditPost.js';
import Post from './Post';

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
let matchingDocs = [];
const fetchPosts = async () => {
   
    await navigator.geolocation.getCurrentPosition(async (position) => {
        // return axios
        //     .get(`https://crimespy.herokuapp.com/posts/lat/${position.coords.latitude}/lon/${position.coords.longitude}`)
        //     .then((res) => res.data);
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);
        const a = { lat: latitude, lng: longitude };
        const promises = [];
        const q = await db.collectionGroup('userPosts').where('postVerified', '==', false).orderBy('timestamp', 'desc');
        const useref = await db.collection('users');

        promises.push(q.get());
        const snapshots = await Promise.all(promises);

        for (const snap of snapshots) {
            for (const doc of snap.docs) {
                // console.log(doc.data());
                const lat = parseFloat(doc.get('latitude'));
                const lng = parseFloat(doc.get('longitude'));

                // console.log(lat, lng);
                // We have to filter out a few false positives due to GeoHash
                // accuracy, but most will match
                const b = { lat, lon: lng };
                const userarea = await useref.doc(doc.data().ownerId).get();
                const inmeters = parseInt(haversine(a, b));

                // const distanceInKm = geofire.distanceBetween([lat, lng], center);
                // const distanceInM = distanceInKm * 1000;
                // console.log("distances ", distanceInKm, distanceInM);
                if (inmeters > 5000) {
                    console.log('condition not matching', inmeters);
                } else {
                    matchingDocs.push({ id: doc.id, photo: userarea?.data()?.photoUrl, ...doc.data() });
                    console.log('dds', userarea.data().photoUrl);
                }
            }
        }
        matchingDocs= matchingDocs.filter((v,i,a)=>a.findIndex(t=>(t.postId === v.postId))===i)
    });
};

function Posts(props) {
    const posts = useModifiedQuery('posts', fetchPosts);
    const user = getLoggedInUser();

    const editPostDisclosure = useDisclosure();
    const [selectedPost, setSelectedPost] = useState(null);
console.log('user', user)
    return (
        <>
            {console.log('dasdasda', matchingDocs)}
            {matchingDocs?.map((post, i) => (
                <Row key={i}>
                    <Col xs={12} className="d-flex justify-content-center">
                        <Post
                            key={post.id}
                            id={post.postId}
                            ownerId={post.ownerId}
                            username={post.username}
                            comments={post.comments}
                            profileUrl={post.photo}
                            description={post.description}
                            photoURL={post.mediaUrl}
                            Title={post.Title}
                            verified={post.verified}
                            postVerified={post.postVerified}
                        />
                    </Col>
                </Row>
            ))}
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
                                {!posts.data?.length ? 'No posts available' : "You've reached the end of the internet"}
                            </p>
                        </Else>
                    </If>
                </Else>
            </If>
        </>
    );
}

export default Posts;
