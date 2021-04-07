import {
    SET_CATEGORIES,
    SET_COUNT,
    SET_DELETE_CATEGORY_ID,
    SET_ORDER,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_SORT,
    TOGGLE_CREATE_CATEGORY_DISCLOSURE,
    TOGGLE_DELETE_CATEGORY_DISCLOSURE,
} from "./actionTypes";

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

export const toggleCreateCategoryDisclosure = () => ({
    type: TOGGLE_CREATE_CATEGORY_DISCLOSURE,
});

export const toggleDeleteCategoryDisclosure = () => ({
    type: TOGGLE_DELETE_CATEGORY_DISCLOSURE,
});

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});

export const setCount = (count) => ({
    type: SET_COUNT,
    payload: count,
});

export const setDeleteCategoryId = (id) => ({
    type: SET_DELETE_CATEGORY_ID,
    payload: id,
});
