import React, {useEffect, useState} from 'react';
import {COMMUNITY_CHAT, USER_CONNECTED} from './utils/Events'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios'; 
import socket from './utils/socket'
class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      message: [], 
      name: "", 
      name_val: "", 
      reciever: "", 
  
    }
  }


  componentDidMount() {
    // console.log(name)
    socket.on('connect', () => {
      console.log('connected')
    })   
    socket.on(COMMUNITY_CHAT, (msg) => {
      console.log(msg)
      this.setState((prevState) => ({message: [...prevState.message, msg]}))
    })
  }

  sendMessage = (msg) => {
    console.log(msg)

    let data = {msg, reciever: this.state.reciever, sender: this.state.name_val}
    socket.emit(COMMUNITY_CHAT, data)
 

  }
  handleSubmit = (e) =>  {
    e.preventDefault();
    this.setState({name_val: this.state.name, reciever: this.state.reciever})
    socket.emit(USER_CONNECTED, this.state.name)
  
  }
  render() {
  return (
    <div className="app">
      <div className = "app__body">
        {/* <form onSubmit = {this.handleSubmit}>
          <input name = "sender" onChange = {(e) => {this.setState({name: e.target.value})}} value = {this.state.name} placeholder = "Enter your name first"></input>
          <input name = "name" onChange = {(e) => {this.setState({reciever: e.target.value})}} value = {this.state.reciever} placeholder = "to"></input>
          <button>done</button>
        </form>      */}
        {/* <h1>Welcome {this.state.name_val}</h1> */}
        <Sidebar />
        <Chat sendMessage = {this.sendMessage} msgProp = {this.props.lastMsg} message = {this.state.message}/>
      </div>
    </div>
  );
}
}

export default App;

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}