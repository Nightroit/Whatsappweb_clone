import React, {useEffect} from 'react';
import './styles/Home.css';

import {COMMUNITY_CHAT, DATA_REQ, LOAD_MESSAGES, UPDATE_DB, SEND_MESSAGE, LOAD_PROFILE, SOCKET_ID} from '../../utils/Events'
import {connect} from 'react-redux'; 


import Chat from './Chat.js';
import Sidebar from './Sidebar';
import socket from '../../utils/socket'
import * as actions from '../../actions/index'

class Home extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      contacts: [], 
      messages: {}, 
      handle: "", 
      reciever: {}, 
      loaded: false, 
      search: false, 
    }
  }

  componentDidMount() {
    this.setState({
      handle: localStorage.getItem('handle')
    }, () => {
      socket.emit(LOAD_PROFILE, this.state.handle); 
    })
    // const data = axios.post('http://localhost:3090/load',
    //                           {handle}, 
    //                           {headers: {Authorization: `Bearer ${this.props.state.auth.authenticated}`}}
    //                           );

    
    socket.on('connect', () => {
      console.log("Socket io connected");
      console.log(socket.id)
    }) 

    socket.on(LOAD_PROFILE, (data) => {
      console.log(data)
      this.setState(({
        contacts: [...data.contacts]
      }), () => {
        this.setState({
          loaded: true
        })
      })
    })


    socket.on(LOAD_MESSAGES, (msg) => {
      
      let handle = msg.handle
      this.setState((prevState) => {
        messages: prevState.messages[handle] = msg.messages
      })
      if(msg.handle == this.state.contacts[0].handle) {
        this.setState({
          reciever: {
            handle: msg.handle
          }
        })
      }
    })
  }


  sendMessage = (msg) => {
    let data = {
      message: msg, 
      sender: this.state.handle, 
      reciever: this.state.reciever.handle, 
      socketId: this.state.reciever.socketId
    }
    console.log(data)
    socket.emit(SEND_MESSAGE, data);
  }

  changeUser = (e) => {
    
    this.setState({
      reciever: {
        handle: e.handle
      }
    }, () => {
      console.log(this.state.messages[this.state.reciever.handle])
    });
  }
  
  render() {
  return (
    <div className="app">
      <div className = "app__body">
        {this.state.loaded ? (
          <>
              <Sidebar 
              search = {this.state.search}
              users = {this.state.contacts}
              changeUser = {this.changeUser}
              handle = {this.state.handle}/>
              <Chat 
              className = "chat" 
              handle = {this.state.handle}
              sendMessage = {this.sendMessage}  
              messages = {this.state.messages[this.state.reciever.handle]}
              reciever = {this.state.handle}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}