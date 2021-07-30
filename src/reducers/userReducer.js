import { SET_USER } from '../actions/index'
const inittialState = null
const reducer = (state = inittialState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload
        default:
            return state
    }
}

export default reducer