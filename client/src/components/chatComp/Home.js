import React, {useEffect} from 'react';
import axios from 'axios'
import {COMMUNITY_CHAT, DATA_REQ, USER_CONNECTED, LOAD_MESSAGES, UPDATE_DB, SEND_MESSAGE} from '../../utils/Events'
import {connect} from 'react-redux'; 
import './Home.css';
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
    const data = axios.post('http://localhost:3090/load',
                              {handle}, 
                              {headers: {Authorization: `Bearer ${this.props.state.auth.authenticated}`}}
                              );

    socket.emit(DATA_REQ, handle); 
    socket.on('connect', () => {
      console.log("Socket io connected");
    }) 
    socket.on(DATA_REQ, (data) => {
      console.log(data)
      // this.setState((prevState) => ({
      //   contacts: [...data.contacts], 
      //   handle: data.handle, 
      // }))
      // this.setState({
      //   loaded: true
      // })
      console.log(this.state.contacts)
      // async () => {
      //    let res = await axios.post('http://localhost:3090/loadmsg', {
      //     users: this.state.users,
      //     name: this.state.name
      //   }); 
      //     this.setState((prevState) => ({
      //       loaded: true, 
      //       message: res.data[prevState.users[0]], 
      //       data: res.data, 
      //       reciever: prevState.users[0]
      //     })) 
      // })
    })
    socket.on(LOAD_MESSAGES, (messages) => {
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