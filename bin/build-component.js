const rollupConfig = require('@fta/rollup-config-taro3')
const path = require('path')
const fs = require('fs-extra')
const resolveComponentDependCircle = require('../../../config/resolveComponentDenpendCircle')

const taroRoot = path.resolve(__dirname, '../../../')
const pkgRoot = path.resolve(__dirname, '../')

const copyIndexJS = (dest) => {
  const entryPath = path.resolve(pkgRoot, 'types/index.d.ts')
  const data = fs.readFileSync(entryPath).toString()
  fs.writeFileSync(dest, data.replace('../common', './common'))
}
/**
 * 注入css文件
 */
const injectCss = (dir) => {
  try {
    const stylePath = path.resolve(dir, 'index.css')
    if (fs.pathExistsSync(stylePath)) {
      const filePath = path.resolve(dir, 'index.js')
      const dataString = fs.readFileSync(filePath)
      fs.writeFileSync(filePath, `import './index.css';\n${dataString}`)
    }
  } catch (error) {
    console.log('CSS文件打包失败：' + path + '\n' + error.message)
  }
}

// const copyIndexJS = (dest) => {
//   const entryPath = path.resolve(pkgRoot, 'types/index.d.ts')
//   fs.copyFileSync(entryPath, dest)
// }

const getComponents = () => {
  const components = require('../component-map.json')
  const valueSet = new Set(Object.values(components).map((v) => v.replace))

  return [...valueSet]
}

const OUTPUT = process.env.BUILD_TYPE

const main = async () => {
  const outputDir = path.resolve(__dirname, `../dist/${OUTPUT}`)
  fs.ensureDirSync(path.resolve(taroRoot, outputDir))

  const components = getComponents()
  /**
   * common包打包
   */
  components.push('common')
  if (!components) {
    throw new Error('请先生成 component.map.js')
  }

  for (let idx in components) {
    const componentPath = components[idx]
    const input = path.resolve(pkgRoot, componentPath)
    const componentFilename = componentPath.replace('components', '')
    const output = path.join(outputDir, componentFilename)

    // console.log('componentfilename', componentFilename);
    console.log(`
  => build: ${input}
  => output: ${output}`)

    await rollupConfig.build({
      input: input,
      output: output,
      taroRoot,
      taroEnv: process.env.BUILD_TYPE,
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      externalResolve: resolveComponentDependCircle,
      external: [
        'react',
        'react-dom',
        '@tarojs/components',
        '@tarojs/runtime',
        '@tarojs/taro',
        '@tarojs/react',
        'classnames',
        'prop-types',
        'classnames',
        '@fta/components',
      ],
    })

    if (componentFilename === 'common') continue
    // NOTE: 不用拷贝dts
    // const tsPath = path.resolve(pkgRoot, `types/${componentFilename}.d.ts`)
    // const tsOutput = path.resolve(pkgRoot, `${OUTPUT}/${componentFilename}/index.d.ts`)
    // fs.copySync(tsPath, tsOutput)
    // copy typescript 到当前目录
    injectCss(output)
    copyIndexJS(path.resolve(pkgRoot, `dist/${OUTPUT}/index.js`))
  }

  // copyIndexJS(path.resolve(pkgRoot, `${OUTPUT}/index.js`))

  //   execSync(`taro build native-components --type arn --input ${input} --output ${output}`, execOpts)
  //   console.log(`
  // => build rn components success`)
}

main()
