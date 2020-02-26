import React, { Component } from "react"
interface config {
  loader: any,
  loading: any
}
export default ({loader, loading: Loading}: config) => {
  return class MyLoadable extends Component {
    state = {
      loadedComponent: null
    }
    async componentDidMount () {
      let res = await loader()
      this.setState({
        loadedComponent: res.default
      })
    }
    render () {
      return (
        this.state.loadedComponent || <Loading/>
      )
    }
  }
}