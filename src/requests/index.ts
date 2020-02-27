import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/243679' : ''
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, { // 在不影响原config.data情况下添加data
    authToken: 'asdasdasd'
  })
  return config
})

service.interceptors.response.use((rep: any) => {
  if (rep.status === 200) {
    return rep
  } else {
    //全局处理错误
  }
})

export const getArticleList = () => { // 获取文章列表
  return service.post('/example/1580812271298')
}

export const deleteArticle = (id: number) => { // 删除文章
  return service.post('/example/deleteArticle', {
    id
  })
}

export const getArticle = (id: string) => { // 获取单个文章
  return service.post('/example/article', { id })
}


interface editParams {
  title: string,
  author: string,
  createTime: string,
  content: string,
  amount: number
}
export const editArticle = (id: string, params: editParams) => {
  return service.post('/example/editArticle/' + id, { ...params })
}

export const pullArticleAmount = () => {
  return service.post('/example/articleAmount')
}

export const pullNotificationList = () => {
  return service.post('/example/notifications')
}