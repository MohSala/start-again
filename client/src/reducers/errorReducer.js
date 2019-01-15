import {GET_ERRORS} from '../actions/types'

const initialStste = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialStste, action) {
switch(action.type) {
   case GET_ERRORS: {
       return action.payload
   }
    default:
    return state
}
}