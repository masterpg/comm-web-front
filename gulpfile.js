const gulp = require('gulp');
const path = require('path');
const del = require('del');
const sequence = require('run-sequence');
const merge = require('merge-stream');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const shell = require('gulp-shell');
const exec = require('exec-chainable');

//----------------------------------------------------------------------
//
//  Tasks
//
//----------------------------------------------------------------------

//--------------------------------------------------
//  ライブラリのビルドタスク
//--------------------------------------------------

/**
 * ライブラリのビルドを行います。
 */
gulp.task('build', (done) => {
  return sequence('clean:ts', 'compile', 'build:resources', 'clean:ts', done);
});

/**
 * TypeScriptのコンパイルを行います。
 */
gulp.task(
  'compile',
  shell.task([
    'node_modules/.bin/tslint -p tslint.json',
    'node_modules/.bin/tsc --project tsconfig.json --declaration',
  ]),
);

/**
 * libディレクトリへ必要なリソースを配置します。
 */
gulp.task('build:resources', () => {
  return gulp
    .src(['src/**/*.js', 'src/**/*.d.ts', '!src/types/**/*'], { base: 'src' })
    .pipe(gulp.dest('lib'));
});

//--------------------------------------------------
//  共通/その他
//--------------------------------------------------

/**
 * TypeScriptのコンパイルで出力されたファイルをクリーンします。
 */
gulp.task('clean:ts', () => {
  return del.sync([
    'src/**/{*.js,*.js.map,*.d.ts}',
    'test/**/{*.js,*.js.map,*.d.ts}',
    '!src/types/**/*',
  ]);
});
