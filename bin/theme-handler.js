#!/usr/bin/env node

const cwd = process.cwd()
const { resolve, relative } = require('path')
const fs = require('fs')

function readFileAsString(path) {
  const buffer = fs.readFileSync(path)
  return buffer.toString()
}

function writeFile(path, data) {
  return fs.writeFileSync(path, data)
}

// 注入变量
function injectTheme() {
  const pkg = require(resolve(cwd, './package.json'))

  if (pkg.theme) {
    const customPath = resolve(cwd, './node_modules/@fta/components/style/variables/custom.scss')
    const themePath = resolve(cwd, pkg.theme)
    const relativePath = relative(customPath, themePath)

    writeFile(customPath, `@import '${relativePath.replace('../../', '')}';`)

    console.log('自定义变量注入成功')
  } else {
    console.log('Theme variables not found')
  }
}

// 生成主题文件拷贝到项目根目录
function ejectTheme() {
  const fileName = `./fta-default-${Date.now()}.scss`
  const defaultPath = resolve(cwd, './node_modules/@fta/components/style/variables/default.scss')
  const outputPath = resolve(cwd, fileName)
  const data = readFileAsString(defaultPath)

  const filter = data
    .replace(/@import\s+\'\.\/custom\.scss\'\s*;/, '')
    .replace(/\n\n/, '')
    .replace(/@import.*function.*\.scss\'\s*;/, '')
    .replace(/\s*!default/g, '')

  writeFile(
    outputPath,
    `/* $designWidth为设计稿尺寸，$curWidth是Taro的默认设计单位 */
  @function scale($size, $designWidth: 720, $curWidth: 750) {
    @return scale($size * $designWidth / $curWidth);
  }
  ${filter}`
  )

  console.log(`主题文件已生成：\n${fileName}`)
}

function main() {
  const arg = process.argv[2] || 'eject'
  if (arg === 'eject') {
    ejectTheme()
  } else if (arg === 'inject') {
    injectTheme()
  } else {
    console.log(`Unknown fta-theme argument: ${arg}, which should be either 'inject' or 'eject'`)
  }
}

main()
