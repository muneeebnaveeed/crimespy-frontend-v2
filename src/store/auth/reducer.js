import { SET_USER } from "./actionTypes";

const initialState = {
    user: null,
};

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return { ...state, user: action.payload };
            break;
        }
        default: {
            return state;
            break;
        }
    }
};

export default Auth;
