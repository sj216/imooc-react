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

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

function Boss() {
  return <h2>BOSS页面</h2>
}

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/*AuthRoute 用于检测路由*/}
        <AuthRoute/>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}/>
          {/*<Route path="/geniusinfo" component={GeniusInfo}/>*/}
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
