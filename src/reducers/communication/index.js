const { combineReducers } = require('redux');
const notificationReducer = require('./notificationReducer');
const navigationReducer = require('./navigationReducer');

const communicationReducer = combineReducers({
    notification: notificationReducer,
    navigation: navigationReducer
});

module.exports = communicationReducer;