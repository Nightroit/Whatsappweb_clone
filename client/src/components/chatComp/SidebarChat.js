import React from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core"


class SidebarChat extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    render() {
        return (
            <div className = "sidebarChat" onClick = {this.props.onClick}>
            <Avatar />
                {/* {this.props.add :} */}
                <div className = "sidebarChat__info">
                    <h2>{this.props.contact}</h2>
                    {/* <p>{this.props.contact.lastMessage}</p> */}
                </div>
           
        </div>
    )
 }
}

export default SidebarChat;