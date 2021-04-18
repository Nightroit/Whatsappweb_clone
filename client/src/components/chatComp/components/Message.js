import React from 'react'

export default function Message({message, name}) {
    return (
        <div>
      
      <p className = {`chat__message ${(message.sender === name) && 'chat__reciever' }`}> 
                    {/* <span className = "chat__name">{message.sender}</span>  */}
                        {message.msg}
                                {/* {console.log.name()} */}
                    <span className = "chat_    _timestamp">
                        {message.timestamp}
                    </span> 
                </p>
                {/* ))}               {props.sended.map(message => ( */}
                        {/* <p className = {`chat__message ${false && 'chat__reciever' }`}> */}
                            {/* <span className = "chat__name">{message}</span> */}
                                {/* {message.msg} */}
                            {/* <span className = "chat__timestamp">
                                {message.timestamp}
                            </span> */}
                        {/* </p> */}
                {/* ))}                    */}
        </div>
    )
}
