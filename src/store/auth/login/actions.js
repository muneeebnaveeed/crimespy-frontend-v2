import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, API_ERROR, LOGOUT_USER, LOGOUT_USER_SUCCESS } from './actionTypes';

export const checkLogin = (user, history) => ({
    type: CHECK_LOGIN,
    payload: { user, history },
});

export const loginUserSuccessful = (user) => ({
    type: LOGIN_USER_SUCCESSFUL,
    payload: user,
});

export const apiError = (error) => ({
    type: API_ERROR,
    payload: error,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
});

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS,
    payload: {},
});
