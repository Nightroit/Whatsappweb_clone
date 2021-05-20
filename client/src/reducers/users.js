import { LOAD_USERS } from "../utils/Events";

export default function(state = [], action) {
    switch(action.type) {
        case LOAD_USERS: {
            return [...state, action.payload]
        }
        default: 
            return state
    }
}