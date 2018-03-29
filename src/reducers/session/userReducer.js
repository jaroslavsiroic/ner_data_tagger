
const initialState = {
    isLoggedIn: false,
    permission: 'GUEST',
    token: '',
    user: {}
};


function userReducer(state=initialState, action) {
    let usr = Object.assign({}, state.user);

    switch(action.type) {
        case 'RECEIVE_LOGIN':
            const { token, user } = action.data;
            state = Object.assign({}, state, {
                isLoggedIn: true,
                permission: 'USER',
                token: token,
                user: user
            });
        break;
        case 'LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;