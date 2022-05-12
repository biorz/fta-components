const fs = require('fs')
const { resolve } = require('path')
const oldPath = resolve('./style/variables/custom.scss')
const tempPath = resolve('./bin/.temp/custom.scss')

function recoverCustomTheme() {
  try {
    const data = fs.readFileSync(tempPath).toString()
    fs.writeFileSync(oldPath, data)
  } catch (error) {}
}

function clearCustomTheme() {
  try {
    const data = fs.readFileSync(oldPath).toString()
    fs.writeFileSync(oldPath, '')
    fs.writeFileSync(tempPath, data)
  } catch (error) {}
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
