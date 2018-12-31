const del = require('del')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const minimist = require('minimist')
const argv = minimist(process.argv.slice(5))

// 变量
const SRC = argv.src
const DEST = argv.dest
const wxssFiles = SRC + '/**/*.wxss'
const jsFiles = SRC + '/**/*.js'
const wxmlFiles = SRC + '/**/*.wxml'
const images = SRC + '/**/*.{png,jpg,jpeg,gif,ico,svg}'
const otherFiles = [
  SRC + '/**/*',
  '!' + SRC + '/**/*.{wxss,js,wxml,png,jpg,jpeg,gif,ico,svg}'
]

// 清除输出目录
gulp.task('clean', function(cb) {
  return del(DEST, { force: true }).then(() => {
    cb()
  })
})

// 处理wxss
gulp.task('wxss', function() {
  return (
    gulp
      .src(wxssFiles)
      // 输出信息
      .pipe($.debug({ title: '[wxss 文件]' }))
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.cached('wxss')))
      // 重命名
      .pipe(
        $.rename({
          extname: '.ttss'
        })
      )
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.remember('wxss')))
      // 压缩
      .pipe($.if(argv.minify || argv['minify-wxss'], $.cleanCss()))
      .pipe(gulp.dest(DEST))
  )
})

// 处理js
gulp.task('js', function() {
  return (
    gulp
      .src(jsFiles)
      // 输出信息
      .pipe($.debug({ title: '[js 文件]' }))
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.cached('js')))
      // wx. -> tt.
      .pipe($.replace('wx.', 'tt.'))
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.remember('js')))
      // babel 转化
      .pipe(
        $.if(
          argv.minify || argv['minify-js'],
          $.babel({
            presets: ['@babel/env']
          })
        )
      )
      .pipe($.if(argv.minify || argv['minify-js'], $.uglify())) // 压缩
      .pipe(gulp.dest(DEST))
  )
})

// 处理wxml文件
gulp.task('wxml', function() {
  return (
    gulp
      .src(wxmlFiles)
      // 输出信息
      .pipe($.debug({ title: '[wxml 文件]' }))
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.cached('wxml')))
      // wx. -> tt.
      .pipe($.replace('wx:', 'tt:'))
      // 缓存(watch模式下)
      .pipe($.if(argv.watch, $.remember('wxml')))
      // 重命名
      .pipe(
        $.rename({
          extname: '.ttml'
        })
      )
      // 压缩
      .pipe(
        $.if(
          argv.minify || argv['minify-wxml'],
          $.htmlmin({ collapseWhitespace: true })
        )
      )
      .pipe(gulp.dest(DEST))
  )
})

// 处理图片
gulp.task('images', function() {
  return (
    gulp
      .src(images)
      .pipe($.debug({ title: '[image 文件]' }))
      .pipe($.if(argv.watch, $.cached('images')))
      // 压缩图片
      .pipe(
        $.imagemin(),
        {
          verbose: true
        }
      )
      .pipe(gulp.dest(DEST))
  )
})

// 其他文件
gulp.task('others', function() {
  return gulp
    .src(otherFiles)
    .pipe($.debug({ title: '[other files]' }))
    .pipe($.if(argv.watch, $.cached('others')))
    .pipe(gulp.dest(DEST))
})

if (argv.watch) {
  // 监控模式
  gulp.task('watch', function() {
    gulp.watch(wxssFiles, gulp.series('wxss'))
    gulp.watch(jsFiles, gulp.series('js'))
    gulp.watch(wxmlFiles, gulp.series('wxml'))
    gulp.watch(images, gulp.series('images'))
    gulp.watch(otherFiles, gulp.series('others'))
  })

  gulp.task(
    'default',
    gulp.series(
      'clean',
      gulp.parallel('wxss', 'js', 'images', 'wxml', 'others'),
      'watch'
    )
  )
} else {
  gulp.task(
    'default',
    gulp.series(
      'clean',
      gulp.parallel('wxss', 'js', 'images', 'wxml', 'others')
    )
  )
}
