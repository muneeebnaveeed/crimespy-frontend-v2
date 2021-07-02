import axios from 'axios';

// Gets the logged in user data from local session
const getLoggedInUser = () => {
    const user = localStorage.getItem('authUser');
    if (user) return JSON.parse(user);
    return null;
};

// is user is logged in
const isUserAuthenticated = () => getLoggedInUser() !== null;

// Register Method
const postRegister = (url, data) =>
    axios
        .post(url, data)
        .then((response) => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch((err) => {
            let message;
            if (err.response && err.response.status) {
                switch (err.response.status) {
                    case 404:
                        message = 'Sorry! the page you are looking for could not be found';
                        break;
                    case 500:
                        message = 'Sorry! something went wrong, please contact our support team';
                        break;
                    case 401:
                        message = 'Invalid credentials';
                        break;
                    default:
                        // eslint-disable-next-line prefer-destructuring
                        message = err[1];
                        break;
                }
            }
            throw message;
        });

// Login Method
const postLogin = (url, data) =>
    axios
        .post(url, data)
        .then((response) => {
            if (response.status === 400 || response.status === 500) throw response.data;
            return response.data;
        })
        .catch((err) => {
            throw err[1];
        });

// postForgetPwd
const postForgetPwd = (url, data) =>
    axios
        .post(url, data)
        .then((response) => {
            if (response.status === 400 || response.status === 500) throw response.data;
            return response.data;
        })
        .catch((err) => {
            throw err[1];
        });

export { getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd };
