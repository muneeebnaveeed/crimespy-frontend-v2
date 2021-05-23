import React, { useCallback, useRef, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { Else, If, Then } from "react-if";
import CreateComment from "./CreateComment.js.js";
import Comments from "./Comments";
import Actions from "./Actions";
// import './Dropdown.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { db, getLoggedInUser, storage } from "helpers/auth.js";
import { useQueryClient } from "react-query";
import usePermissions from "helpers/usePermissions.js";
import { When } from "react-if";
import axios from "axios";

function Post({ username, profileUrl, description, comments, id, photoURL, Title, verified, postVerified, ownerId }) {
    const [menu, setMenu] = useState(false);
    const user = getLoggedInUser();
    const queryClient = useQueryClient();
    const postRef = db.collection("posts").doc(user.uid).collection("userPosts");
    const isAuthorized = usePermissions("feed");
    const deletePost = async () => {
        var imageRef = storage.refFromURL(photoURL);

        // imageRef.delete().then(function () {
        //     console.log("delete successfully");
        // }).catch(function (error) {
        //     console.log(`Errors ${error}`);
        // });

        await axios.delete(`https://crimespy.herokuapp.com/posts/id/${user.uid}/${id}`).then((res) => {
            console.log("Hello", res);
        });

        // await postRef.doc(id).delete().then(function () {
        //     console.log("delete Post info successfully");
        // }).catch(function (error) {
        //     console.log(`Errors post info ${error}`);
        // });
        await queryClient.invalidateQueries("posts");
    };

    const toggle = () => {
        setMenu(!menu);
    };
    return (
        <Card className="m-0 mt-4" style={{ maxWidth: 840 }}>
            <CardBody className="p-0">
                <div className="d-flex p-3 justify-content-between">
                    <div className="d-flex align-items-center">
                        <Avatar
                            alt={username.toLowerCase()}
                            src={profileUrl}
                            style={{
                                width: 35,
                                height: 35,
                            }}
                        >
                            {username.charAt(0)}{" "}
                        </Avatar>
                        <span className="ml-2 text-capitalize">{username}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <p>{Title}</p>
                    </div>
                    <When condition={isAuthorized("deleteAll")}>
                        <Dropdown className="d-inline-block user-dropdown" isOpen={menu} toggle={toggle}>
                            <DropdownToggle
                                tag="button"
                                className="btn header-item waves-effect"
                                id="page-header-user-dropdown"
                            >
                                <i className="fas fa-ellipsis-h" style={{ color: "black" }}></i>
                                {/* <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i> */}{" "}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <If condition={user.uid === ownerId}>
                                    <DropdownItem onClick={deletePost}>
                                        <i className="fas fa-trash-alt mr-1" />
                                        Delete
                                    </DropdownItem>
                                </If>
                                {/* <DropdownItem href="#">
                            <i className="ri-wallet-2-line align-middle mr-1"></i> My Wallet
                        </DropdownItem>
                        <DropdownItem className="d-block" href="#">
                            <span className="badge badge-success float-right mt-1">11</span>
                            <i className="ri-settings-2-line align-middle mr-1"></i> Settings
                        </DropdownItem>
                        <DropdownItem href="#">
                            <i className="ri-lock-unlock-line align-middle mr-1"></i> Lock screen
                        </DropdownItem> */}{" "}
                            </DropdownMenu>
                        </Dropdown>
                    </When>
                </div>
                <img className="post__image d-block mx-auto" width="500px" height="400px" src={photoURL} />
                <p className="p-3 m-0">{description}</p>
                <Actions username={username} verified={verified} postVerified={postVerified} user={user} id={id} />
                <Comments username={username} comments={comments} />
                <When condition={isAuthorized("createComment")}>
                    <CreateComment id={id} />
                </When>
            </CardBody>
        </Card>
    );
}

// const DropdownMenu = ({profileUrl}) => {
//     const dropdownRef = useRef(null);
//     const [isActive, setIsActive] = useState(false);
//     const onClick = () => setIsActive(!isActive);

//     return (
//       <div className="menu-container">
//         <button onClick={onClick} className="menu-trigger">
//           <span>User</span>
//           <img src={profileUrl} alt="User avatar" />
//         </button>
//         <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
//           <ul>
//             <li>Delete Post</li>

//           </ul>
//         </nav>
//       </div>
//     );
// };

export default Post;
