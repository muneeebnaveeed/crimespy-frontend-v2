// @flow

import { SELECT_POST, TOGGLE_EDIT_POST_DISCLOSURE } from './actionTypes';

const INIT_STATE = {
    editPostDisclosure: false,
    selectedPost: null,
};

const Feed = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOGGLE_EDIT_POST_DISCLOSURE: {
            return { ...state, editPostDisclosure: !state.editPostDisclosure };
        }
        case SELECT_POST: {
            return { ...state, selectedPost: action.payload };
        }
        default:
            return state;
    }
};

export default Feed;
