import { SET_CURRENT_ALBUMS } from '../actions/index'
const initialState = {
    albumId: 'ROOT',
    albumName: 'ROOT'
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CURRENT_ALBUMS:
            return action.payload
        default:
            return state
    }

}

export default reducer