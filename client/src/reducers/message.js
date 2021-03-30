import { SEND_MESSAGE } from "../utils/Events";

export default function(state = [], action) {
    switch(action.type) {
        case SEND_MESSAGE:
            return [...state, action.payload]
        default: 
            return state
    }
}