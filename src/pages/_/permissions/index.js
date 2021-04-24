import React, { useCallback, useEffect, useState } from "react";
import { Container, Card, CardBody, Row, Col, Spinner } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import UserDisplay from "./UserDisplay";
import Permissions from "./Permissions";
import { Redirect, useLocation, useParams } from "react-router";
import qs from "querystring";
import { useModifiedQuery } from "helpers/query";
import userEvent from "@testing-library/user-event";
import { db } from "helpers/auth";

const breadcrumbItems = [
    { title: "Crimespy", link: "/" },
    { title: "Edit User", link: "/users" },
];

const removeFirstLetter = (str) => {
    if (!str) return null;
    return str.substr(1, str.length);
};

const Permission = () => {
    const params = useLocation();
    const [userId, setUserId] = useState(qs.parse(removeFirstLetter(params.search)).user);
   

  
  

    const fetchUserById = useCallback(async () => {
        const userdata = await (await db.collection('users').doc(userId).get()).data();
        
        return userdata;
        
    }, [userId]);
    const user = useModifiedQuery(["user", userId], fetchUserById);
    console.log(user.data)
    // setDisplayName(user.data?.displayName);

    // useEffect(() => {
    //     const UserData = async () =>{
    //       const user =  await fetchUserById();
    //       console.log(user.displayName);
    //     }
     
    //     UserData();
    // }, [])
    // console.log(userId)
    // const userData = fetchUserById();
    // console.log(userData)

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
                    <Col xs={12} style={user.isLoading ? { width: "100%" } : {}}>
                        {user.isLoading && <Spinner />}
                        {user.isError && !user.isLoading && <Redirect to="/users" />}
                        {!user.isLoading && !user.isError && (
                            <>
                                <UserDisplay user={user.data} />
                                <Permissions user={user.data}/>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Permission;
