import React from 'react'
import Loadable from 'react-loadable'
// import Loadable from './myLoadable' // 自己实现简易版react-loadable

const loadingComponent: React.FC = () => {
  return (
    <div>loading</div>
  )
}

export default (loader: any, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  })
}