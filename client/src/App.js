import React, {useEffect, useState} from 'react';
import {COMMUNITY_CHAT, USER_CONNECTED} from './utils/Events'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios'; 
import socket from './utils/socket'
import { IconButton } from '@material-ui/core';
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
    })   
    socket.on(COMMUNITY_CHAT, (msg) => {
      console.log(msg)
      let newData = this.state.data; 
      newData[msg.reciever]["msg"][msg.sender].push(msg.msg)
      this.setState({data: newData})
    })
    socket.on("DATA_RES", (data) => {
      this.setState({
        reciever: data[this.state.name]["connections"][0].name
      })
      console.log(this.state.reciever); 
      this.setState({
        name_val: this.state.name, 
        message: data[this.state.name]["msg"][this.state.reciever], 
        loaded: true, 
        data: data,
      })
      console.log(this.state.data)
    })
  }

  sendMessage = (msg) => {
    // console.log(object)
    let data = {msg, reciever: this.state.reciever, sender: this.state.name_val}
    socket.emit(COMMUNITY_CHAT, data)
  }

  handleSubmit = (e) =>  {
    e.preventDefault();
    socket.emit(USER_CONNECTED, this.state.name)
  }

  changeUser = (e) => { 
      this.setState((prevState) => ({
      message: prevState.data[prevState.name]["msg"][e.name], 
      reciever: e.name
    }))
    
  }
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

export default App;

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}