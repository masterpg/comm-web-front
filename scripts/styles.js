const argv = require('optimist').argv
const watch = require('node-watch')
const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const PromisePool = require('es6-promise-pool')
const fileUtils = require('./utils/file')

const DIR_CLASSES = './src/styles/classes'
const DIR_VARIABLES = './src/styles/variables'
const DIR_PLACEHOLDER = './src/styles/placeholder'

async function start() {
  await buildClasses()
  await parseVariables()
  await copyPlaceholder()

  const isWatch = argv.w || argv.watch
  if (!isWatch) {
    return
  }

  console.log('watch CSS files...')

  watch(DIR_CLASSES, {recursive: true, filter: /\.css$/}, async (evt, filePath) => {
    await buildClassesByCSSFilePath(filePath)
  })
  watch(DIR_VARIABLES, {recursive: true, filter: /\.css$/}, async (evt, filePath) => {
    await parseCSS(filePath)
  })
  watch(DIR_PLACEHOLDER, {recursive: true, filter: /\.css$/}, async (evt, filePath) => {
    const outFilePath = changeRootDir(filePath, 'lib')
    await copyFile(filePath, outFilePath)
    await buildClasses()
  })
}

/**
 * DIR_CLASSES配下の.cssファイルをpostcssでパースしてlibへ出力します。
 * @returns {Promise<void>}
 */
async function buildClasses() {
  const filePathList = fileUtils.getFileList(DIR_CLASSES, /\.css$/)

  await new PromisePool(function*() {
    for (const filePath of filePathList) {
      yield buildClassesByCSSFilePath(filePath)
    }
  }, 10).start()
}

/**
 * 指定された.cssファイルをpostcssでパースしてlibへ出力します。
 * プログラムでcssクラスを使用するのに必要となる.jsファイルもsrcとlibへ出力します。
 * @param cssFilePath
 * @returns {Promise<void>}
 */
async function buildClassesByCSSFilePath(cssFilePath) {
  await parseCSS(cssFilePath)
  await createCSSJS(cssFilePath)
}

/**
 * DIR_VARIABLES配下の.cssファイルをpostcssでパースしてlibへ出力します。
 * @returns {Promise<void>}
 */
async function parseVariables() {
  const filePathList = fileUtils.getFileList(DIR_VARIABLES, /\.css$/)

  await new PromisePool(function*() {
    for (const filePath of filePathList) {
      yield parseCSS(filePath)
    }
  }, 10).start()
}

/**
 * DIR_PLACEHOLDER配下のcssファイルをlibへコピーします。
 * @returns {Promise<void>}
 */
async function copyPlaceholder() {
  const filePathList = fileUtils.getFileList(DIR_PLACEHOLDER, /\.css$/)
  await new PromisePool(function*() {
    for (const filePath of filePathList) {
      const outFilePath = changeRootDir(filePath, 'lib')
      yield copyFile(filePath, outFilePath)
      console.log(`Copied placeholder to "${outFilePath}"`)
    }
  }, 10).start()
}

/**
 * 指定されたファイルをpostcssでパースしてlibへ出力します。
 * @param cssFilePath
 * @returns {Promise<any>}
 */
function parseCSS(cssFilePath) {
  return new Promise(resolve => {
    const outFilePath = changeRootDir(cssFilePath, 'lib')
    shell.exec(`./node_modules/.bin/postcss --config postcss.config.js ${cssFilePath} -o ${outFilePath}`, {async: true}, code => {
      if (code === 0) {
        console.log(`Postcss parsed to "${outFilePath}"`)
      } else {
        console.error(`Postcss parse failed "${cssFilePath}"`)
      }
      resolve()
    })
  })
}

/**
 * 指定された.cssファイルをもとに、プログラムでcssクラスを使用するのに必要となる
 * .jsファイルをsrcとlibへ出力します。
 * @param cssFilePath
 * @returns {Promise<any>}
 */
function createCSSJS(cssFilePath) {
  return new Promise(async resolve => {
    const libFilePath = changeRootDir(cssFilePath, 'lib')
    // .jsへ出力する内容を作成
    const cssContent = await fs.readFile(libFilePath, {encoding: 'utf-8'})
    const jsContent = `
      import {css} from 'lit-element';

      const literal = css\`
        ${cssContent}
      \`

      export default literal
    `

    // srcへ.jsファイルを出力
    const jsSrcFilePath = changeExtension(cssFilePath, 'js')
    try {
      await fs.mkdirp(path.dirname(jsSrcFilePath))
      await fs.writeFile(jsSrcFilePath, jsContent, {encoding: 'utf-8'})
      await lintCSS(jsSrcFilePath)
      console.log(`CSSJS created to "${jsSrcFilePath}"`)
    } catch (err) {
      console.log(`CSSJS create failed "${jsSrcFilePath}":\n${err}`)
      resolve()
      return
    }

    // srcに作成された.jsファイルをlibへコピー
    const jsLibFilePath = changeExtension(changeRootDir(cssFilePath, 'lib'), 'js')
    try {
      await copyFile(jsSrcFilePath, jsLibFilePath)
      console.log(`CSSJS created to "${jsLibFilePath}"`)
    } catch (err) {
      console.log(`CSSJS create failed "${jsLibFilePath}":\n${err}`)
      resolve()
      return
    }

    resolve()
  })
}

/**
 * ファイルのコピーを行います。
 * @param filePath
 * @param outFilePath
 * @returns Promise<void>
 */
function copyFile(filePath, outFilePath) {
  fs.mkdirpSync(path.dirname(outFilePath))
  return fs.copyFile(filePath, outFilePath)
}

/**
 * 指定されたファイルをeslintでフォーマットします。
 * @param filePath
 * @returns {Promise<boolean>}
 */
function lintCSS(filePath) {
  return new Promise(resolve => {
    shell.exec(`npm run lint ${filePath}`, {async: true, silent: true}, code => {
      if (code !== 0) {
        console.warn(`lint failed "${filePath}"`)
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * pathのルートパスをrootDireへ置き換えます。
 * 例1: path: "src/styles/classes/comm.css", rootDir: "lib"
 *      "src/styles/classes/comm.css" → "lib/styles/classes/comm.css"
 * 例2: path: "./src/styles/classes/comm.css", rootDir: "lib"
 *      "./src/styles/classes/comm.css" → "lib/styles/classes/comm.css"
 * @param path
 * @param rootDir
 * @returns {string}
 */
function changeRootDir(path, rootDir) {
  return path.replace(/^(?:\.\/)?[^/]+/, rootDir)
}

/**
 * pathFileの拡張子をextensionで指定されたものに置き換えます。
 * 例1: path: "src/styles/classes/comm.css", extension: "js"
 *      "src/styles/classes/comm.css" → "lib/styles/classes/comm.js"
 * @param filePath
 * @param extension
 * @returns {string}
 */
function changeExtension(filePath, extension) {
  return filePath.replace(/\.[^/]+$/, `.${extension}`)
}

start()
