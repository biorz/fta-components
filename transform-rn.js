const componentMap = require('./component-map.json')

function transform(member) {
  const data = componentMap[member]
  return data
    ? { default: data.default, replace: `@fta/components/rn/${data.replace}` }
    : { replace: '@fta/components/rn/common' }
}

module.exports = transform
module.exports.default = transform
