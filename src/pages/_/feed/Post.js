import React, { useCallback } from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";

import CreateComment from "./CreateComment.js.js";
import Comments from "./Comments";
import Actions from "./Actions";

function Post({ username, profileUrl, description, comments, id, photoURL }) {
    return (
        <Card className="m-0 mt-4" style={{ maxWidth: 840 }}>
            <CardBody className="p-0">
                <div className="d-flex p-3 justify-content-between">
                    <div className="d-flex align-items-center">
                        <Avatar alt={username.toLowerCase()} src={profileUrl} style={{ width: 35, height: 35 }}>
                            {username.charAt(0)}
                        </Avatar>
                        <span className="ml-2 text-capitalize">{username}</span>
                    </div>

                    <i className="fa fa-sliders fa-lg" />
                </div>
                <img className="post__image d-block mx-auto" width="500px" height="400px" src={photoURL} />
                <p className="p-3 m-0">{description}</p>
                <Actions />
                <Comments username={username} comments={comments} />
                <CreateComment comments={comments} id={id} user="Wasef" />
            </CardBody>
        </Card>
    );
}

export default Post;
