import { db } from 'helpers/auth';
import React from 'react';
//
function Comment({ username, comment, id }) {
    // const commentRef =  db.collection("comments")
    // commentsRef.doc(id)
    //         .collection("comments")
    //         .orderBy("timestamp", "desc")
    //         .snapshots()
    return (
        <p className="mb-1">
            <strong className="mr-2">{username}</strong> {comment}
        </p>
    );
}

export default function Comments({ username, comments, id }) {
    const commentse = [];
    const commentRef = db.collection('comments');
    commentRef
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                commentse.push(doc?.data());
            });
            console.log('Current cities in CA: ', commentse);
        });

    return (
        <div className="px-3 d-flex flex-column">
            {console.log('Curre ', commentse)}
            {/* <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} />
            <Comment username={username} comment={comment} /> */}
        </div>
    );
}
