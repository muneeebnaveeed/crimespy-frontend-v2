import React from "react";

function Comment({ username, comment }) {
    return (
        <p className="mb-1">
            <strong className="mr-2">{username}</strong> {comment}
        </p>
    );
}

export default function Comments({ username, comment }) {
    return (
        <div className="px-3 d-flex flex-column">
            <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} />
        </div>
    );
}
