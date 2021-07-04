import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { Input } from 'reactstrap/lib';
import Button from 'components/Common/Button';
import { useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { commentSchema } from 'helpers/schema';
import { showErrorToast } from 'helpers/showToast';
import firebase from 'firebase/app';
import { db, getLoggedInUser } from '../../../helpers/auth';

export default function CreateComment({ id, ...props }) {
    const [comments, setComments] = useState(props.comments || []);
    const [isCreatingComment, setIsCreatingComment] = useState(false);

    const queryClient = useQueryClient();

    const handleSubmit = async (values, form) => {
        setIsCreatingComment(true);

        try {
            const user = getLoggedInUser();
            // const postRef = db.collection("posts").doc(user.uid).collection("userPosts");
            const commentRef = db.collection('comments');
            // const postRef = db.collection("feeds").doc(id);

            // const newComment = {
            //     comment: values.comment,
            //     username: user.displayName,
            // };

            // const updatedComments = [...comments, newComment];
            // setComments(updatedComments);

            // await postRef.update({ comments: updatedComments });
            await commentRef.doc(id).collection('comments').add({
                username: user.displayName,
                comment: values.comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatarUrl: user.photoUrl,
                userId: user.id,
            });
        } catch (err) {
            showErrorToast({
                message: `Unable to create comment: ${err.message}`,
            });
        }

        await queryClient.invalidateQueries(['comments',id]);
        form.resetForm();
        setIsCreatingComment(false);
    };

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors = {};

            const validationErrors = commentSchema.validate(values, { abortEarly: false })?.error?.details;

            if (validationErrors) validationErrors.forEach((err) => (errors[err.context.label] = err.message));

            return errors;
        },
        validateOnChange: false,
    });

    return (
        <Form className="m-0 mt-2" onSubmit={formik.handleSubmit}>
            <FormGroup className="m-0">
                <div className="d-flex">
                    <Input
                        type="text"
                        placeholder="Add a comment..."
                        id="comment"
                        name="comment"
                        className="flex-grow-1 rounded-0"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        disabled={isCreatingComment}
                    />
                    <Button w="42.2px" type="submit" color="primary" className="rounded-0" loading={isCreatingComment}>
                        <i className="fa fa-comments" />
                    </Button>
                </div>
            </FormGroup>
        </Form>
    );
}
