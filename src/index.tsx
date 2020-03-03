import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes/index'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import store from './store'
import { Provider } from 'react-redux'
import { Map } from 'immutable'

const state = { name: {0: 'asd'}, age: {0: 'kglhkdlf'} }
const imState = Map(state)
let newState = imState.set('age', { 0: '666' })
console.log(imState.get('name') === newState.get('name')) // true  name对象没有改变 所以引用的原来的的值
console.log(imState.get('age') === newState.get('age')) // false age改变了 newState中的age内存地址已经改变

ReactDOM.render(
  
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          {/* <Route path="/admin" render={(routerProps) => { // 要做权限验证，所以要使用render
            return <App {...routerProps}/> 
          }}/> */}
          <Route path="/admin" component={App}/>
          {
            mainRouter.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component}/>
            })
          }
          <Redirect to="/admin" from="/" exact/>
          <Redirect to="/404"exact/>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
