import React from 'react'

export default function Message(props) {
    return (
        <div>
             {props.message.map(message => (
                        <p className = {`chat__message ${message.received && 'chat__reciever' }`}>
                            <span className = "chat__name">{message.name}</span>
                                {message.msg}
                            <span className = "chat__timestamp">
                                {message.timestamp}
                            </span>
                        </p>
                ))}
        </div>
    )
}
