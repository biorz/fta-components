#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const taroRoot = path.resolve(__dirname, '../../../')
const pkgRoot = path.resolve(__dirname, '../')

const getComponents = () => {
  const components = require('../component-map.json')

  return Object.entries(components).map(([key, item]) => {
    return [key, item.replace]
  })
}

const OUTPUT = 'rn'

const main = () => {
  const pathPrefix = path.relative(taroRoot, pkgRoot)
  const outputDir = path.join(pathPrefix, `rn`)
  fs.ensureDirSync(path.resolve(taroRoot, outputDir))

  const components = getComponents()
  if (!components) {
    throw new Error('请先生成 component.map.js')
  }

  const execOpts = {
    cwd: taroRoot,
  }

  components.forEach(([name, componentPath]) => {
    const input = path.resolve(pkgRoot, componentPath)
    const componentFilename = componentPath.replace('components', '')
    const output = path.join(outputDir, componentFilename)
    console.log(`
=> build: ${input}
=> output: ${output}`)

    execSync(
      `taro build native-components --type arn --input ${input} --output ${output}`,
      execOpts
    )

    const tsPath = path.resolve(pkgRoot, `types/${componentFilename}.d.ts`)
    const tsOutput = path.resolve(pkgRoot, `${OUTPUT}/${componentFilename}/index.d.ts`)
    fs.copySync(tsPath, tsOutput)
    // copy typescript 到当前目录
  })

  console.log(`
=> build rn components success`)
}

main()
