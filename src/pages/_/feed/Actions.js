import {db, getLoggedInUser} from "helpers/auth";
import React, {useCallback, useState, useEffect} from "react";
import {useQueryClient} from "react-query";

function Action({
    active,
    username,
    verified,
    user,
    ...props
}) {
    return (
        <div role="button" className="post__action-button mr-1"
            style={
                active ? {
                    color: "#5664d2"
                } : {}
        }>
            {
            props.children
        } </div>
    );
}

function Actions({username, verified, id, user}) {
    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);
    const [votingii, setVotingii] = useState(null);
    const queryClient = useQueryClient();
    // const postRef = db.collection("posts").doc(user.uid).collection("userPosts").doc(id);
    const postRef = db.collection("feeds").doc(id);


    const handleClick = async (type) => { // Do calculation to save the vote.
        setVoting(true);
        let updatedverificationStatus;

        const loggeduser = getLoggedInUser();

        const oldverified = await(await postRef.get()).data().verified;


        const verificationStatus = oldverified[loggeduser.uid];

        if (type == "upvote") {
            if (verificationStatus == true) {
                updatedverificationStatus = null;
            } else {
                updatedverificationStatus = true
            }
        } else {
            if (verificationStatus == false) {
                updatedverificationStatus = null;
            } else {
                updatedverificationStatus = false
            }
        }

        await postRef.update({
            verified: {
                ... oldverified,
                [user.uid]: updatedverificationStatus
            }
        })


        await queryClient.invalidateQueries("posts");
        setVotingii(updatedverificationStatus)
        setVoting(false);


    };


    // let upVotesCount = verifiedpost;
    // let downVotesCount = notverified;
    const isSelectBusy = votingii === verified[user.uid];
    return (
        <div className="d-flex px-3">
            <div className="d-flex mr-4">
                <Action active={
                    verified[user.uid]
                }>

                    <i className="fa fa-arrow-up"
                        onClick={
                            () => handleClick("upvote")
                        }
                        isLoading={isVoting}/>
                </Action>
                <p></p>
            </div>
            <div className="d-flex">
                <Action active= {verified[user.uid]=== false}>
                    <i className="fa fa-arrow-down"
                        onClick={
                            () => handleClick("downvote")
                        }
                        isLoading
                        ={isVoting}/>
                </Action>
                <p></p>
            </div>
        </div>
    );
}

export default Actions;
