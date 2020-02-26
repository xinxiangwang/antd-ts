import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { adminRouter } from './routes/index'
import Frame from './components/Frame'

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
class App extends React.Component {
  render () {
    return (
      <Frame>
        <div className="App">
          <Switch>
            {
              adminRouter.map(route => {
                const Com = (route.component as React.ComponentClass) // 这次是不知道啥bug 断言一下就不报错了
                return(
                  <Route
                    path={route.pathname}
                    key={route.pathname}
                    exact={(route as any).exact} //exact是可有可无的， 这里使用类型断言防止报错
                    render={(routerProps) => {
                    return <Com {...routerProps}/>
                }}/>)
              })
            }
          </Switch>
        </div>
      </Frame>
    )
  }
}

export default App;
