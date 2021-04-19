import {db, getLoggedInUser} from "helpers/auth";
import React, {useCallback, useState, useEffect} from "react";
import {useQueryClient} from "react-query";

function Action({
    active,
    username,
    verifiedpost,
    notverified,
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

function Actions({username, verifiedpost, notverified, id}) {
    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);
    const queryClient = useQueryClient();

    useEffect(() => { // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
        const votesFromLocalStorage = localStorage.getItem("votes") || [];
        let previousVotes = [];

        try {
            // Parse the value of the item from localStorage. If the value of the
            // items isn't an array, then JS will throw an error.
            previousVotes = JSON.parse(votesFromLocalStorage);
        } catch (error) {
            console.error(error);
        }

        setVotedPosts(previousVotes);
    }, []);

    const handleDisablingOfVoting = (postId) => {
        // This function is responsible for disabling the voting button after a
        // user has voted. Fetch the previously voted items from localStorage. See
        // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
        // and update the item on localStorage.
        const previousVotes = votedPosts;
        previousVotes.push(postId);

        setVotedPosts(previousVotes);

        // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
        localStorage.setItem("votes", JSON.stringify(votedPosts));
    };


    const handleClick = async (type) => { // Do calculation to save the vote.
        setVoting(true);

        const user = getLoggedInUser();
        const postRef = db.collection("posts").doc(user.uid).collection("userPosts");

        let upvote = verifiedpost;
        let downvote = notverified;

        const date = new Date();

        if (type === "upvote") {
            upvote = upvote + 1;
        } else {
            downvote = downvote + 1;
        }

        await postRef.doc(id).update({
            // title: post.title,
            // upVotesCount,
            verifiedpost: upvote,
            notverified: downvote,

            // downVotesCount,
            // createdAt: post.createdAt,
            // updatedAt: date.toUTCString(),
        });
        await queryClient.invalidateQueries("posts");

        handleDisablingOfVoting(id);
        setVoting(true);

    };


    const checkIfPostIsAlreadyVoted = () => {
        if (votedPosts.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    };


    // let upVotesCount = verifiedpost;
    // let downVotesCount = notverified;
    return (
        <div className="d-flex px-3">
            <div className="d-flex mr-4">
                <Action active>
                    <i className="fa fa-arrow-up"
                        onClick={
                            () => handleClick("upvote")
                        }
                        isLoading={isVoting}
                        isDisabled={
                            checkIfPostIsAlreadyVoted()
                        }/>
                </Action>
                <p>{verifiedpost}</p>
            </div>
            <div className="d-flex">
                <Action>
                    <i className="fa fa-arrow-down"
                        onClick={
                            () => handleClick("downvote")
                        }
                        isLoading={isVoting}
                        isDisabled={
                            checkIfPostIsAlreadyVoted()
                        }/>
                </Action>
                <p>{notverified}</p>
            </div>
        </div>
    );
}

export default Actions;
