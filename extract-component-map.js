const fs = require('fs')
const { resolve } = require('path')

const FILE_ENTRY = './index.ts'
const FILE_OUTPUT = './component-map.json'

const defaultAsReg = /default\s+as\s+([a-zA-Z]+)/g
const replaceDefaultReg = /\s*default\s+as\s+([a-zA-Z]+)\s*,?/g
const extractReg = /export\s+{(.*)}\s+from.*\.\/components\/(.*)['"]/gm

function readFileAsString(entry) {
  const filePath = require.resolve(entry)
  const buffer = fs.readFileSync(filePath)
  return buffer.toString()
}

function writeFile(output, jsonObject) {
  const filePath = resolve(output)
  fs.writeFileSync(filePath, JSON.stringify(jsonObject))
}

/**
 * 提取组件-目录映射表
 */
function extractComponentMap() {
  const componentMap = {}
  let data = readFileAsString(FILE_ENTRY)
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/export/g, '\n' + 'export')
  // data = data.replace(defaultAsReg, '')
  let temp
  while ((temp = extractReg.exec(data))) {
    let [str, elm, dir] = temp
    var r

    while ((r = defaultAsReg.exec(elm))) {
      const el = r[1]
      componentMap[el] = {
        replace: `components/${dir}`,
        default: true,
      }
    }
    elm = elm.replace(replaceDefaultReg, '')
    //  console.log(elm, dir);
    const list = elm
      .replace(/\s+/g, '')
      .split(',')
      .filter((v) => v.length)
    list.forEach((el) => (componentMap[el] = { replace: `components/${dir}`, default: false }))
  }
  writeFile(FILE_OUTPUT, componentMap)
}

extractComponentMap()
