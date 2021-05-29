import React from 'react'; 
import {reduxForm, Field} from 'redux-form'; 
import {compose} from 'redux'; 
import {connect} from 'react-redux'; 
import * as actions from '../../actions/index'

class Signin extends React.Component {
    onSubmit = (formProps) => {
        this.props.signin(formProps, () => {
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
                            <form onSubmit = {handleSubmit(this.onSubmit)} >
                                <div class="form-group">
                                    <fieldset className = "fieldset">
                                        <Field
                                            id="login__username" 
                                            class="form-group"
                                            name = 'email'
                                            type = 'text'
                                            component = 'input'
                                            placeholder = "Enter username" 
                                            />
                                    </fieldset>            
                                </div>
                                <div class="form-group">
                                    <fieldset className = "fieldset">
                                        <Field 
                                            class="form-group"
                                            name = 'password'
                                            type = 'password'
                                            component = 'input'
                                            placeholder = "password"
                                            />
                                    </fieldset>
                                </div>
                                <div>
                                    <h3>{this.props.errorMessage}</h3>
                                </div>
                                <div class="login">
                                    <button class="btn">Sign In</button>
                                </div>                     
                                <div class="create-btn">
                                    <button class="loginbtn" onClick = {() => this.props.Click(false)}>Create account</button>
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
    reduxForm({form: 'signin'})
)(Signin); 

