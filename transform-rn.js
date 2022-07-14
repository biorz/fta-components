const componentMap = require('./component-map.json')
/**
 * @deprecated
 * 请替换成babel-import.js
 */
function transform(member) {
  const data = componentMap[member]
  return data
    ? {
        default: data.default,
        replace: `@fta/components/dist/rn/${data.replace.replace('components/', '')}`,
      }
    : { replace: '@fta/components/dist/rn/common' }
}

module.exports = transform
module.exports.default = transform
