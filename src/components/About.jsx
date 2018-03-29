'use strict';

const React = require('react');
const {Component, PropTypes} = React;
//const Login = require('Login');
const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { toggleNotification, hideNotification, showNotification } = require('../actions/notificationActions');


class About extends Component {

    render() {
        return (
            <div className={style.center}>
                <div className={style.row}>
                    <h1>About this app</h1>
                    <h4>Developers: Jaroslav Siroic</h4>
                </div>
                <h1>Play with notification </h1>
                <div className={style.row}>
                    <button className={styleButtons.buttonPrimary} onClick={() => {this.props.toggleNotification()}}>Notification is hidden: {`${this.props.hidden}`}</button>
                    <button className={styleButtons.buttonInfo} onClick={() => {this.props.showNotification('Info message', 'info')}}>Show info!</button>
                    <button className={styleButtons.buttonSuccess} onClick={() => {this.props.showNotification('Success message', 'success')}}>Show success!</button>
                    <button className={styleButtons.buttonDanger} onClick={() => {this.props.showNotification('Danger message', 'danger')}}>Show danger!</button>
                    <button className={styleButtons.buttonSecondary} onClick={() => {this.props.hideNotification()}}>Hide notification</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hidden: state.communication.notification.hidden
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleNotification: toggleNotification,
        showNotification: showNotification,
        hideNotification: hideNotification,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(About);