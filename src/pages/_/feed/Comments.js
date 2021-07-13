import { Avatar } from "@material-ui/core";
import { db } from "helpers/auth";
import React from "react";
import { Link } from "react-router-dom";
import alternateImg from "../../../assets/images/default.jpg";
//
function Comment({ avatarUrl, userId, username, comment, id }) {
  return (
    <div className="mb-1" style={{ display: "flex" }}>
      {/* <img style={{height:'50px'}} src={avatarUrl} alt={username} /> */}

      {avatarUrl != null ? (
        <Avatar
          alt={username.toLowerCase()}
          src={avatarUrl}
          style={{
            width: 25,
            height: 25,
          }}
        >
          {/* {username.charAt(0)}{" "} */}
        </Avatar>
      ) : (
        <Avatar
          alt={username.toLowerCase()}
          src={alternateImg}
          style={{
            width: 25,
            height: 25,
          }}
        >
          {/* {username.charAt(0)}{" "} */}
        </Avatar>
      )}
      {/* <Avatar
                alt={username.toLowerCase()}
                src={avatarUrl}
                style={{
                    width: 35,
                    height: 35,
                }}
            >
                {username.charAt(0)}{' '}
            </Avatar> */}
      <span className="mt-1">
        <Link to={`/timeline?user=${userId}`}>
          <strong className="mr-2 ml-1">{username}</strong>
        </Link>
        {comment}
      </span>
    </div>
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
    <div
      className="px-3 d-flex flex-column"
      style={{ overflowX: "hidden", overflowY: "auto", height: "250px" }}
    >
      {comments?.map((comment) => (
        <Comment {...comment} />
      ))}
    </div>
  );
}
