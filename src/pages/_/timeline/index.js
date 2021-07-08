import React from 'react';
import { getLoggedInUser } from 'helpers/auth';
import { Col, Container } from 'reactstrap';
import { Row } from 'reactstrap/lib';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
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

const user = getLoggedInUser();

function TimeLinePosts(props) {
    const { editPostDisclosure } = useSelector((state) => state.Feed);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Time Line" breadcrumbItems={breadcrumbItems} />
                    <Row>
                        <Col xs={12}>
                            <UserDisplay user={user} />
                        </Col>
                    </Row>
                    <Posts />
                </Container>
            </div>
            {editPostDisclosure && <EditPost />}
        </>
    );
}

export default TimeLinePosts;
