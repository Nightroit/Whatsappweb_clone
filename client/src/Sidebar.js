import React from 'react'
import './Sidebar.css';
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core"

import SearchIcon from '@material-ui/icons/Search';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from './SidebarChat';


class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.fetchMessage = this.fetchMessage.bind(this); 
    }
    fetchMessage(e) {
        console.log(e);
    }
    render() {
        const data = [{
            "name": "Shivam",
            "lastMessage": "Hi there!" }, 
            {
                "name": "Jeff Bezos", 
                "phone_number": "9999999999",
                "lastMessage" : "Customer Obsession", 
            }, {
                "name" : "Elon Musk", 
                "phone_number": "8888888888",
                "lastMessage" : "WorkLike Hell",
            }
        ]
    return (
        <div className = "sidebar">

            <div className = "sidebar__header">
                <Avatar 
                    src = "https://lh3.googleusercontent.com/ogw/ADGmqu9KA8ibs9AXN3VT0CAGTZsFcyzR9lTC8jeNzLIX=s32-c-mo" 
                />
                <div className = "sidebar__headerRight">
                    <IconButton > 
                        <ChatIcon  />
                    </ IconButton >

                    <IconButton > 
                        <DonutLargeIcon />
                    </ IconButton >

                    <IconButton > 
                        <MoreVertIcon  />
                    </ IconButton >

                </div>
            </div>


            <div className = "sidebar__search">
                <div className ="sidebar__searchContainer">
                        <SearchOutlinedIcon/>
                    <input type = "text"></input>
                </div>
            </div>

            <button onClick = {this.fetchMessage} >Clicked</button>
            <div className = "sidebar__chats">
                {data.map(e =>  <SidebarChat onClick = {() => {this.fetchMessage(e['phone_number'])}} contact = {e}/> )}
            </div>

        </div>
    )
    }
}

export default Sidebar
