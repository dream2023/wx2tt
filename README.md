# wx2tt

微信小程序转头条小程序工具

## 安装

```
npm i wx2tt -g
```

## 使用方法
```
wx2tt <path/to/wxapp> <path/to/ttapp> [--watch] [--minify] [--minify-wxss] [--minify-js] [--minify-wxml]
```

## 参数说明
- path/to/wxapp 表示微信小程序目录
- path/to/ttapp 表示头条小程序目录
- --watch 表示监听模式运行
- --minify 压缩所有能压缩的文件
- --minify-wxss 仅压缩wxss文件
- --minify-js 仅压缩js文件
- --minify-wxml 仅压缩wxml文件


## 说明

wx2tt 的功能很简单，他主要做了如下事情：

- 将 wxml 后缀名改为 ttml
- 将 wxss 后缀名改为 ttss
- 将 wxml 中 wx: 改为 tt:
- 将 js 中 wx. 改为 tt.

## 使用技巧

- 使用小程序框架开发者, 可以将编译后的再通过 wx2tt 进行转换
- 如果原生开发者，将 wx2tt 克隆下来 ，可以很方便扩展 wx2tt，比如增加 sass 或者 less 功能
- 无论是原生开发或者框架开发投不推荐压缩 js，这将使你线上的代码很难度

## 注意事项

**之所以会有这个工具，是因为头条小程序和小程序的 api 十分的相似，但是相似不代表相同，所以并非转换完成后就可以使用，一些头条中不存在的 api 仍然会报错，wx2tt 并未做相关处理！**
