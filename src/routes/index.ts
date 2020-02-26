import {
  Dashboard,
  ArticleList,
  ArticleEdit,
  NotFound,
  Settings,
  Login,
  Notifications
} from '../views'

interface RouteObj {
  pathname: string,
  component: any,
  exact?: boolean
}


export const mainRouter: Array<RouteObj> = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]

export const adminRouter = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    label: '仪表盘',
    isNav: true
  },
  
  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    label: '文章',
    isNav: true
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    isNav: false
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    label: '设置',
    isNav: true
  },
  {
    pathname: '/admin/notifications',
    component: Notifications,
    label: '通知中心',
    isNav: true
  },
]