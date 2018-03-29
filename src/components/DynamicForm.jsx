'use strict';

const React = require('react');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { showNotification } = require('../actions/notificationActions');

const bStyle = require('../scss/_buttons.scss');
const fStyle = require('../scss/_forms.scss');

class DynamicForm extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm(refs) {
        const { formData } = this.props;
        let errorText = '';
        let refValue, ref2Find, validate;

        for (var i = 0; i < formData.length; i++) {
            ref2Find = formData[i].props.ref;
            validate = formData[i].validate; // validation function for this field
            refValue = refs[ref2Find].value; // value which user has typed

            errorText = validate(refValue);
            if (errorText !== '') {
                this.props.showNotification(formData[i].label+' '+errorText, 'danger');
                return false;
            }
        }
        return true;
    }

    onClick(event) {
        event.preventDefault();

        if (!this.validateForm(this.refs)) {
            return;
        }
        //emit click

        let data = {};
        this.props.formData.map((field) => { // collect all form inputs
            let ref = field.props.ref;
            data[ref] = this.refs[ref].value;
            this.refs[ref].value = '';
        });

        this.props.onClick(data);
    }

    render() {
        const { formData, buttonLabel, legend } = this.props;
        return (
            <form className={fStyle.form}>
                <legend><h3>{legend}</h3></legend>
                {
                    formData.map((e)=>{
                        return (
                            <div key={e.props.ref} className={fStyle.formRow}>
                                <label><b>{e.label}</b></label>
                                {React.createElement(e.type, e.props)}
                            </div>
                        )
                    })
                }
                <button className={`${bStyle.buttonSuccess} ${fStyle.button}`} onClick={this.onClick}>{buttonLabel}</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotification: showNotification
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(DynamicForm);