import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ButtonGroup, Card, CardBody, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

// Import Breadcrumb
import { batch, useDispatch, useSelector } from "react-redux";
import { fetchProducts, useModifiedQuery } from "helpers/query";
import Select from "../../../components/Common/Select";

import dayjs from "dayjs";
import Spinner from "components/Common/Spinner";
import Error from "components/Common/Error";
import Button from "components/Common/Button";
import { setDeleteProductId, toggleDeleteProductDisclosure } from "store/routes/products/actions";
import Th from "components/Common/Th";
import useUsersQuery from "../users/useUsersQuery";
import { db, getLoggedInUser } from "helpers/auth";
import useDisclosure from "helpers/useDisclosure";
import { useQueryClient } from "react-query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { useHistory } from "react-router";
import usePermissions from "helpers/usePermissions";
import { FastField } from "formik";
import axios from "axios";
import DeletePost from "./DeletePost";

const fetchPosts = async () => {
    const posts = [];

    const user = getLoggedInUser();

    return axios
        .get(`https://crimespy.herokuapp.com/posts/lat/${user.latitude}/lon/${user.longitude}`)
        .then((res) => res.data);
};

function PostsTable(props) {
    //   const users = useModifiedQuery("users", fetchUsers);
    const posts = useModifiedQuery("feeds", fetchPosts);
    //  const presets = useModifiedQuery("presets", fetchPresets);
    const queryClient = useQueryClient();
    const { isOpen, toggle, onOpen } = useDisclosure();

    const [changingRole, setChangingRole] = useState(null);
    const [postId, setPostId] = useState("");
    const history = useHistory();

    const handlePassInfoShow = async (id) => {
        toggle();
        setPostId(id);
    };

    const isAuthorized = usePermissions("poststable");
    console.log(isAuthorized);

    // const handleChangeRole = useCallback(async (role, id) => {
    //     setChangingRole(id);
    //     try {
    //         await db
    //             .collection("users")
    //             .doc(id)
    //             .update({ role: role.value.title, permissions: role.value.permissions });
    //         await queryClient.invalidateQueries("users");
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    //     setChangingRole(null);
    // }, []);

    return (
        <>
            <Card>
                {" "}
                {/* {((users.isLoading && !users.isError) || (presets.isLoading && !presets.isError)) && <Spinner />}
                {((users.isError && !users.isLoading) || (presets.isError && !presets.isLoading)) && (
                    <Error
                        for={users.isError ? "users" : "roles"}
                        onClick={users.isError ? users.refetch : presets.refetch}
                    />
                )} */}
                <CardBody
                    className="pt-0"
                    style={
                        posts.data?.length
                            ? {}
                            : {
                                  minHeight: 350,
                              }
                    }
                >
                    <Table
                        responsive
                        size="xl"
                        borderless
                        hover
                        style={{ minWidth: "706px" }}
                        className="position-relative"
                    >
                        <thead>
                            <tr>
                                <th className="bold-text">#</th>
                                <th className="bold-text">Author Name</th>
                                <th className="bold-text">Post Title</th>
                                <th className="bold-text">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {posts.data?.map((post, i) => {
                                const isSelectBusy = changingRole === post.uid;
                                return (
                                    <>
                                        <tr key={i}>
                                            <Th scope="row" key={i}>
                                                {post.postId.substring(post.postId.length - 3, post.postId.length)}{" "}
                                            </Th>
                                            <Th>{post.username}</Th>
                                            <Th>{post.Title}</Th>
                                            {/* <Th>
                                                 <Select // as={AsyncSelect}
                                                    options={presets.data}
                                                    defaultValue={{
                                                        value: user.permissions,
                                                        label: user.role,
                                                    }}
                                                    onChange={(role) =>
                                                        role.label !== user.role
                                                            ? handleChangeRole(role, user.uid)
                                                            : null
                                                    }
                                                    isLoading={isSelectBusy}
                                                    isDisabled={isSelectBusy}
                                                /> 
                                            </Th> */}
                                            <Th>
                                                <ButtonGroup>
                                                    {" "}
                                                    {
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            // onClick={() => history.push(`/users/edit?user=${user.uid}`)}
                                                        >
                                                            <i class="fas fa-eye" />
                                                        </Button>
                                                    }
                                                    {
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            // onClick={() => history.push(`/users/edit?user=${user.uid}`)}
                                                        >
                                                            <i class="fas fa-check" />
                                                        </Button>
                                                    }
                                                    {isAuthorized("delete") && (
                                                        <Button
                                                            color="light"
                                                            size="sm"
                                                            onClick={() => handlePassInfoShow(post.postId)}
                                                        >
                                                            <i className="fas fa-trash-alt" />
                                                        </Button>
                                                    )}{" "}
                                                </ButtonGroup>
                                            </Th>
                                        </tr>
                                    </>
                                );
                            })}{" "}
                        </tbody>
                        {!posts.data?.length && !posts.isLoading && !posts.isError && (
                            <caption style={{ textAlign: "center" }}>No posts found</caption>
                        )}{" "}
                    </Table>
                </CardBody>
            </Card>
            <DeletePost isOpen={isOpen} toggle={toggle} postId={postId} />
        </>
    );
}

export default PostsTable;
