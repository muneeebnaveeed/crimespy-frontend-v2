import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";
import { getLoggedInUser } from "helpers/auth";
import { api, useModifiedQuery } from "helpers/query";
import Axios from "axios";

const breadcrumbItems = [
    { title: "Nazox", link: "#" },
    { title: "Dashboard", link: "#" },
];

const fetchPosts = async () => {
    const user = getLoggedInUser();
    return Axios.get(`https://crimespy.herokuapp.com/posts/lat/${user.latitude}/lon/${user.longitude}`).then(
        (res) => res.data
    );
};

const Dashboard = () => {
    const posts = useModifiedQuery("feeds", fetchPosts);
    const [reports, setReports] = useState({
        number: {
            icon: "ri-stack-line",
            title: "Number of Crimes",
            value: "...",
        },
        revenue: {
            icon: "ri-store-2-line",
            title: "Sales Revenue",
            value: "$ 38452",
            rate: "2.4%",
            desc: "From previous period",
        },
        rate: {
            icon: "ri-briefcase-4-line",
            title: "Average Crime Rate",
            value: "3.4",
            desc: "Per Month",
        },
    });

    useEffect(() => {
        if (posts.isSuccess)
            setReports((prev) => ({
                number: {
                    ...prev.number,
                    value: posts.data.length,
                },
            }));
    }, [posts.isSuccess]);

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                <Row>
                    <Col xl={8}>
                        <Row>
                            <MiniWidgets reports={Object.values(reports)} />
                        </Row>

                        {/* revenue Analytics */}
                        <RevenueAnalytics />
                    </Col>

                    <Col xl={4}>
                        {/* sales Analytics */}
                        <SalesAnalytics />

                        {/* earning reports */}
                        <EarningReports />
                    </Col>
                </Row>

                <Row>
                    {/* sources */}
                    <Sources />

                    {/* recent activity */}
                    <RecentlyActivity />

                    {/* revenue by locations */}
                    {/* <RevenueByLocations /> */}
                </Row>

                {/* <Row>
                     chat box is a comment 
                    <ChatBox />

                    latest transactions is a comment
                    <LatestTransactions />
                </Row> */}
            </Container>
        </div>
    );
};

export default Dashboard;
