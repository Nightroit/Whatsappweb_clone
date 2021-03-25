import React, {useEffect, useState} from 'react';
import {COMMUNITY_CHAT} from './utils/Events'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from './axios'; 
import socket from './utils/socket'
class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      message: []
    }
  }
  componentDidMount() {
    socket.on('connect', () => {
      console.log('connedted')
    })   
    socket.on(COMMUNITY_CHAT, (msg) => {
      console.log(this.state.message)
      this.setState((prevState) => ({message: [...prevState.message, msg]}))
    })
  }

  sendMessage = (data) => {
    socket.emit(COMMUNITY_CHAT, data)
  }

  render() {
  return (
    <div className="app">
      <div className = "app__body">
        <Sidebar />
        <Chat sendMessage = {this.sendMessage}  message = {this.state.message}/>
      </div>
    </div>
  );
}
}

export default App;

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}