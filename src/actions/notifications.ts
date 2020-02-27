import actionTypes from './actionTypes'
import { pullNotificationList } from '../requests'

const startRead = () => {
  return {
    type: actionTypes.START_READ
  }
}
const endRead = () => {
  return {
    type: actionTypes.END_READ
  }
}

export const NotificationReaded = (id) => {
  return dispatch => {
    dispatch(startRead())
    setTimeout(() => {
      dispatch({ 
        type: actionTypes.NOTIFICATION_READED,
        payload: {
          id
        }
      })
      dispatch(endRead())
    }, 1000)
  }
}

export const AllReaded = () => {
  return dispatch => {
    dispatch(startRead())
    setTimeout(() => {
      dispatch({ 
        type: actionTypes.ALL_READED
      })
      dispatch(endRead())
    }, 2000)
  }
}

export const setNotificationList = () => {
  return async dispatch => {
    dispatch(startRead())
    let ret = await pullNotificationList()
    console.log(ret)
    dispatch({
      type: actionTypes.PULL_NOTIFICATION_LIST,
      payload: {
        list: ret.data.data.list
      }
    })
    dispatch(endRead())
  }
} 