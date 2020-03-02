// import Dashboard from './Dashboard'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import Login from './Login'
import myLoadable from '../utils/loadable'

const Dashboard = myLoadable(() => import('./Dashboard'))
const ArticleList = myLoadable(() => import('./Article'))
const ArticleEdit = myLoadable(() => import('./Article/Edit'))
const NotFound = myLoadable(() => import('./NotFound'))
const Settings = myLoadable(() => import('./Settings'))
const Login = myLoadable(() => import('./Login'))
const Notifications = myLoadable(() => import('./Notifications'))
const NoAuth = myLoadable(() => import('./NoAuth'))

export {
  Dashboard,
  ArticleList,
  ArticleEdit,
  NotFound,
  Settings,
  Login,
  Notifications,
  NoAuth
}