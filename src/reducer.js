import {user} from './redux/user.redux.js'
import {chatuser} from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'
import {combineReducers} from 'redux'

export default combineReducers({user, chatuser, chat})