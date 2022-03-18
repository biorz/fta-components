#!/usr/bin/env node

const cwd = process.cwd()
const { resolve, relative } = require('path')
const fs = require('fs')

// 注入变量
function injectTheme() {
  const pkg = require(resolve(cwd, './package.json'))

  if (pkg.theme) {
    const customPath = resolve(cwd, './node_modules/@fta/components/style/variables/custom.scss')
    console.log('cunstompath', customPath)
    const themePath = resolve(cwd, pkg.theme)
    console.log(themePath, 'themepaht')
    const relativePath = relative(customPath, themePath)
    console.log('relativepath', relativePath)
    fs.writeFileSync(customPath, `@import '${relativePath.replace('../../', '')}' ;`)
    console.log('自定义变量注入成功')
  } else {
    console.log('Theme variables not found')
  }
}

injectTheme()
