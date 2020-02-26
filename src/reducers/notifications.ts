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
    default:
      return state
  }
}