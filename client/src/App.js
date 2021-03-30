import React from 'react';
import {COMMUNITY_CHAT, DATA_REQ, USER_CONNECTED} from './utils/Events'
import {connect} from 'react-redux'; 
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import socket from './utils/socket'
import * as actions from './actions/index'

class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      data: {},
      message: {}, 
      name: "", 
      name_val: "", 
      reciever: "", 
      loaded: false
    }
  }


  componentDidMount() {
    socket.on('connect', () => {
      console.log("Socket io connected"); 
    })   
    // socket.on(COMMUNITY_CHAT, (msg) => {
    //   let newData = this.state.data; 
    //   this.setState((prevState) => ({data: newData, message: [...prevState.message, msg] }))
    // })
    // socket.on(DATA_REQ, (data) => {
    //   this.setState({
    //     reciever: data[this.state.name]["connections"][0].name
    //   })
    //   this.setState({
    //     name_val: this.state.name, 
    //     message: data[this.state.name]["msg"][this.state.reciever], 
    //     loaded: true, 
    //     data: data,
    //   })
    // })
  }

  // sendMessage = (msg) => {
  //   let data = {msg, reciever: this.state.reciever, sender: this.state.name_val}
  //   socket.emit(COMMUNITY_CHAT, data)
  //   this.setState((prevState) => ({
  //       message: [...prevState.message, data]
  //   }))
  //   console.log(this.state.message); 
  // }

  handleSubmit = (e) =>  {
    e.preventDefault();
    this.props.actions.loadUsers(this.state.name, this.props.dispatch); 
    // socket.emit(USER_CONNECTED, this.state.name)
    
  }

  // changeUser = (e) => { 
  //     this.setState((prevState) => ({
  //     message: prevState.data[prevState.name]["msg"][e.name], 
  //     reciever: e.name
  //   }))
    
  // }
  render() {

  return (
    <div className="app">
      <div className = "app__body">
        <form onSubmit = {this.handleSubmit}>
          <input name = "sender" onChange = {(e) => {this.setState({name: e.target.value})}} value = {this.state.name} placeholder = "Enter your name first"></input>
          <button>done</button>
        </form>     
        { <h1>Welcome {this.state.name_val}</h1> }
        {this.state.loaded ? (
          <>

            <Sidebar 
            users = {this.state.data[this.state.name_val]["connections"]} 
            changeUser = {this.changeUser}/>
            <Chat 
            className = "chat" 
            sendMessage = {this.sendMessage}  
            message = {this.state.message}/>
          </>
          ) : ''
          }
         
      </div>
    </div>
  );
}
}

const mapStateToProps = (state) => ({state})

const mapDispatchToProps = (dispatch) => ({dispatch, actions})

export default connect(mapStateToProps, mapDispatchToProps)(App);

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}