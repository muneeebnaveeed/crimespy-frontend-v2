// @flow

import {
    SET_COUNT,
    SET_ORDER,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_CATEGORIES,
    SET_SORT,
    SET_DELETE_CATEGORY_ID,
    TOGGLE_CREATE_CATEGORY_DISCLOSURE,
    TOGGLE_DELETE_CATEGORY_DISCLOSURE,
} from "./actionTypes";

const INIT_STATE = {
    page: 0,
    pageSize: 5,
    sort: "created_at",
    order: "ASC",
    createDisclosure: false,
    deleteDisclosure: false,
    categories: null,
    count: null,
    deleteCategoryId: null,
};

const Categories = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_PAGE: {
            return { ...state, page: action.payload };
        }
        case SET_PAGE_SIZE: {
            return { ...state, pageSize: action.payload };
        }
        case SET_SORT: {
            return { ...state, sort: action.payload };
        }
        case SET_ORDER: {
            return { ...state, order: action.payload };
        }
        case TOGGLE_CREATE_CATEGORY_DISCLOSURE: {
            return { ...state, createDisclosure: !state.createDisclosure };
        }
        case TOGGLE_DELETE_CATEGORY_DISCLOSURE: {
            return { ...state, deleteDisclosure: !state.deleteDisclosure };
        }
        case SET_CATEGORIES: {
            return { ...state, categories: action.payload };
        }
        case SET_COUNT: {
            return { ...state, count: action.payload };
        }
        case SET_DELETE_CATEGORY_ID: {
            return { ...state, deleteCategoryId: action.payload };
        }
        default:
            return state;
    }
};

export default Categories;
