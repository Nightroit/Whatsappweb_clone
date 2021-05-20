import React, {useEffect} from 'react';
import './styles/Home.css';

import {COMMUNITY_CHAT, DATA_REQ, USER_CONNECTED, LOAD_MESSAGES, UPDATE_DB, SEND_MESSAGE, LOAD_PROFILE, SOCKET_ID} from '../../utils/Events'
import {connect} from 'react-redux'; 


import Chat from './Chat.js';
import Sidebar from './Sidebar';
import socket from '../../utils/socket'
import * as actions from '../../actions/index'
import { HighlightSharp, ThreeSixtySharp } from '@material-ui/icons';

class Home extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      contacts: [], 
      messages: {}, 
      handle: "", 
      reciever: "", 
      loaded: false, 
      search: false, 
      sockets: {}
    }
  }

  componentWillMount() {
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
    }) 

    socket.on(LOAD_PROFILE, (data) => {
      this.setState((prevState) => ({
        contacts: [...data.contacts], 
      }))
      this.setState({
        loaded: true
      })
    })
    socket.on(SOCKET_ID, (data) => {
      this.setState((prevState) => {
        sockets: prevState.sockets[data.handle] = data.socketId
      }, () => {
        console.log(this.state.sockets)
      })
    })

    socket.on(SEND_MESSAGE, (data) => {
      console.log(data); 
    })

    socket.on(LOAD_MESSAGES, (msg) => {
      let handle = msg.data.handle; 
      this.setState((prevState) => {
        messages: prevState.messages[handle] = msg.data.messages
      })
    })
  }

  sendMessage = (msg) => {
    msg.preventDefault(); 
    let data = {
      message: msg.target.msginp.value, 
      sender: this.state.handle, 
      reciever: this.state.reciever, 
      socketId: this.state.sockets[this.state.reciever]
    }
    console.log(data); 
    msg.target.msginp.value = ''
    socket.emit(SEND_MESSAGE, (data));
  }

  changeUser = (e) => {
    console.log(this.state.handle);
    this.setState({
      reciever: e.handle
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
              messages = {this.state.messages[this.state.reciever]}
              />
              {/* messages = {this.state.message} */}
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