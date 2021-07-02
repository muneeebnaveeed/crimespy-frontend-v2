import React, { useCallback, useState } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';

// Import Breadcrumb
import Breadcrumbs from 'components/Common/Breadcrumb';
import { Redirect, useLocation } from 'react-router-dom';
import qs from 'querystring';
import { useModifiedQuery } from 'helpers/query';
import { db } from 'helpers/auth';
import Permissions from './Permissions';
import UserDisplay from './UserDisplay';
import Presets from './Presets';

const breadcrumbItems = [
    { title: 'Crimespy', link: '/' },
    { title: 'Edit User', link: '/users' },
];

const removeFirstLetter = (str) => {
    if (!str) return null;
    return str.substr(1, str.length);
};

const Permission = () => {
    const params = useLocation();
    const [userId, setUserId] = useState(qs.parse(removeFirstLetter(params.search)).user);

    const fetchUserById = useCallback(async () => {
        console.log('fetchUserById() [userId:%s]', userId);
        const userdata = await (await db.collection('users').doc(userId).get()).data();
        return userdata;
    }, [userId]);

    const user = useModifiedQuery(['user', userId], fetchUserById);

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="User Permissions" breadcrumbItems={breadcrumbItems} pageTitleClass="pb-0" />
                <Row>
                    <Col xs={12}>
                        <p>Manage user permissions with a fine grained control over each aspect of the application</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} style={user.isLoading ? { width: '100%' } : {}}>
                        {user.isLoading && <Spinner />}
                        {user.isError && !user.isLoading && <Redirect to="/users" />}
                        {!user.isLoading && !user.isError && (
                            <>
                                <UserDisplay user={user.data} />
                                <Permissions userId={userId} user={user.data} />
                                <Presets />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Permission;
