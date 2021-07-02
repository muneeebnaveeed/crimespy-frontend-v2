import { FORGET_USER, FORGET_USER_SUCCESSFUL, FORGET_PASSWORD_API_FAILED } from './actionTypes';

export const forgetUser = (user, history) => ({
    type: FORGET_USER,
    payload: { user, history },
});

export const forgetUserSuccessful = (message) => ({
    type: FORGET_USER_SUCCESSFUL,
    payload: message,
});

export const userForgetPasswordError = (error) => ({
    type: FORGET_PASSWORD_API_FAILED,
    payload: error,
});
