import actionTypes from './actionTypes'
import { userLogin } from '../requests'

const logFailed = () => {
  window.localStorage.removeItem('authToken')
  window.sessionStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED,
  }
}

export const userLogout = () => {
  return dispatch => {
    dispatch(logFailed())
  }
}


export const UserLogin = (params) => {
  
  return async dispatch => {
    dispatch({
      type: actionTypes.START_LOGIN
    })
    let ret = await userLogin(params)
    console.log(ret)
    if (ret) {
      if (ret.data.data.remember === true) {
        window.localStorage.setItem('authToken', ret.data.data.token)
        window.localStorage.setItem('userInfo', JSON.stringify(ret.data.data))
      } else {
        window.sessionStorage.setItem('authToken', ret.data.data.token)
        window.sessionStorage.setItem('userInfo', JSON.stringify(ret.data.data))
      }
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          userInfo: ret.data.data
        }
      })
    } else {
      dispatch(logFailed())
    }
    
  }
}