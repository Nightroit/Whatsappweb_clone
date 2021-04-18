import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 

export default ChildComponent => {
    class ComposedComponent extends Component {
    
        componentDidMount() {  
            this.shouldNavigateAway(); 
        }
        componentDidUpdate() {
            this.shouldNavigateAway();
        }    
        shouldNavigateAway() {
            console.log(this.props)
            if(!this.props.auth)
                this.props.history.push('/');
            // else localStorage.setItem('handle', )
        }
        render() {
            return <ChildComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        if(state.auth.handle) localStorage.setItem('handle', state.auth.handle)
        return {auth: state.auth.authenticated}; 
    }

    return connect(mapStateToProps)(ComposedComponent); 
};