const { combineReducers } = require('redux');
const userReducer = require('./userReducer');

const sessionReducers = combineReducers({
    user: userReducer,
});

module.exports = sessionReducers;