'use strict';

const React = require('react');
const { Component, PropTypes } = React;
const { Button, Jumbotron } = require('react-bootstrap');

const style = require('../scss/main.scss');
const { tags_list } = require('../config');

class TextTagger extends Component {

    constructor(props) {
        super(props);
        this.selectionChange = this.selectionChange.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.state = {
            text: '',
            selected: {}
        };
    }

    componentDidMount() {
        document.onkeyup = document.onselectionchange = this.selectionChange;
        document.onmouseup = this.mouseUp;
        // this.setState({text: this.props.text});
    }

    componentWillUnmount() {
        document.onkeyup = document.onselectionchange = null;
        document.onmouseup = null;
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({text: nextProps.text});
    }

    mouseUp() {
        if (this.state.selected.text) {
            const data = {
                id: new Date().getTime(),
                start: Math.min(this.state.selected.anchorOffset, this.state.selected.extentOffset),
                end: Math.max(this.state.selected.anchorOffset, this.state.selected.extentOffset),
                text: this.state.selected.text,
                tag: tags_list[0],
                tag_id: 0
            };
            this.props.addTag(data);

            this.setState({
                selected: {}
            });
        }
    }

    selectionChange() {
        const selection = window.getSelection();
        let isTaggerText = false;
        if (selection.anchorNode && selection.anchorNode.parentElement.attributes.id) {
            isTaggerText = selection.anchorNode.parentElement.attributes.id.nodeValue === 'tagger_text';
        }
        if (window.getSelection && isTaggerText && selection.anchorNode.textContent) {
            let a = selection.anchorOffset;
            let e = selection.extentOffset;
            let txt = selection.anchorNode.textContent.substring(e, a);
            this.setState({
                selected: {
                    text: txt,
                    extentOffset: e,
                    anchorOffset: a
                }
            });
        }
    }

    render() {
        const { text } = this.props;
        return (
            <div>
                <pre style={{'whiteSpace': 'pre-wrap'}}>
                    <p id='tagger_text'>
                        {text}
                    </p>
                </pre>
            </div>
        );
    }
}
module.exports = TextTagger;