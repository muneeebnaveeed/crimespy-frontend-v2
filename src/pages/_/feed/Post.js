import React, { useCallback, useRef, useState, useMemo } from 'react';
import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import { Else, If, Then, When } from 'react-if';
// import './Dropdown.css'
import { db, getLoggedInUser, storage } from 'helpers/auth.js';
import { useQueryClient } from 'react-query';
import usePermissions from 'helpers/usePermissions.js';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectPost, toggleEditPostDisclosure } from 'store/routes/feed/actions.js';
import { useModifiedQuery } from 'helpers/query';
import Actions from './Actions';
import Comments from './Comments';
import CreateComment from './CreateComment.js.js';

function Post({ username, profileUrl, description, comments, id, photoURL, Title, verified, postVerified, ownerId }) {
    const [menu, setMenu] = useState(false);
    const user = getLoggedInUser();
    const queryClient = useQueryClient();
    const isAuthorized = usePermissions('feed');
    const arePostAuthorized = usePermissions('poststable');
    const [isDeletingPost, setIsDeletingPost] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = useCallback(async () => {
        setIsDeletingPost(true);
        await axios.delete(`https://crimespy.herokuapp.com/posts/id/${user.id}/${id}`);
        await queryClient.invalidateQueries('posts');
        setIsDeletingPost(false);
    }, [setIsDeletingPost]);

    const toggle = () => {
        setMenu(!menu);
    };

    const handleEditPost = useCallback(() => {
        const currentPost = {
            username,
            profileUrl,
            description,
            comments,
            id,
            photoURL,
            Title,
            verified,
            postVerified,
            ownerId,
        };

        dispatch(selectPost(currentPost));
        dispatch(toggleEditPostDisclosure());
    }, [dispatch]);

    const fetchComments = async () => {
        // const commentse = [];
        // const commentRef =await db.collection('comments');
        // commentRef
        // .doc(id)
        // .collection('comments')
        // .orderBy('timestamp', 'desc')
        //     .onSnapshot((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             commentse.push(doc?.data());
        //         });
        //     });

        const snapshot = db.collection('comments').doc(id).collection('comments').orderBy('timestamp', 'asc').get();
        const { docs } = await snapshot;

        return new Promise((resolve, reject) => {
            const c = docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // const modifiedPresets = presets.map((preset) => ({ value: preset, label: preset.title }));
            resolve(c);
        });
    };
    const commentse = useModifiedQuery(['comments', id], fetchComments);
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
                            {username.charAt(0)}{' '}
                        </Avatar>
                        <span className="ml-2 text-capitalize">{username}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <p>{Title}</p>
                    </div>
                    <When condition={isAuthorized('deleteAll')}>
                        <Dropdown className="d-inline-block user-dropdown" isOpen={menu} toggle={toggle}>
                            <DropdownToggle
                                tag="button"
                                className="btn header-item waves-effect"
                                id="page-header-user-dropdown"
                            >
                                <i className="fas fa-ellipsis-h" style={{ color: 'black' }} />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <If condition={user.id === ownerId || arePostAuthorized('delete')}>
                                    <DropdownItem onClick={handleDelete}>
                                        <i className="fas fa-trash-alt mr-1" />
                                        Delete
                                    </DropdownItem>
                                </If>
                                <If condition={user.id === ownerId}>
                                    <DropdownItem onClick={handleEditPost}>
                                        <i className="fas fa-edit mr-1" />
                                        Edit
                                    </DropdownItem>
                                </If>
                            </DropdownMenu>
                        </Dropdown>
                    </When>
                </div>
                <div style={{ position: 'relative' }}>
                    <img
                        className="post__image d-block mx-auto"
                        alt={username}
                        width="500px"
                        height="400px"
                        src={photoURL}
                    />
                    {isDeletingPost && (
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'red',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                            }}
                        />
                    )}
                </div>

                <p className="p-3 m-0">{description}</p>
                <Actions
                    username={username}
                    verified={verified}
                    postVerified={postVerified}
                    user={user}
                    id={id}
                    ownerId={ownerId}
                />
                <Comments username={username} comments={commentse.data} id={id} />
                <When condition={isAuthorized('createComment')}>
                    <CreateComment id={id} comments={comments} />
                </When>
            </CardBody>
        </Card>
    );
}

export default Post;
