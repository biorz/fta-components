const componentMap = require('./component-map.json')
const TARO_ENV = process.env.TARO_ENV

function transform(member) {
  const data = componentMap[member]
  return data
    ? {
        default: data.default,
        replace: `@fta/components/dist/${TARO_ENV}/${data.replace.replace('components/', '')}`,
      }
    : { replace: `@fta/components/dist/${TARO_ENV}/common` }
}

module.exports = transform
module.exports.default = transform
