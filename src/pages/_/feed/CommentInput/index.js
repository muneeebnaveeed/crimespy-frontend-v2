import React, {useState} from 'react'
import './style.css'
import {db} from '../../../../helpers/auth'

export default function CommentInput({comments, id,user}) {
    const [comment, setComment] = useState("");
    const [commentMap, setcommentMap] = useState(comments ? comments : []);
    // const postRef = db
    // .collection("posts")
    // .doc(currentUser.uid)
    // .collection("userPosts");
  
    const addComment = () => {
      // Add a new document in collection "cities"
  
    //   commentMap.push({
    //     comment: comment,
    //     username: user.displayName,
    //   });
    //   postRef
    //     .doc(id)
    //     .update({
    //       comments: commentMap,
    //     })
    //     .then(function () {
    //       console.log("Document successfully written!");
    //     })
    //     .catch(function (error) {
    //       console.error("Error writing document: ", error);
    //     });
  
    //   setComment("");
    };
  
    return (
      <div className="commentInput ">
        <textarea
          rows="1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="commentInput__textarea border border-lightgrey"

          placeholder="Add a comment.."
        ></textarea>
  
        <button
          onClick={addComment}
          className="button commentInput__button"
          style={{
            color: comment ? "gray" : "lightgrey",
            fontWeight: comment ? "600" : "500",
          }}
        >
          Post
        </button>
      </div>
    );
}
