const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
const modifyVars = require('./theme.js')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  // addDecoratorsLegacy()这个方法加上 @babel/plugin-proposal-decorators 就可以支持装饰器写法 本项目用的ts装饰器
 );