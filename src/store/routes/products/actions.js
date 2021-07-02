import { batch } from 'react-redux';
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

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page,
});

export const setPageSize = (pageSize) => ({
    type: SET_PAGE_SIZE,
    payload: pageSize,
});

export const setSort = (sort) => ({
    type: SET_SORT,
    payload: sort,
});

export const setOrder = (order) => ({
    type: SET_ORDER,
    payload: order,
});

export const toggleCreateDisclosure = () => ({
    type: TOGGLE_CREATE_PRODUCT_DISCLOSURE,
});

export const toggleDeleteProductDisclosure = () => ({
    type: TOGGLE_DELETE_PRODUCT_DISCLOSURE,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setCount = (count) => ({
    type: SET_COUNT,
    payload: count,
});

export const setDeleteProductId = (id) => ({
    type: SET_DELETE_PRODUCT_ID,
    payload: id,
});

export const setCategoryId = (id) => ({
    type: SET_CATEGORY_ID,
    payload: id,
});

export const toggleCreateProductDisclosure = (categoryId) => {
    console.log(typeof categoryId);
    return (dispatch) => {
        console.log('clicking');
        if (categoryId) dispatch(setCategoryId(categoryId));
        dispatch(toggleCreateDisclosure());
    };
};
