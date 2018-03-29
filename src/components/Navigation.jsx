'use strict';

const React = require('react');
const { Component } = React;
const { Link } = require('react-router');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const style = require('../scss/navigation.scss');

class Navigation extends Component {
    render() {
        const { links } = this.props;
        return (
            <ul className={style.nav}>
                {links.map(link => {
                    let look = link.alignRight ? style.specialItem : style.listItem;
                    return <li key={link.title} className={look}><Link to={link.url}>{link.title}</Link></li>
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        links: state.communication.navigation.links
    }
}

module.exports = connect(mapStateToProps)(Navigation);
