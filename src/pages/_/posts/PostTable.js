import React, { useState, useEffect } from 'react';
import { ButtonGroup, Card, CardBody, Table } from 'reactstrap';

// Import Breadcrumb
import { useModifiedQuery } from 'helpers/query';

import Button from 'components/Common/Button';
import Th from 'components/Common/Th';
import { db, getLoggedInUser } from 'helpers/auth';
import useDisclosure from 'helpers/useDisclosure';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import usePermissions from 'helpers/usePermissions';
import DeletePost from './DeletePost';
import ViewPost from './ViewPost';
import VerifyPost from './VerifyPost';
import SearchTask from '../feed/SearchTask';

// const fetchPosts = async () => {
//     // const snapshot = db
//     //     .collectionGroup('userPosts')
//     //     .where('postVerified', '==', false)
//     //     .orderBy('timestamp', 'desc')
//     //     .get();

//     // // const snapshot = db.collection("users").get();
//     // const { docs } = await snapshot;

//     // return new Promise((resolve, reject) => {
//     //     const postss = docs.map((doc) => ({
//     //         id: doc.id,
//     //         ...doc.data(),
//     //     }));
//     //     resolve(postss);
//     // });

// };

function PostsTable(props) {
    //   const users = useModifiedQuery("users", fetchUsers);

    //  const presets = useModifiedQuery("presets", fetchPresets);
    const { isOpen, toggle, onOpen } = useDisclosure();
    const ViewDisclosure = useDisclosure();
    const VerifyDisclosure = useDisclosure();

    const [changingRole, setChangingRole] = useState(null);
    const [postId, setPostId] = useState('');
    const [poster, SetPoster] = useState([]);
    const [ownerId, setOwnerId] = useState('');
    const [post, setPost] = useState([]);

    const fetchPosts = async () => {
        // const snapshot = db
        //     .collectionGroup('userPosts')
        //     .where('postVerified', '==', false)
        //     .orderBy('timestamp', 'desc')
        //     .get();

        // // const snapshot = db.collection("users").get();
        // const { docs } = await snapshot;

        // return new Promise((resolve, reject) => {
        //     const postss = docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //     }));
        //     resolve(postss);
        // });
        const ref = db.collectionGroup('userPosts');

        // .orderBy('timestamp', 'desc');

        await ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            SetPoster(items);
            // resolve(items);
        });
    };

    const HandleViewPost = async (p) => {
        ViewDisclosure.toggle();
        setPost(p);
    };

    const HandleVerifyPost = async (p) => {
        VerifyDisclosure.toggle();
        setPost(p);
    };

    const handlePassInfoShow = async (id, ownerid) => {
        toggle();
        console.log('idd', ownerid);
        setPostId(id);
        setOwnerId(ownerid);
    };
    const posts = useModifiedQuery('feeds', fetchPosts);

    useEffect(() => {
        fetchPosts();
        console.log('pdsdasda', posts);
    }, []);

    const isAuthorized = usePermissions('poststable');

    return (
        <>
            <Card>
                <CardBody
                    className="pt-0"
                    style={
                        poster?.length
                            ? {}
                            : {
                                  minHeight: 350,
                              }
                    }
                >
                    {/* <SearchTask /> */}
                    <Table
                        responsive
                        size="xl"
                        borderless
                        hover
                        style={{ minWidth: '706px' }}
                        className="position-relative"
                    >
                        <thead>
                            <tr>
                                <th className="bold-text">#</th>
                                <th className="bold-text">Author Name</th>
                                <th className="bold-text">Post Title</th>
                                <th className="bold-text">Category</th>
                                <th className="bold-text">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {' '}
                            {poster?.map((p, i) => (
                                <>
                                    <tr key={i}>
                                        <Th scope="row" key={i}>
                                            {p.postId.substring(p.postId.length - 3, p.postId.length)}{' '}
                                        </Th>
                                        <Th>{p.username}</Th>
                                        <Th>{p.Title}</Th>
                                        <Th>{p.category}</Th>

                                        <Th>
                                            <ButtonGroup>
                                                <Button color="light" size="sm" onClick={() => HandleViewPost(p)}>
                                                    <i className="fas fa-eye" />
                                                </Button>
                                                <Button color="light" size="sm" onClick={() => HandleVerifyPost(p)}>
                                                    <i className="fas fa-check" />
                                                </Button>
                                                {isAuthorized('delete') && (
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        onClick={() => handlePassInfoShow(p.postId, p.ownerId)}
                                                    >
                                                        <i className="fas fa-trash-alt" />
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </Th>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        {!poster?.length && !poster.isLoading && !poster.isError && (
                            <caption style={{ textAlign: 'center' }}>No posts found</caption>
                        )}
                    </Table>
                </CardBody>
            </Card>
            <DeletePost isOpen={isOpen} toggle={toggle} postId={postId} ownerId={ownerId} />
            <ViewPost isOpen={ViewDisclosure.isOpen} toggle={ViewDisclosure.toggle} post={post} />
            <VerifyPost isOpen={VerifyDisclosure.isOpen} toggle={VerifyDisclosure.toggle} post={post} />
        </>
    );
}

export default PostsTable;
