import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import Home from './chatComp/Home';
import requireAuth from './requireAuth'

class Feature extends Component {

    render() {
        return<div><Home/></div>
    }
}


export default requireAuth(Feature); 