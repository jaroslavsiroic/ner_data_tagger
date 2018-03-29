
const initialState = {
    hidden: true,
    color: 'info',
    message: 'I am notification!'
};

function notificationReducer(state=initialState, action) {
    switch(action.type) {
        case 'TOGGLE_NOTIFICATION':
            const {hidden} = state;
            state = Object.assign({}, state, {hidden: !hidden});
        break;
        case 'HIDE_NOTIFICATION':
            if (!state.hidden) {
                state = Object.assign({}, state, {hidden: true});
            }
        break;
        case 'SHOW_NOTIFICATION':
            const {message, color} = action;
            state = Object.assign({}, state, {hidden: false, color: color, message: message});
        break;
    }

    return state;
}

module.exports = notificationReducer;