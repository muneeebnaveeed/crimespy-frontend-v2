// @flow

import {
    SET_COUNT,
    SET_DELETE_PRODUCT_ID,
    SET_ORDER,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_PRODUCTS,
    SET_SORT,
    TOGGLE_CREATE_PRODUCT_DISCLOSURE,
    TOGGLE_DELETE_PRODUCT_DISCLOSURE,
    SET_CATEGORY_ID,
} from './actionTypes';

const INIT_STATE = {
    page: 0,
    pageSize: 5,
    sort: 'created_at',
    order: 'ASC',
    createDisclosure: false,
    deleteDisclosure: false,
    products: null,
    count: null,
    deleteProductId: null,
    categoryId: '',
};

const Products = (state = INIT_STATE, action) => {
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
        case TOGGLE_CREATE_PRODUCT_DISCLOSURE: {
            return { ...state, createDisclosure: !state.createDisclosure };
        }
        case TOGGLE_DELETE_PRODUCT_DISCLOSURE: {
            return { ...state, deleteDisclosure: !state.deleteDisclosure };
        }
        case SET_PRODUCTS: {
            return { ...state, products: action.payload };
        }
        case SET_COUNT: {
            return { ...state, count: action.payload };
        }
        case SET_DELETE_PRODUCT_ID: {
            return { ...state, deleteProductId: action.payload };
        }
        case SET_CATEGORY_ID: {
            return { ...state, categoryId: action.payload };
        }
        default:
            return state;
    }
};

export default Products;
