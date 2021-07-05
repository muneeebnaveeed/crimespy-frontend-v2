import { Avatar } from '@material-ui/core';
import { db } from 'helpers/auth';
import React from 'react';
import { Link } from 'react-router-dom';
//
function Comment({ avatarUrl, userId, username, comment, id }) {
    return (
        <p className="mb-1" style={{display:'flex'}}>
            {/* <img style={{height:'50px'}} src={avatarUrl} alt={username} /> */}
            <Avatar
                            alt={username.toLowerCase()}
                            src={avatarUrl}
                            style={{
                                width: 35,
                                height: 35,
                            }}
                        >
                            {/* {username.charAt(0)}{' '} */}
                        </Avatar>
            <Link to={`/timeline?user=${userId}`}>
                <strong className="mr-2">{username}</strong>
            </Link>
            {comment}
        </p>
    );
}

export default function Comments({ comments, id }) {
    // const commentse = [];
    // const commentRef = db.collection('comments');
    // commentRef
    //     .doc(id)
    //     .collection('comments')
    //     .orderBy('timestamp', 'desc')
    //     .onSnapshot((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             commentse.push(doc?.data());
    //         });
    //     });

    return (
        <div className="px-3 d-flex flex-column" style={{overflowX:'hidden', overflowY:'auto', height:'250px'}}>
            {comments?.map((comment) => (
                <Comment {...comment} />
          
            ))}
        </div>
    );
}
