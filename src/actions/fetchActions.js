const fetch = require('isomorphic-fetch');
const { showNotification } = require('notificationActions');

function fetchReq(url, request, successCallback=defaultSuccessCallback, errorCallback=defaultErrorCallback) {
    return (dispatch, getState) => {
        return fetch(url, request)
        .then((response) => {
            try {
                if (response.status >= 400) {
                    console.log(response);
                    dispatch(errorCallback(response.status));
                    throw new Error("Bad response from server");
                }

                // return response.json();
                return response.text().then(function(text) {
                    return text ? JSON.parse(text) : {}
                })
            } catch(e) {
                console.log(e);
                return null;
            }
        })
        .then((data) => {
            if (data != null) {
                console.log(data);
                dispatch(successCallback(data));
            } else {
                dispatch(errorCallback("Wystąpił błąd"));
            }
        })
        .catch((error)=>{
            console.log(error)
        });
    };
}

function loginReq(url, request, successCallback=defaultSuccessCallback, errorCallback=defaultErrorCallback) {

    let token = '';

    return (dispatch, getState) => {
        return fetch(url, request)
        .then((response) => {
            try {
                if (response.status >= 400) {
                    console.log(response);
                    throw new Error("Bad response from server");
                }
                for (var pair of response.headers.entries()) {
                    if (pair[0] === 'authorization') {
                        token = pair[1];
                    }
                }
                return response.json();
            } catch(e) {
                dispatch(errorCallback(response.status));
                console.log(e);
                return null;
            }
        })
        .then((user) => {
            if (user != null) {
                dispatch(successCallback({user, token}));
            } else {
                dispatch(errorCallback("Dane logowania są nie poprawne"));
            }
        })
        .catch((error)=>{
            console.log(error)
        });
    };
}

function apiReq(url, req, successCallback, errorCalback) {
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.session.user;

        if (req.headers === undefined) {
            req.headers = {};
        }
        req.headers.Authorization = token;

        dispatch(fetchReq(url, req, successCallback, errorCalback));
    }
}

function defaultErrorCallback(status) {
    return showNotification('Error fetching. Status: '+status, 'danger');
}

function defaultSuccessCallback() {
    return showNotification('Done!', 'success');
}

// fetch(url, {
//   credentials: 'include', //pass cookies, for authentication
//   method: 'post',
//   headers: {
//   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//   },
//   body: form
// });


module.exports = {
    fetchReq,
    defaultErrorCallback,
    defaultSuccessCallback,
    apiReq,
    loginReq
};