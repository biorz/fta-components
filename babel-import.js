const componentMap = require('./component-map.json')
const TARO_ENV = process.env.TARO_ENV

function transform(member) {
  const data = componentMap[member]
  return data
    ? {
        default: data.default,
        replace: `@fta/components/${TARO_ENV}/${data.replace.replace('components/', '')}`,
      }
    : { replace: `@fta/components/${TARO_ENV}/common` }
}

module.exports = transform
module.exports.default = transform
