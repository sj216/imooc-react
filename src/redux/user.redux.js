import axios from 'axios';
import {getRedirectPath} from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  isAuth: false, // 是否注册成功
  msg: '', // 返回的msg
  user: '', // 用户名
  type: '', // 用户类型
  redirectTo: '', // 登陆成功之后用户需要跳转的页面
};

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
    case LOGIN_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
    case LOAD_DATA:
      return {...state, msg: '', ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data}
}

function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then((res) => {
      // 如果请求成功
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then((res) => {
      // 如果请求成功
      if (res.status === 200 && res.data.code === 0) {
        // dispatch(registerSuccess({user, pwd}))
        dispatch(loginSuccess(res.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo};
}
