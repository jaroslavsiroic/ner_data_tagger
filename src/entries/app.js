'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');

const { showNotification } = require('../actions/notificationActions');
const { logout } = require('../actions/userActions');

const HomePage = require('../components/HomePage');
const Layout = require('../components/Layout');
const About = require('../components/About');
const NotFound = require('../components/NotFound');

const store = require('../store');

const checkPermission = (nextState, pushState, permission) => {
    const statePermission = store.getState().session.user.permission;
    if (statePermission !== permission) {
        store.dispatch(showNotification('ACCESS DENIED', 'danger'));
        pushState('/');
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={HomePage} />
                <Route path='about' component={About} />
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);