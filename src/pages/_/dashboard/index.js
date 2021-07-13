// import React, { Component, useEffect, useState } from 'react';
// import { Container, Row, Col, Label, Button, Collapse, Alert, CardBody } from 'reactstrap';

// // Import Breadcrumb
// import { db, getLoggedInUser } from 'helpers/auth';
// import { api, useModifiedQuery } from 'helpers/query';
// import Axios from 'axios';
// import { If, Then, Else, When } from 'react-if';
// import { BlockMapBuilder } from 'draft-js';
// import usePermissions from 'helpers/usePermissions';
// import PieChart from 'pages/AllCharts/apex/PieChart';
// import Breadcrumbs from '../../../components/Common/Breadcrumb';

// // Import Components
// import MiniWidgets from './MiniWidgets';
// import RevenueAnalytics from './RevenueAnalytics';
// import SalesAnalytics from './SalesAnalytics';
// import EarningReports from './EarningReports';
// import Sources from './Sources';
// import RecentlyActivity from './RecentlyActivity';
// import RevenueByLocations from './RevenueByLocations';
// import ChatBox from './ChatBox';
// import LatestTransactions from './LatestTransactions';
// import PostsTable from '../posts/PostTable';
// import Presets from '../permissions/Presets';
// import Permissions from '../permissions/Permissions';
// import DashPermissions from '../permissions/DashPermission';
// import UsersTable from '../users/UsersTable';

// const breadcrumbItems = [
//     { title: 'Nazox', link: '#' },
//     { title: 'Dashboard', link: '#' },
// ];

// const fetchPosts = async () => {
//     const { latitude, longitude } = getLoggedInUser();
//     // return Axios.get(`https://crimespy.herokuapp.com/posts/lat/${latitude}/lon/${longitude}`).then((res) => console.log('res',res.data));
// };

// const user = getLoggedInUser();

// const Dashboard = () => {
//     const isAuthorized = usePermissions('users');
//     const posts = useModifiedQuery('feeds', fetchPosts);
//     const [switchCreatePreset, setSwitchCreatePreset] = useState(false);
//     // const [assaulte, setAssault] = useState(0);
//     // const [thefte, setTheft] = useState(0);
//     // const [otheres, setOthers] = useState(0);
//     // const [vanda, setVanda] = useState(0);
//     // const [shoot, setShoot] = useState(0);
//     const [totalE, setTotal] = useState(0);
//     const [ttlValue, setTltValue] = useState([]);
//     const permisssions = usePermissions('dashboard');
//     const [reports, setReports] = useState({
//         number: {
//             icon: 'ri-stack-line',
//             title: 'Number of Crimes',
//             value: '...',
//         },
//         revenue: {
//             icon: 'ri-store-2-line',
//             title: 'Sales Revenue',
//             value: '$ 38452',
//             rate: '2.4%',
//             desc: 'From previous period',
//         },
//         rate: {
//             icon: 'ri-briefcase-4-line',
//             title: 'Average Crime Rate',
//             value: '3.4',
//             desc: 'Per Month',
//         },
//     });

//     useEffect(() => {
//         if (posts.isSuccess)
//             setReports((prev) => ({
//                 number: {
//                     ...prev.number,
//                     value: posts?.data?.length,
//                 },
//             }));
//     }, [posts.isSuccess]);

//     // const fetchData = async () => {
//     //     try {
//     //         const ref = db.collectionGroup('userPosts');

//     //         // .orderBy('timestamp', 'desc');

//     //         await ref.onSnapshot((querySnapshot) => {
//     //             const items = [];
//     //             querySnapshot.forEach((doc) => {
//     //                 items.push(doc.data());
//     //             });
//     //         });
//     //     } catch (err) {
//     //         console.log('something went ', err);
//     //     }
//     // };

//     let assault = 0;
//     let theft = 0;
//     let other = 0;
//     let vandal = 0;
//     let shooting = 0;
//     let arrest = 0;
//     let arson = 0;

//     let total = 0;

//     useEffect(() => {
//         try {
//             const items = [];

//             // .orderBy('timestamp', 'desc');
//             const promises = [];
//             const ref = db.collectionGroup('userPosts');
//             promises.push(ref.get());
//             const snapshots = Promise.all(promises);

