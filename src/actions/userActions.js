const { showNotification } = require('notificationActions');
const { fetchReq, loginReq } = require('fetchActions');
const { hashHistory } = require('react-router');
const { serialize } = require('queryfetch');
const jwt_decode = require('jwt-decode');

function userLoginClick(user) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(requestLogin(user)); // spinner, notify, stuff like that
        dispatch(showNotification('['+user.username+'] trwa logowanie..', 'info'));

        let encoded = btoa(user.username+':'+user.password);

        const request = {
            credentials: 'include', //pass cookies, for authentication
            method: 'POST', // get, post, put, delete
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic '+encoded,
            }, // x-access-token, stuff like that
            body: ''
        };

        dispatch(loginReq('/login', request, receiveLogin));  ///oauth/token

    };
}

function userRegisterClick(user) {
    return (dispatch, getState) => {
        const state = getState();
        user.Role = 0;
        dispatch(requestLogin(user)); // spinner, notify, stuff like that
        dispatch(showNotification('['+user.Login+'] rejestracja...', 'info'));
        console.log(user)
        const request = {
            credentials: 'include', //pass cookies, for authentication
            method: 'POST', // get, post, put, delete
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            }, // x-access-token, stuff like that
            body: JSON.stringify(user)
        };

        dispatch(fetchReq('/addUser', request, registerSuccess));
    };
}

function registerSuccess(data) { //fetch success
    console.log(data);
    return (dispatch) => {
        dispatch(showNotification('Użytkownik zarejestrowany', 'success'));
    };
}

function requestLogin(user) {
    return {
        type: 'REQUEST_LOGIN',
        user: user
    };
}

function receiveLogin(data) { //fetch success
    console.log(data);
    const func = () => {
        return {
            type: 'RECEIVE_LOGIN',
            data: data
        };
    };
    return (dispatch) => {
        hashHistory.push('/');
        dispatch(func());
        dispatch(showNotification('Witaj w systemie!', 'success'));
    };
}

function logout() {
    const func = () => {
        return {
            type: 'LOGOUT'
        };
    };
    return (dispatch) => {
        hashHistory.push('/');
        dispatch(showNotification('See ya!', 'success'));
        dispatch(func());
    };
}

module.exports = {
    userLoginClick,
    receiveLogin,
    requestLogin,
    userRegisterClick,
    logout
};