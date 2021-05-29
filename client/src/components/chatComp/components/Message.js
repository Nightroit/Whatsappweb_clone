import React from 'react'

export default function Message({message, handle}) {
    return (
        <div>
                <p className = {`chat__message ${(message.sender === handle) && "chat__reciever" }`}> 
                                {/* <span className = "chat__name">{message.sender}</span>  */}
                                    {message.message}
                                            {/* {console.log.name()} */}
                                <span className = "chat__timestamp">
                                    {message.timestamp}
                                </span> 
                </p>
                
        </div>
    )
}
