const path = require('path')
const shell = require('shelljs')
const isDirectory = require('is-directory')
const isAbsolute = require('is-absolute')
const utils = require('./utils')
const makeDir = require('make-dir')

// 检测参数
const argv = process.argv.slice(2)
if (argv.length < 2) {
  utils.error(
    '用法: wx2tt <path/to/wxapp> <path/to/ttapp> [--watch] [--minify] [--minify-wxss] [--minify-js] [--minify-wxml]'
  )
}

let src = argv[0]
let dest = argv[1]
const cwd = process.cwd()
if (!isAbsolute(src)) {
  src = path.join(cwd, src)
}

if (!isAbsolute(dest)) {
  dest = path.join(cwd, dest)
}

if (!isDirectory.sync(src)) {
  utils.error('参数错误：[' + src + '] 不是目录')
}

if (!isDirectory.sync(dest)) {
  makeDir.sync(dest)
}

// 执行命令
const otherArgs = argv.slice(2).join(' ')
const gulpfile = path.resolve(__dirname, 'gulpfile.js')
const command = `npx gulp --color --gulpfile ${gulpfile} --src=${src} --dest=${dest} ${otherArgs}`
shell.exec(command)
