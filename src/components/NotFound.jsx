'use strict';

const React = require('react');
const { Component } = require('react');
const style = require('../scss/main.scss');

class NotFound extends Component {

    render() {
        return (
            <div className={`${style.row} ${style.center}`}>
                <h1><b><strong> 404 NOT FOUND! </strong></b></h1>
            </div>
        );
    }
}



module.exports = NotFound;