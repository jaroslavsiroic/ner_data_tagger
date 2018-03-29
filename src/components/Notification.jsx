'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const style = require('../scss/_notifications.scss');
const mainStyle = require('../scss/main.scss');

class Notification extends Component {

    constructor(props) {
        super(props);
        this.timeout;
    }

    render() {
        const {color, message, hidden, hide} = this.props;
        if (hidden) {
            return null;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => { this.props.hide(); }, 5000);

        return (
            <div className={`${style[color]} ${mainStyle.center}`}>
                {message}
            </div>
        );
    }
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
};

Notification.defaultProps = {
    hidden: true,
    color: 'info'
};

module.exports = Notification;