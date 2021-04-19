import React from "react";
//
function Comment({ username, comment }) {
    return (
        <p className="mb-1">
            <strong className="mr-2">{username}</strong> {comment}
        </p>
    );
}

export default function Comments({ username, comments }) {
    return (
        <div className="px-3 d-flex flex-column">
        {
            comments ? (
                comments.map((comment,i) => (
                    <div key={i}>

                    <Comment username={comment.username} comment={comment.comment} />

                    </div>
                ))
            ) : (
                <> </>
            )
        }
            {/* <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} /> */}
        </div>
    );
}
