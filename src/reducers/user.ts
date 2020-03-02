import actionTypes from '../actions/actionTypes'
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState = {
  ...userInfo,
  isLogin,
  isLoading: false
}

export interface userState {
  id: string
  name: string
  avatar: string
  role: string
  isLogin: boolean
  isLoading: boolean
}

export default (state: userState = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...initState,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      console.log(action.payload.userInfo)
      return {
        ...action.payload.userInfo,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id: '',
        avatar: '',
        role: '',
        name: '',
        token: '',
        isLogin: false,
        isLoading: false
      }
    default:
      return state
  }
}