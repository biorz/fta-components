const process = require('child_process')
const version = require('../package.json').version

/**
 * 发布后广播
 * @param {string} version 版本号
 * @param {string} changelog 版本变更内容
 * @param {string} isAtAll 是否@全体成员
 */
function broadcast(version, changelog, isAtAll = false) {
  try {
    process.execSync(`curl 'https://oapi.dingtalk.com/robot/send?access_token=f06d058044555551c9756e7896cacf3bdb6ac3b7e1434efe0274e045e99a6a15' \
    -H 'Content-Type: application/json' \
    -d '{"msgtype": "text","text": {"content":"FTA View组件库新版本：@fta/components@${version} 已发布\nChangelog: ${changelog}"},"at": {"isAtAll": ${isAtAll}}}'`)
  } catch (e) {
    console.log('广播失败')
  }
}

broadcast(version)
