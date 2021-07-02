import MockAdapter from 'axios-mock-adapter';
import { api } from 'helpers/query';

const createUser = (id, username, email) => ({ id, username, email });

const users = [{ id: 1, username: 'admin', password: '123456', email: 'admin@themesdesign.in' }];

const myUsers = [
    createUser(0, 'muneeebnaveeed', 'muneeebnaveeed@gmail.com'),
    createUser(1, 'agathaharkness', 'agathaharkness@gmail.com'),
];

const fakeBackend = () => {
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(api, { delayResponse: 2000 });

    mock.onPost('/post-register').reply(function (config) {
        const user = JSON.parse(config.data);
        users.push(user);

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, user]);
            });
        });
    });

    mock.onPost('/post-login').reply(function (config) {
        const user = JSON.parse(config.data);
        const validUser = users.filter((usr) => usr.email === user.username && usr.password === user.password);

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (validUser.length === 1) {
                    resolve([200, validUser[0]]);
                } else {
                    reject([400, 'Username and password are invalid. Please enter correct username and password']);
                }
            });
        });
    });

    mock.onPost('/forget-pwd').reply(function (config) {
        // User needs to check that user is eXist or not and send mail for Reset New password

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, 'Check you mail and reset your password.']);
            });
        });
    });

    mock.onGet('/users').reply(200, myUsers);
};

export default fakeBackend;
