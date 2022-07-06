const componentMap = require('./component-map.json')
let TARO_ENV = process.env.TARO_ENV
if (TARO_ENV === 'mw') TARO_ENV = 'h5'

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
