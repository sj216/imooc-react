import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'

// 引入组件
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// boss老板 genius牛人 me个人中心 msg聊天页面 4个页面
ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/*AuthRoute 用于检测路由*/}
        <AuthRoute/>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}/>
          <Route path="/geniusinfo" component={GeniusInfo}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/chat/:user" component={Chat}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
