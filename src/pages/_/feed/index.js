import React, { useState, useEffect } from "react";
import Post from "./Post";
import Breadcrumbs from "components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
import { db, getLoggedInUser } from "helpers/auth";

const breadcrumbItems = [
    {
        title: "Crimespy",
        link: "/",
    },
    {
        title: "Feed",
        link: "/dashboard",
    },
];

function Feed() {
    const [posts, setPosts] = useState([]);
    const user = getLoggedInUser();
    const postRef = db.collection("posts").doc(user.uid).collection("userPosts");
    useEffect(() => {
        postRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
        });
        console.log(posts);
        // postRef.get().then( snapshot => {
        //     const document = [];
        //     snapshot.forEach( (doc) =>{
        //         const data = doc.data()
        //         document.push(data);
        //         setPosts(document);
        //         console.log("Post",posts);
        //     })
        // })
    }, []);
    console.log("Post", posts);

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col xs={12} className="align-items-center">
                        {" "}
                        {posts.map(({ id, post }) => {
                            return (
                                <Post
                                key={id}
                                id={id}

                                    username={post.username}
                                    comments={post.comments}
                                    profileUrl={post.profileUrl}
                                    description={post.description} 
                             photoURL={post.mediaUrl}                                />
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Feed;
