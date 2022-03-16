const componentMap = require('./component-map.json')

function transform(member) {
  const data = componentMap[member]
  return data
    ? { default: data.default, replace: `@fta/components/${data.replace}` }
    : { replace: '@fta/components/common' }
}

module.exports = transform
module.exports.default = transform
