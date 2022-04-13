#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()
const { resolve, relative } = require('path')
const { execSync } = require('child_process')

const taroRoot = path.resolve(__dirname, '../../../')
const pkgRoot = path.resolve(__dirname, '../')

const getComponents = () => {
  const components = require('../component-map.json')

  return Object.entries(components).map(([key, item]) => {
    return item.replace
  })
}

const main = () => {
  const pathPrefix = path.relative(taroRoot, pkgRoot)
  const outputDir = path.join(pathPrefix, `rn`)
  fs.ensureDirSync(path.resolve(taroRoot, outputDir))

  const components = getComponents()
  /**
   * common包打包
   */
  components.push('common')
  if (!components) {
    throw new Error('请先生成 component.map.js')
  }

  const execOpts = {
    cwd: taroRoot,
  }

  components.forEach((component) => {
    const input = path.resolve(pkgRoot, component)
    const output = path.join(outputDir, `${component.replace('components', '')}`)
    console.log(`build: ${input}, output: ${output}`)

    execSync(
      `taro build native-components --type arn --input ${input} --output ${output}`,
      execOpts
    )
  })

  execSync(`taro build native-components --type arn --input ${input} --output ${output}`, execOpts)
}

main()
