import actionTypes from '../actions/actionTypes'
const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: 'sadasdasdasdasdasdasdasd',
      desc: 'zxczxcvxcvadqwewqeqwe',
      isRead: false
    },
    {
      id: 2,
      title: 'sadasdasdasdasdasdasdasd',
      desc: 'zxczxcvxcvadqwewqeqwe',
      isRead: false
    }
  ]
}
export interface Message {
  id: number,
  title: string,
  desc?: string,
  isRead: boolean
}
export default (state = initState, action) => {
  switch(action.type) {

    case actionTypes.NOTIFICATION_READED:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.isRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionTypes.ALL_READED:
      return {
        ...state,
        list: state.list.map(item => {
          item.isRead = true
          return item
        })
      }
    case actionTypes.START_READ:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.END_READ:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.PULL_NOTIFICATION_LIST:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}