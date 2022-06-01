#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const taroRoot = path.resolve(__dirname, '../../../')
const pkgRoot = path.resolve(__dirname, '../')

// const copyIndexJS = (dest) => {
//   const entryPath = path.resolve(pkgRoot, 'types/index.d.ts')
//   fs.copyFileSync(entryPath, dest)
// }

const getComponents = () => {
  const components = require('../component-map.json')
  const valueSet = new Set(Object.values(components).map((v) => v.replace))

  return [...valueSet]
}

const OUTPUT = 'rn'

const main = () => {
  const pathPrefix = path.relative(taroRoot, pkgRoot)
  const outputDir = path.join(pathPrefix, `dist/rn`)
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

  components.forEach((componentPath) => {
    const input = path.resolve(pkgRoot, componentPath)
    const componentFilename = componentPath.replace('components', '')
    const output = path.join(outputDir, componentFilename)

    // console.log('componentfilename', componentFilename);
    console.log(`
=> build: ${input}
=> output: ${output}`)

    execSync(
      `taro build native-components --type arn --input ${input} --output ${output}`,
      execOpts
    )

    if (componentFilename === 'common') return
    const tsPath = path.resolve(pkgRoot, `types/${componentFilename}.d.ts`)
    const tsOutput = path.resolve(pkgRoot, `${OUTPUT}/${componentFilename}/index.d.ts`)
    fs.copySync(tsPath, tsOutput)
    // copy typescript 到当前目录
  })
  // copyIndexJS(path.resolve(pkgRoot, 'dist/rn/index.js'))

  //   execSync(`taro build native-components --type arn --input ${input} --output ${output}`, execOpts)
  //   console.log(`
  // => build rn components success`)
}

main()
