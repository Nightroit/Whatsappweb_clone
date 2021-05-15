import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import { Redirect} from 'react-router-dom'; 
import * as actions from '../actions/index';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import './HeaderStyle.css';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bool: true,
        }
    }
    handleClick = (e) => {
        this.setState((prev) => ({
            bool: e, 
        }))
    }
    renderHeader() {
        if(this.props.authenticated) {
            return (
                <div>
                    <Redirect to = "/home"/>
                    {/* {"ram"} */}
                    {/* <Link to = "/signout" exact>Sign out</Link> */}
                </div>
            )
        } else {    
            return (    
                <div>
                    {this.state.bool?(<Signin Click = {this.handleClick}/>):(<Signup Click = {this.handleClick}/>)}
                </div>
            )
        }
    }
    render() {
        return (
                <>
                {this.renderHeader()}
                </>
            )
        }   
    }

function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, actions)(Header); 