//             for (const snap of snapshots) {
//                 for (const doc of snap.docs) {
//                     items.push(doc.data());
//                     if (Array.isArray(items)) {
//                         for (let i = 0; i < items.length; i++) {
//                             if (items[i].category === 'Assault') {
//                                 console.log('ASSAULT', items[i].category);
//                                 assault++;
//                             } else if (items[i].category === 'Theft') {
//                                 console.log('THEFT', items[i].category);
//                                 theft++;
//                             } else if (items[i].category === 'Others') {
//                                 console.log('OTHER', items[i].category);
//                                 other++;
//                             } else if (items[i].category === 'Vandalism') {
//                                 console.log('VANDALISM', items[i].category);
//                                 vandal++;
//                             } else if (items[i].category === 'Shooting') {
//                                 console.log('SHOOTING', items[i].category);
//                                 shooting++;
//                             } else if (items[i].category === 'Arrest') {
//                                 console.log('Arrest', items[i].category);
//                                 arrest++;
//                             } else if (items[i].category === 'Arson') {
//                                 console.log('Arson', items[i].category);
//                                 arson++;
//                             }
//                         }
//                         // debugger;
//                         total = theft + assault + arson + other + vandal + shooting + 1;
//                         setTotal(total);
//                         const thefttl = parseInt((theft / total) * 100);
//                         const vandel = parseInt((vandal / total) * 100);
//                         const arsotl = parseInt((arson / total) * 100);
//                         const assaultl = parseInt((assault / total) * 100);
//                         const shootl = parseInt((shooting / total) * 100);
//                         const othertl = parseInt((other / total) * 100);
//                         const areesttl = parseInt((arrest / total) * 100);

//                         const array = [];
//                         array.push(thefttl);
//                         array.push(assaultl);
//                         array.push(arsotl);
//                         array.push(othertl);
//                         array.push(vandel);
//                         array.push(shootl);
//                         array.push(areesttl);
//                         setTltValue(array);

//                         // console.log('thef', theft, thefte);
//                     }
//                 }
//             }
//         } catch (err) {
//             console.log('something went ', err);
//         }
//     }, []);
//     if (!permisssions('review')) return <h1>You are not authorized to access dashboard</h1>;
//     // console.log('sds', permisssions);
//     // debugger;
//     return (
//         <div className="page-content">
//             <Container fluid>
//                 <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
//                 <Row>
//                     <Col xl={12}>
//                         <Label size="lg">Chart</Label>
//                         {console.log('sds', ttlValue)}
//                         {/* <PieChart  ttlValue={ttlValue}/> */}
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col xl={12}>
//                         <Label size="lg">Posts</Label>
//                         <PostsTable />
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col xl={12}>
//                         <Label size="lg">Users</Label>
//                         <UsersTable />
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col xl={12}>
//                         <div className="d-flex p-2 justify-content-between">
//                             <Label size="lg">Presets</Label>
//                             <Button
//                                 onClick={(e) => {
//                                     setSwitchCreatePreset(!switchCreatePreset);
//                                 }}
//                             >
//                                 Create Preset
//                             </Button>
//                         </div>

//                         <Collapse isOpen={switchCreatePreset}>
//                             {isAuthorized('edit') ? (
//                                 <DashPermissions user={user} />
//                             ) : (
//                                 <Alert color="info">You are not Authorized User</Alert>
//                             )}
//                         </Collapse>

