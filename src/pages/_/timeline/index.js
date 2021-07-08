import React, { useEffect, useState } from 'react';
import { db, getLoggedInUser } from 'helpers/auth';
import { useModifiedQuery } from 'helpers/query';
import { Col, Container } from 'reactstrap';
import { Row } from 'reactstrap/lib';
import { Else, If, Then } from 'react-if';
import Axios from 'axios';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'querystring';
import Post from '../feed/Post';
import EditPost from '../feed/EditPost';
import UserDisplay from '../permissions/UserDisplay';
import Posts from '../feed/Posts';

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

const removeFirstLetter = (str) => str.slice(1);

const user = getLoggedInUser();
const fetchPosts = async (uid) => Axios.get(`https://crimespy.herokuapp.com/posts/id/${uid}`).then((res) => res.data);
const fetchProfile = async (uid) =>
    Axios.get(`https://crimespy.herokuapp.com/users/id/${uid}/profile`).then((res) => res.data);

function TimeLinePosts(props) {
    const { editPostDisclosure } = useSelector((state) => state.Feed);
    const location = useLocation();

    const [userId, setUserId] = useState(null);
    const timeline = useModifiedQuery(['timeline', userId], fetchPosts);
    const profile = useModifiedQuery(['timeline', userId], fetchProfile);

    useEffect(() => {
        const uId = qs.parse(removeFirstLetter(location.search));
        setUserId(uId);
    }, []);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Time Line" breadcrumbItems={breadcrumbItems} />{' '}
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={profile} />
                        </Col>
                    </Row>
                    <Posts q={timeline} />
                </Container>
            </div>
            {editPostDisclosure && <EditPost />}
        </>
    );
}

export default TimeLinePosts;
