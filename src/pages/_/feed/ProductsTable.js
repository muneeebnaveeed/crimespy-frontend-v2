import React, { useCallback } from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";

// Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useProductsQuery from "./useProductsQuery";
import Breadcrumbs from "components/Common/Breadcrumb";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

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

function ProductsTable({ username, profileUrl, description, comments, id, photoURL }) {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="Feed" breadcrumbItems={breadcrumbItems} />

                <Row className=" justify-content-center">
                    <Col
                        xs={7}
                        className="align-self-center"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Card>
                            <CardBody className="post">
                                <div className="post__header">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            alt={username.toLowerCase()}
                                            src={profileUrl}
                                            style={{
                                                height: "50px",
                                                width: "50px",
                                            }}
                                        >
                                            {" "}
                                            {username.charAt(0)}{" "}
                                        </Avatar>
                                        <div className="post__headerInfo">
                                            <p style={{ fontSize: "15px" }}> {username}</p>
                                        </div>
                                    </div>
                                    {/* {
                                user ? (user.displayName.toLowerCase() === userName.toLowerCase() ? (<button className="button" aria-controls="simple-menu" aria-haspopup="true"
                                    onClick={deletePost}>
                                    Delete
                                </button>) : (<></>)) : (<></>)
                            } */}
                                    <button className="post__button">Delete</button>
                                </div>
                                <img className="post__image" src={photoURL} />
                                <div className="post__bottom mt-3">
                                    <p> {description} </p>
                                </div>
                                {/* {
                            comments ? (comments.map((comment) => (<Comment username={
                                    comment.username
                                }
                                comment={
                                    comment.comment
                                }/>))) : (<></>)
                        } */}
                                <Comment username={username} comment="Helllo COmment" />
                                <CommentInput comments={comments} id={id} user="Wasef" />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductsTable;
