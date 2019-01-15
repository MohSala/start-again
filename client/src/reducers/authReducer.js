import { SET_CURRENT_USER} from '../actions/types'
import isEmpty from '../validations/is-empty'
const initialStste = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialStste, action) {
switch(action.type) {
    case SET_CURRENT_USER: 
    return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
    }
    default:
    return state
}
}