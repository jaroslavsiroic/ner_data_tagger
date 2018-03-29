const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');

function getData(page, objectsPerPage, search, successCallback) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    return (dispatch) => {
        dispatch(showNotification('Ładuje się...', 'info'));
        let url = `/data?page=${page}&objectsPerPage=${objectsPerPage}`;
        if (search != '') {
            url += `&search=${search}`;
        }
        dispatch(apiReq(url, req, successCallback));
    };
}

module.exports = {
    getData
};