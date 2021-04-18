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
    render() {
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
                {this.props.users.map(e =>  <SidebarChat onClick = {() => {this.props.changeUser(e)}} contact = {e}/> )}
            </div>

        </div>
    )
    }
}

export default Sidebar