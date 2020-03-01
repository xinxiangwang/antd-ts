import { combineReducers } from 'redux'
import notifications, { notificationsState } from './notifications'
import user, { userState } from './user'

export default combineReducers({
  notifications,
  user
})