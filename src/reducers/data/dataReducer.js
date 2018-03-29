
const initialState = [];

function dataReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_DATA':
            state = Object.assign([], initialState, action.data);
        break;
    }
    return state;
}

module.exports = dataReducer;