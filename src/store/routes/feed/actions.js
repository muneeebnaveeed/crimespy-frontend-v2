import { SELECT_POST, TOGGLE_EDIT_POST_DISCLOSURE } from './actionTypes';

export const toggleEditPostDisclosure = () => ({
    type: TOGGLE_EDIT_POST_DISCLOSURE,
});

export const selectPost = (post) => ({
    type: SELECT_POST,
    payload: post,
});
