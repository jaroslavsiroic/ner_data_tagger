'use-strict'

const {applyMiddleware, createStore} = require('redux');

const logger = require('redux-logger');
const thunk = require('redux-thunk').default;

const rootReducer = require('./reducers');

const middleware = applyMiddleware(thunk, logger());

module.exports = createStore(rootReducer, middleware);