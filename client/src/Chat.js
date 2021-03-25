import React, {useState} from 'react'
import "./Chat.css"
import 
import { Avatar, IconButton } from "@material-ui/core"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import axios from "./axios";
//import { useState } from "react"

//import
    
const Chat = (props) => {
    
    const [input, setInput] = useState("");


    const sendMessage = (e) => {
        e.preventDefault();
        props.sendMessage(input)
        setInput('');
    }
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
                {props.message.map(message => (
                    <p className = {`chat__message ${message.received && 'chat__reciever' }`}>
                        <span className = "chat__name">{message.name}</span>
                            {message}
                        <span className = "chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className = "chat__footer">
                
                <IconButton>
                    <MoodIcon/>
                </IconButton>
                <form>
                    <input value = {input}  onChange = {(e) => setInput(e.target.value)} placeholder = "Type a message" type = "text">
                    </input>
                        <button onClick = {sendMessage}  type = "submit"></button>
                </form> 
                <IconButton>
                    <MicNoneIcon />
                </IconButton>

            </div>

        </div>
    )
}

export default Chat
