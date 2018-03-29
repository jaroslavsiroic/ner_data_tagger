const { combineReducers } = require('redux');
const dataReducer = require('./dataReducer');

const dataReducers = combineReducers({
    data: dataReducer,
});

module.exports = dataReducers;