import React from 'react'
import './styles/Sidebar.css';
import socket from '../../utils/socket'
import {SEARCH_USER, ADD_CONTACTS} from '../../utils/Events'
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from './SidebarChat';
import { TransferWithinAStationRounded } from '@material-ui/icons';


class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            search: false, 
            result: [], 
            inputVal: ''
        }
    }
    
    handleClick = () => {
        this.setState((prevState) => ({
            search: (!prevState.search)
        }))
    }
    
    handleInput = async (e) => {
        if(e.type == 'change') {
            this.setState({
                inputVal: e.target.value
            })
        } else {
            let handle = e.target.value; 
            let exists = await new Promise (resolve => {
                socket.emit(SEARCH_USER, handle, data => {
                    resolve(data)
                })
            })
            this.setState({
                result: [...exists],
            })
        }
    }

    addContact = (e) => {
        let target = this.state.result.find(user => user.handle === e.handle)
        let data = {
            target: e.handle, 
            handle: this.props.handle,
            socketId: target.socketId
        }
        console.log(data);
        socket.emit(ADD_CONTACTS, data); 
    }

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
                        <input type = "text" value = {this.state.inputVal} onChange = {this.handleInput} onKeyDown = {e => (e.key == 'Enter') ? (this.handleInput(e)) : 1}></input>

                    </div>
                </div>
                    
                    <div className = "sidebar__chats">
                        
                        {
                            (this.state.search && this.state.inputVal === '') ? (<SidebarChat contact = {{handle: 'Search for a user...'}} 
                            />) : ''
                        }
                        {
                        this.state.search ? 
                            this.state.result.map(e => <SidebarChat contact = {e} onClick = {() => {this.addContact(e)}}
                            />)
                        : this.props.users.map(e =>  <SidebarChat onClick = {() => {this.props.changeUser(e)}} contact = {e}/> )
                        }
                    </div>
                <AddCircleIcon onClick = {this.handleClick}/>
                    
            </div>
        )    
    }
}

export default Sidebar
