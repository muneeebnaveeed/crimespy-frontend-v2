/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { db, getLoggedInUser } from 'helpers/auth';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';

function Action({ active, username, verified, ownerId, user, ...props }) {
    return (
        <div
            role="button"
            className="post__action-button mr-1"
            style={
                active
                    ? {
                          color: '#5664d2',
                      }
                    : {}
            }
        >
            {props.children}{' '}
        </div>
    );
}

function Actions({ verified, id, user, postVerified, ownerId }) {
    const [isVoting, setVoting] = useState(false);

    const [votingii, setVotingii] = useState(null);
    const queryClient = useQueryClient();
    // const postRef = db.collection("posts").doc(user.uid).collection("userPosts").doc(id);
    const postRef = db.collection('posts').doc(ownerId).collection('userPosts').doc(id);

    useEffect(() => {
        const value = Object.values(verified).filter(Boolean).length;

        if (value === 1) {
            postRef.update({ postVerified: true });
        }
    }, [postRef, verified]);

    const handleClick = async () => {
        // Do calculation to save the vote.
        setVoting(true);
        let updatedverificationStatus;

        const loggeduser = getLoggedInUser();

        const oldverified = await (await postRef.get()).data().peopleVerifiedPost;

        const verificationStatus = oldverified[loggeduser.id];

        if (verificationStatus == true) {
            updatedverificationStatus = null;
        } else {
            updatedverificationStatus = true;
        }

        await postRef.update({
            peopleVerifiedPost: {
                ...oldverified,
                [loggeduser.id]: updatedverificationStatus,
            },
        });

        await queryClient.invalidateQueries('posts');
        setVotingii(updatedverificationStatus);
        setVoting(false);
    };

    // let upVotesCount = verifiedpost;
    // let downVotesCount = notverified;
    // const isSelectBusy = votingii === verified[user.uid];
    return (
        <div className="d-flex px-3 ">
            {/* <div className="d-flex mr-4"> */}
            <Action active={verified[user.id]}>
                {/* <i className="fa fa-arrow-up" onClick={handleClick} isLoading={isVoting} /> */}
                <i className="fa fa-check fa-lg mt-2" aria-hidden="true" onClick={handleClick} isLoading={isVoting} />
            </Action>
            {/* </div> */}
            {/* <div className="d-flex">
                <Action active={verified[user.uid] === false}>
                    <i className="fa fa-arrow-down" onClick={() => handleClick('downvote')} isLoading={isVoting} />
                </Action>
                <p />
            </div> */}
        </div>
    );
}

export default Actions;
