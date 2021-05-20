import React, { useState } from 'react'
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from './Message';
function Loaded(props) {
    const [input, setInput] = useState(""); 
    return (
           <>
               <div className = "chat__body">
                {
                props.messages.map(e => {
                    console.log(e);
                    return(  <Message name = {e} 
                                      message = {e} 
                                      handle = {props.handle}/>)
                            })}
                </div>

                <div className = "chat__footer">
                    <IconButton>
                        <MoodIcon/>
                    </IconButton>
                    {/* onSubmit = {handleSubmit} */}
                    <form onSubmit = {props.sendMessage}>
                        <input value = {input}  onChange = {(e) => setInput(e.target.value)} placeholder = "Type a message" name = "msginp" type = "text">
                        </input>
                            <button  type = "submit"></button>
                    </form> 
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>

                </div>
            </>
    )
}

export default Loaded
