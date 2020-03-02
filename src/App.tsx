import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes/index'
import Frame from './components/Frame'
import { connect } from './common'

const mapState = (state) => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})
interface Iprops {
  isLogin?: boolean,
  role?: string
}
// const testHOC = (WrappedComponent: any) => {
//   return class HOC extends React.Component {
//     render () {
//       return (
//         <>
//           <WrappedComponent></WrappedComponent>
//           <div>高阶组件</div>
//         </>
//       )
//     }
//   }
// }

// @testHOC
@connect(mapState)
class App extends React.Component<Iprops> {
  render () {
    return (
      this.props.isLogin ? <Frame>
        <div className="App">
          <Switch>
            {
              adminRouter.map(route => {
                const Com = (route.component as React.ComponentClass) // 这次是不知道啥bug 断言一下就不报错了
                const aaa = route.roles.includes(this.props.role)
                return(
                  <Route
                    path={route.pathname}
                    key={route.pathname}
                    exact={(route as any).exact} //exact是可有可无的， 这里使用类型断言防止报错
                    render={(routerProps) => {
                    return aaa ? <Com {...routerProps}/> : <Redirect to="/admin/noAuth"/>
                }}/>)
              })
            }
          </Switch>
        </div>
      </Frame> : <Redirect to="/login"/>
    )
  }
}

export default App;
