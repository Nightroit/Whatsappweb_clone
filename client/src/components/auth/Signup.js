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
                            <h2 >clone by nightroit</h2>
                    </div>
                    <div class="content-right signupgroup">
                            <form onSubmit = {handleSubmit(this.onSubmit)}>
                                <div class="form-group signupForm">
                                    <fieldset className = "fieldset">
                                        <Field 
                                            name = 'email'
                                            type = 'text'
                                            component = 'input' 
                                            placeholder = 'Enter email'
                                            />
                                    </fieldset>            
                                </div>
                                <div class="form-group signupForm">
                                    <fieldset  className = "fieldset">
                                        <Field 
                                            name = 'password'
                                            type = 'password'
                                            component = 'input'
                                            placeholder = 'Enter password'
                                            />
                                    </fieldset>
                                </div>
                                <div class="form-group signupForm">
                                    <fieldset  className = "fieldset">
                                        <Field 
                                            name = 'confirmPassword'
                                            type = 'password'
                                            component = 'input'
                                            placeholder = 'Conrim password'
                                            />
                                    </fieldset>
                                </div>
                                <div class="form-group signupForm">
                                    <fieldset  className = "fieldset">
                                        <Field 
                                            name = 'handle'
                                            type = 'text'
                                            component = 'input'
                                            placeholder = 'Enter handle'
                                            />
                                    </fieldset>
                                </div>
                                <div class = "errorMessage">
                                   <h4>{this.props.errorMessage}</h4> 
                                </div>
                                <div class="login">
                                    <button class="btn">Submit</button>
                                </div>    
                        
                                 <button class = "btnsignIn" onClick = {() => this.props.Click(true)}>Or Sign in?</button>
                                
                                   
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

