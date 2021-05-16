import React, {useEffect} from 'react';
import './styles/Home.css';

import {COMMUNITY_CHAT, DATA_REQ, USER_CONNECTED, LOAD_MESSAGES, UPDATE_DB, SEND_MESSAGE, LOAD_PROFILE} from '../../utils/Events'
import {connect} from 'react-redux'; 


import Chat from './Chat.js';
import Sidebar from './Sidebar';
import socket from '../../utils/socket'
import * as actions from '../../actions/index'
import { HighlightSharp } from '@material-ui/icons';

class Home extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      contacts: [], 
      messages: [], 
      handle: "", 
      reciever: "", 
      loaded: false, 
      search: false
    }
  }

  componentWillMount() { 
    let handle = localStorage.getItem('handle');
    console.log(handle);
    // const data = axios.post('http://localhost:3090/load',
    //                           {handle}, 
    //                           {headers: {Authorization: `Bearer ${this.props.state.auth.authenticated}`}}
    //                           );

    socket.emit(LOAD_PROFILE, handle); 
    socket.on('connect', () => {
      console.log("Socket io connected");
    }) 
    socket.on(LOAD_PROFILE, (data) => {
      console.log(data)
      this.setState((prevState) => ({
        contacts: [...data.contacts], 
        handle: data.handle, 
      }))
      this.setState({
        loaded: true
      })
    })
    socket.on(LOAD_MESSAGES, (messages) => {
      console.log(messages); 
    })
  }

  sendMessage = (msg) => {
    let data = {
      message: msg, 
      sender: this.state.handle, 
      reciever: this.state.reciever
    }
    // socket.emit(SEND_MESSAGE, data)
    // new_data[this.state.reciever].push(data);
    // this.setState({data: new_data})
    // socket.emit(UPDATE_DB, data); 
    // socket.emit(COMMUNITY_CHAT, data) 
  }

  changeUser = (e) => {
    this.setState((prevState) => ({
      message: prevState.data[e], 
      reciever: e
    }));
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
              name = {this.state.name}
              className = "chat" 
              sendMessage = {this.sendMessage}  
              />
              {/* message = {this.state.message} */}
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