//                         <Presets />
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default Dashboard;

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
    const [vanda, setVanda] = useState(0);
    const [shoot, setShoot] = useState(0);
    const [arsone, setArson] = useState(0);
    const [arreste, setArrest] = useState(0);
    const [totalE, setTotal] = useState(0);
    const permisssions = usePermissions('dashboard');
    const [ttlValue, setTltValue] = useState([]);
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
    let vandal = 0;
    let shooting = 0;
    let arrest = 0;
    let arson = 0;

    let total = 0;

    const thef = 0;
    const othe = 0;
    // let theft = 0;
    // let other = 0;
    // let vandal = 0;
    // let shooting = 0;

    const valuess = async () => {
        try {
            // const assault = 0;
            // const theft = 0;
            // const other = 0;
            // const vanda = 0;
            // const shoot = 0;

            const items = [];
            const promises = [];
            const ref = db.collectionGroup('userPosts');
            promises.push(ref.get());
            const snapshots = await Promise.all(promises);

            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    items.push(doc.data());
                    if (Array.isArray(items)) {
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].category === 'Assault') {
                                console.log('ASSAULT', items[i].category);
                                assault++;
                            } else if (items[i].category === 'Theft') {
                                console.log('THEFT', items[i].category);
                                theft++;
                            } else if (items[i].category === 'Others') {
                                console.log('OTHER', items[i].category);
                                other++;
                            } else if (items[i].category === 'Vandalism') {
                                console.log('VANDALISM', items[i].category);
                                vandal++;
                            } else if (items[i].category === 'Shooting') {
                                console.log('SHOOTING', items[i].category);
                                shooting++;
                            } else if (items[i].category === 'Arrest') {
                                console.log('Arrest', items[i].category);
                                arrest++;
                            } else if (items[i].category === 'Arson') {
                                console.log('Arson', items[i].category);
                                arson++;
                            }
                        }
                        // debugger;
                        total = thef + assault + arson + other + vandal + shooting + 1;
                        setTotal(total);
                        const thefttl = parseInt((theft / total) * 100);
                        const vandel = parseInt((vandal / total) * 100);
                        const arsotl = parseInt((arson / total) * 100);
                        const assaultl = parseInt((assault / total) * 100);
                        const shootl = parseInt((shooting / total) * 100);
                        const othertl = parseInt((other / total) * 100);
                        const areesttl = parseInt((arrest / total) * 100);

                        // setTheft(thefttl);
                        // setAssault(assaultl);
                        // setArson(arsotl);
                        // setOthers(othertl);
                        // setVanda(vandel);
                        // setShoot(shootl);
                        // setArrest(areesttl);
                        const array = [];
                        array.push(thefttl);
                        array.push(assaultl);
                        array.push(arsotl);
                        array.push(othertl);
                        array.push(vandel);
                        array.push(shootl);
                        array.push(areesttl);
                        setTltValue(array);

                        // console.log('thef', theft, thefte);
                    }
                }
            }

            // .orderBy('timestamp', 'desc');

            // ref.onSnapshot((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         items.push(doc.data());
            //         // console.log('item', doc.data());
            //     });
            //     if (Array.isArray(items)) {
            //         for (let i = 0; i < items.length; i++) {
            //             if (items[i].category === 'Assault') {
            //                 console.log('ASSAULT', items[i].category);
            //                 assault++;
            //             } else if (items[i].category === 'Theft') {
            //                 console.log('THEFT', items[i].category);
            //                 theft++;
            //             } else if (items[i].category === 'Others') {
            //                 console.log('OTHER', items[i].category);
            //                 other++;
            //             } else if (items[i].category === 'Vandalism') {
            //                 console.log('VANDALISM', items[i].category);
            //                 vandal++;
            //             } else if (items[i].category === 'Shooting') {
            //                 console.log('SHOOTING', items[i].category);
            //                 shooting++;
            //             } else if (items[i].category === 'Arrest') {
            //                 console.log('Arrest', items[i].category);
            //                 arrest++;
            //             } else if (items[i].category === 'Arson') {
            //                 console.log('Arson', items[i].category);
            //                 arson++;
            //             }
            //         }
            //         // debugger;
            //         total = thef + assault + arson + other + vandal + shooting + 1;
            //         setTotal(total);
            //         const thefttl = parseInt((theft / total) * 100);
            //         const vandel = parseInt((vandal / total) * 100);
            //         const arsotl = parseInt((arson / total) * 100);
            //         const assaultl = parseInt((assault / total) * 100);
            //         const shootl = parseInt((shooting / total) * 100);
            //         const othertl = parseInt((other / total) * 100);
            //         const areesttl = parseInt((arrest / total) * 100);

            //         // setTheft(thefttl);
            //         // setAssault(assaultl);
            //         // setArson(arsotl);
            //         // setOthers(othertl);
            //         // setVanda(vandel);
            //         // setShoot(shootl);
            //         // setArrest(areesttl);
            //         const array = [];
            //         array.push(thefttl);
            //         array.push(assaultl);
            //         array.push(arsotl);
            //         array.push(othertl);
            //         array.push(vandel);
            //         array.push(shootl);
            //         array.push(areesttl);
            //         setTltValue(array);

            //         // console.log('thef', theft, thefte);
            //     }
            // });
        } catch (err) {
            console.log('something went ', err);
        }
    };
    useEffect(() => {
        valuess();
    }, []);
    if (!permisssions('review')) return <h1>You are not authorized to access dashboard</h1>;
    // console.log('sds', permisssions);
    // debugger;
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col xl={12}>
                        <Label size="lg">Chart</Label>
                        {console.log('sds', ttlValue)}
                        <PieChart
                            assault={assaulte}
                            theft={thefte}
                            other={otheres}
                            vandalism={vanda}
                            shoot={shoot}
                            ttlValue={ttlValue}
                        />
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
