import React, { useState } from "react";
import { db ,getLoggedInUser} from "../../../helpers/auth";
import { Form, FormGroup } from "reactstrap";
import { Input } from "reactstrap/lib";
import Button from "components/Common/Button";
import { useQueryClient } from "react-query";

export default function CreateComment({comments, id}) {
    const [comment, setComment] = useState("");
    const [commentMap, setcommentMap] = useState(comments ? comments : []);
    const user = getLoggedInUser();
    const queryClient = useQueryClient();
    
    const postRef = db
    .collection("posts")
    .doc(user.uid)
    .collection("userPosts");

    const addComment = (e) => {
        // Add a new document in collection "cities"
        e.preventDefault();
        commentMap.push({
          comment: comment,
          username: user.displayName,
        });
    
        postRef
          .doc(id)
          .update({
            comments: commentMap,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
           queryClient.invalidateQueries("posts");
    
        setComment("");
      };


    return (
        <Form className="m-0 mt-2">
            <FormGroup className="m-0">
                <div className="d-flex">
                    <Input type="text" placeholder="Add a comment..." className="flex-grow-1 rounded-0" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button type="submit" color="primary" className="rounded-0" onClick={addComment}>
                        <i className="fa fa-comments" />
                    </Button>
                </div>
            </FormGroup>
        </Form>
    );
}
