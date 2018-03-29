const { combineReducers } = require('redux');

const communicationReducer = require('./communication');
const dataReducer = require('./data');
const sessionReducer = require('./session');

const rootReducer = combineReducers({
    communication: communicationReducer,
    data: dataReducer,
    session: sessionReducer,
});

module.exports = rootReducer;