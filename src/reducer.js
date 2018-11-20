import {user} from './redux/user.redux.js'
import {chatuser} from './redux/chatuser.redux'
import {combineReducers} from 'redux'

export default combineReducers({user, chatuser})