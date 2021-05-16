import React, {useState} from 'react'
import "./styles/Chat.css"

// Material UI ----------------------------------------------------------------------------------
import { Avatar, IconButton } from "@material-ui/core"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Material UI ----------------------------------------------------------------------------------

// Components -----------------------------------------------------------------------------------
import Message from './components/Message';
import Loaded from './components/Loaded'
// Components -----------------------------------------------------------------------------------

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
      
        this.props.sendMessage(this.state.message)
        this.setState({message: ""})
    }

    render() {
        // let loaded = (
       
        //     )
        let loading = (
            <div className = "chat__body">
                <svg class="spinner" width="65px" height="65px"  viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        )
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
                {}
                {(this.props.message) ? 1: loading}
                
            </div>
        )
    }
}
export default Chat
