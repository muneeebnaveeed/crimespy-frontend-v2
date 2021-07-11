import React, { Component, useEffect, useState } from 'react';
import { Container, Row, Col, Label, Button, Collapse, Alert, CardBody } from 'reactstrap';

// Import Breadcrumb
import { db, getLoggedInUser } from 'helpers/auth';
import { api, useModifiedQuery } from 'helpers/query';
import Axios from 'axios';
import { If, Then, Else, When } from 'react-if';
import { BlockMapBuilder } from 'draft-js';
import usePermissions from 'helpers/usePermissions';
import PieChart from 'pages/AllCharts/apex/PieChart';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

// Import Components
import MiniWidgets from './MiniWidgets';
import RevenueAnalytics from './RevenueAnalytics';
import SalesAnalytics from './SalesAnalytics';
import EarningReports from './EarningReports';
import Sources from './Sources';
import RecentlyActivity from './RecentlyActivity';
import RevenueByLocations from './RevenueByLocations';
import ChatBox from './ChatBox';
import LatestTransactions from './LatestTransactions';
import PostsTable from '../posts/PostTable';
import Presets from '../permissions/Presets';
import Permissions from '../permissions/Permissions';
import DashPermissions from '../permissions/DashPermission';
import UsersTable from '../users/UsersTable';

const breadcrumbItems = [
    { title: 'Nazox', link: '#' },
    { title: 'Dashboard', link: '#' },
];

const fetchPosts = async () => {
    const { latitude, longitude } = getLoggedInUser();
    // return Axios.get(`https://crimespy.herokuapp.com/posts/lat/${latitude}/lon/${longitude}`).then((res) => console.log('res',res.data));
};

const user = getLoggedInUser();

const Dashboard = () => {
    const isAuthorized = usePermissions('users');
    const posts = useModifiedQuery('feeds', fetchPosts);
    const [switchCreatePreset, setSwitchCreatePreset] = useState(false);
    const [assaulte, setAssault] = useState(0);
    const [thefte, setTheft] = useState(0);
    const [otheres, setOthers] = useState(0);
    const [reports, setReports] = useState({
        number: {
            icon: 'ri-stack-line',
            title: 'Number of Crimes',
            value: '...',
        },
        revenue: {
            icon: 'ri-store-2-line',
            title: 'Sales Revenue',
            value: '$ 38452',
            rate: '2.4%',
            desc: 'From previous period',
        },
        rate: {
            icon: 'ri-briefcase-4-line',
            title: 'Average Crime Rate',
            value: '3.4',
            desc: 'Per Month',
        },
    });

    useEffect(() => {
        if (posts.isSuccess)
            setReports((prev) => ({
                number: {
                    ...prev.number,
                    value: posts?.data?.length,
                },
            }));
    }, [posts.isSuccess]);

    // const fetchData = async () => {
    //     try {
    //         const ref = db.collectionGroup('userPosts');

    //         // .orderBy('timestamp', 'desc');

    //         await ref.onSnapshot((querySnapshot) => {
    //             const items = [];
    //             querySnapshot.forEach((doc) => {
    //                 items.push(doc.data());
    //             });
    //         });
    //     } catch (err) {
    //         console.log('something went ', err);
    //     }
    // };
    let assault = 0;
    let theft = 0;
    let other = 0;

    useEffect(() => {
        try {
            const items = [];
            const ref = db.collectionGroup('userPosts');

            // .orderBy('timestamp', 'desc');

            ref.onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    console.log('item', items);
                    if (Array.isArray(items)) {
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].category === 'Assault') {
                                setAssault(assault++);
                            } else if (items[i].category === 'Theft') {
                                setTheft(theft++);
                            } else if (items[i].category === 'Others') {
                                setOthers(other++);
                            }
                        }
                    }
                });
            });
        } catch (err) {
            console.log('something went ', err);
        }
    }, []);

    return (
        <div className="page-content">
            {console.log('stugg', assaulte, thefte, otheres)}
            <Container fluid>
                <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col xl={12}>
                        <Label size="lg">Chart</Label>
                        <PieChart assault={assaulte} theft={thefte} other={otheres} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <Label size="lg">Posts</Label>
                        <PostsTable />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <Label size="lg">Users</Label>
                        <UsersTable />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <div className="d-flex p-2 justify-content-between">
                            <Label size="lg">Presets</Label>
                            <Button
                                onClick={(e) => {
                                    setSwitchCreatePreset(!switchCreatePreset);
                                }}
                            >
                                Create Preset
                            </Button>
                        </div>

                        <Collapse isOpen={switchCreatePreset}>
                            {isAuthorized('edit') ? (
                                <DashPermissions user={user} />
                            ) : (
                                <Alert color="info">You are not Authorized User</Alert>
                            )}
                        </Collapse>

                        <Presets />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
