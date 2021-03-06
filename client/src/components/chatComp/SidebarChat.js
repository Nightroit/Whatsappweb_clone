import React from 'react'
import "./styles/SidebarChat.css"
import { Avatar } from "@material-ui/core"

    
class SidebarChat extends React.Component {

    render() {
        return (
            <div className = "sidebarChat" onClick = {this.props.onClick}>
            <Avatar />
                {/* {this.props.add :} */}
                <div className = "sidebarChat__info">
                    <h2>{this.props.contact.handle}</h2>
                    {/* <p>{this.props.contact.lastMessage}</p> */}
                </div>
           
        </div>
    )
 }
}

export default SidebarChat;