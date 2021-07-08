import React, { useEffect, useState } from 'react';
import { db, getLoggedInUser } from 'helpers/auth';
import { useModifiedQuery } from 'helpers/query';
import { Col, Container } from 'reactstrap';
import { Row } from 'reactstrap/lib';
import { Else, If, Then } from 'react-if';
import Axios from 'axios';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import Post from '../feed/Post';
import EditPost from '../feed/EditPost';
import UserDisplay from '../permissions/UserDisplay';

const breadcrumbItems = [
    {
        title: 'Crimespy',
        link: '/',
    },
    {
        title: 'Feed',
        link: '/feed',
    },
];

const user = getLoggedInUser();
const fetchPosts = async ({ currentUser }) =>
    Axios.get(`https://crimespy.herokuapp.com/posts/id/${user.id}`).then((res) => res.data);

function TimeLinePosts(props) {
    const posts = useModifiedQuery('timeline', fetchPosts);
    const { editPostDisclosure } = useSelector((state) => state.Feed);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Time Line" breadcrumbItems={breadcrumbItems} />{' '}
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={user} />
                        </Col>
                    </Row>
                    {posts.data?.map((post, i) => (
                        <Row key={i}>
                            <Col xs={12} className="d-flex justify-content-center">
                                <Post key={post.id} {...post} />
                            </Col>
                        </Row>
                    ))}
                    <If condition={posts.isLoading}>
                        <Then>
                            <p className="mt-4 text-center">Fetching posts...</p>
                        </Then>
                        <Else>
                            <p className="mt-4 text-center">
                                {!posts.data?.length ? 'No posts available' : "You've reached the end of the internet"}{' '}
                            </p>
                        </Else>
                    </If>
                </Container>
            </div>
            {editPostDisclosure && <EditPost />}
        </>
    );
}

export default TimeLinePosts;
