import { SEND_MESSAGE } from "../utils/Events";

export default function(state = {}, action) {
    
    switch(action.type) {
        case SEND_MESSAGE: 
            state[action.msg.data.handle] = action.msg.data.messages
        default: 
            return state
    }
}