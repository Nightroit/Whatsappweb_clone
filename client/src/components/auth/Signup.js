import React from 'react'; 
import {reduxForm, Field} from 'redux-form'; 
import {compose} from 'redux'; 
import {connect} from 'react-redux'; 
import * as actions from '../../actions/index'
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            // this.props.history.push('/features'); 
        });
    } 
    
    render() {
        const {handleSubmit} = this.props; 

        return (
            <div class="loginsignup">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="content-left">
                            <h1>Whatsapp Web</h1>
                            <h2>clone by nightroit</h2>
                    </div>
                    <div class="content-right">
                            <form onSubmit = {handleSubmit(this.onSubmit)}>
                                <div class="form-group">
                                    <fieldset className = "fieldset">
                                        <Field 
                                            name = 'email'
                                            type = 'text'
                                            component = 'input' 
                                            placeholder = 'Enter email'
                                            />
                                    </fieldset>            
                                </div>
                                <div class="form-group">
                                    <fieldset  className = "fieldset">
                                        <Field 
                                            name = 'password'
                                            type = 'password'
                                            component = 'input'
                                            placeholder = 'Enter password'
                                            />
                                    </fieldset>
                                </div>
                                <div class="form-group">
                                    <fieldset  className = "fieldset">
                                        <Field 
                                            name = 'handle'
                                            type = 'text'
                                            component = 'input'
                                            placeholder = 'Enter handle'
                                            />
                                    </fieldset>
                                </div>
                                <div>
                                    {this.props.errorMessage}
                                </div>
                                <div class="login">
                                    <button class="btn">Submit</button>
                                </div>                     
                                <div class="create-btn">
                                <p>Already a user?</p>
                                    <a targe = "#"  onClick = {() => this.props.Click(true)}>signin</a>
                                </div>
                            </form>
                             </div>
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage}
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'signup'})
)(Signup); 

