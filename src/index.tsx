import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes/index'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={(routerProps) => { // 要做权限验证，所以要使用render
          return <App {...routerProps}/> 
        }}/>
        {
          mainRouter.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
          })
        }
        <Redirect to="/admin" from="/" exact/>
        <Redirect to="/404"exact/>
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
