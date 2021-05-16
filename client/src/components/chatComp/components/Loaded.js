import React from 'react'
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
function Loaded(props) {
    return (
           <div>
                {/* <div className = "chat__body">
                {this.props.message.map(e => {
                return      <Message
                            name = {this.props.name} 
                            message = {e} 
                            sended = {this.props.state.sended}/>
                            })}
                </div>

                <div className = "chat__footer">
                    <IconButton>
                        <MoodIcon/>
                    </IconButton>
                    <form onSubmit = {this.handleSubmit}>
                        <input value = {this.props.state.message}  onChange = {(e) => this.props.setState({message: e.target.value})} placeholder = "Type a message" type = "text">
                        </input>
                            <button  type = "submit"></button>
                    </form> 
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>

                </div> */}
            </div>
    )
}

export default Loaded
