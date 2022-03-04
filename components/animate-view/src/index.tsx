// 在metro中，haste resolve 发生在 自定义resolver之前
// if (process.env.TARO_ENV == 'rn') {
//   module.exports = require('./animate-view.rn')
// } else {
//   module.exports = require('./animate-view')
// }

export { default } from './animate-view'
