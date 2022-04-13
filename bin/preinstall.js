const { resolve } = require('path')
const { execSync } = require('child_process')

const exDeps = ['classname', 'prop-types']
// 安装确实依赖
function preinstall() {
  const notInstalledDeps = []
  const cwd = process.cwd()
  const pkgPath = resolve(cwd, 'package.json')
  try {
    const pkg = require(pkgPath)
    if (pkg.name === '@fta/components') return
    pkg.dependencies &&
      exDeps.forEach((dep) => {
        if (!pkg.dependencies[dep]) {
          notInstalledDeps.push(dep)
        }
      })
    notInstalledDeps.length && execSync(`yarn add ${notInstalledDeps.join(' ')}`)
  } catch (error) {
    console.log('@fta/components preinstall error', error)
  }
}

preinstall()
