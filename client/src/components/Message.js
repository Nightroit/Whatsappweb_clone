import React from 'react'

export default function Message(props) {
    return (
        <div>
             {props.message.map(message => (
                        <p className = {`chat__message ${false && 'chat__reciever' }`}>
                            {/* <span className = "chat__name">{message}</span> */}
                                {message.msg}
                            {/* <span className = "chat__timestamp">
                                {message.timestamp}
                            </span> */}
                        </p>
                ))}               {props.sended.map(message => (
                        <p className = {`chat__message ${false && 'chat__reciever' }`}>
                            {/* <span className = "chat__name">{message}</span> */}
                                {message.msg}
                            {/* <span className = "chat__timestamp">
                                {message.timestamp}
                            </span> */}
                        </p>
                ))}                   
        </div>
    )
}
