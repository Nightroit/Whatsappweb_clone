import axios from 'axios'; 

export const sendMessage = (payload) => dispatch =>{
    dispatch({type: 'SEND_MESSAGE', payload: payload})
    console.log(payload); 
}

