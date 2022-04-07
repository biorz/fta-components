const fs = require('fs')
const { resolve } = require('path')
const oldPath = resolve('./style/variables/custom.scss')
const tempPath = resolve('./bin/.temp/custom.scss')

function recoverCustomTheme() {
  const data = fs.readFileSync(tempPath).toString()
  fs.writeFileSync(oldPath, data)
}

function clearCustomTheme() {
  const data = fs.readFileSync(oldPath).toString()
  fs.writeFileSync(oldPath, '')
  fs.writeFileSync(tempPath, data)
}

function main() {
  const arg = process.argv[2] || 'clear'
  if (arg === 'clear') {
    clearCustomTheme()
  } else if (arg === 'recover') {
    recoverCustomTheme()
  }
}

main()
