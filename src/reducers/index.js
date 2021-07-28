import albumReducer from './albumReducer'
import userReducer from './userReducer'

import { combineReducers } from 'redux'

const reducers = combineReducers({
    user: userReducer,
    album: albumReducer
})

export default reducers