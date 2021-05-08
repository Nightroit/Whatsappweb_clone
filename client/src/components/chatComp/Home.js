import React from 'react';
import {COMMUNITY_CHAT, DATA_REQ, USER_CONNECTED, LOAD_MESSAGES, UPDATE_DB} from '../../utils/Events'
import {connect} from 'react-redux'; 
import './Home.css';
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
      message: [], 
      handle: "", 
      reciever: "", 
      loaded: false, 
      search: false
    }
  }

  componentDidMount() { 
    let handle = localStorage.getItem('handle'); 
    socket.emit(USER_CONNECTED, handle)
    this.props.actions.loadUsers(handle, this.props.dispatch); 
    
    socket.on('connect', () => {
      console.log("Socket io connected");
    })   
    socket.on(COMMUNITY_CHAT, (msg) => {    
      let  new_data = this.state.data; 
    
      new_data[msg.sender].push(msg); 
      this.setState((prevState) => ({
        data: new_data
      }))
    })
    socket.on(DATA_REQ, (data) => {
      this.setState((prevState) => ({
        contacts: [...data.contacts], 
        handle: data.handle, 
      }))
      this.setState({
        loaded: true
      })
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
      // console.log(messages); 
      // this.setState({
      //   messages:messages, 
      //   loaded: true, 
      // }, () => {
      //   console.log(this.state.messages)
      // })
    })
  }

  sendMessage = (msg) => {
    // let data = new Message({
    //   handle1: this.state.handle, 
    // })
    let idx = this.state.message; 
    idx = this.state.message[idx.length-1].messageId;
    let data = {msg, reciever: this.state.reciever, sender: this.state.handle, messageId: idx+1} 
    let new_data = this.state.data; 
    new_data[this.state.reciever].push(data);
    this.setState({data: new_data})
    socket.emit(UPDATE_DB, data); 
    socket.emit(COMMUNITY_CHAT, data) 
  }

  changeUser = (e) => {
    this.setState((prevState) => ({
      message: prevState.data[e], 
      reciever: e
    })) 
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
              currentUser = {this.state.handle}/>
              <Chat 
              name = {this.state.name}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

{/*<h1>Jai Shri Ram</h1>
<h1>Mahabali hanuman</h1>*/}