import React, {useState} from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import axios from "./axios";
import Message from './components/Message';

    
class Chat extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            message: '', 
            sended: []
        }   
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        this.setState((prevstate) => ({sended: [...prevstate.sended, prevstate.message]}))
        this.props.sendMessage(this.state.message)
        this.setState({message: ""})
    }

    render() {
        return (
            <div className = "chat" >
                <div className = "chat__header">
                        <Avatar />
                
                    <div className = "chat__headerInfo">
                        <h3>Room name</h3>
                        <p>Last seen at...</p>
                    </div>

                    <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>

                    </div>
                </div>  

                <div className = "chat__body">
                   <Message message = {this.props.message} sended = {this.state.sended}/>
                </div>

                <div className = "chat__footer">
                    <IconButton>
                        <MoodIcon/>
                    </IconButton>
                    <form onSubmit = {this.handleSubmit}>
                        <input value = {this.state.message}  onChange = {(e) => this.setState({message: e.target.value})} placeholder = "Type a message" type = "text">
                        </input>
                            <button  type = "submit"></button>
                    </form> 
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>

                </div>

            </div>
        )
    }
}
export default Chat
