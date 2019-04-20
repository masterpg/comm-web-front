const path = require('path')
const fs = require('fs')

/**
 * ファイルタイプの列挙体
 */
const FileType = {
  File: 'file',
  Directory: 'directory',
  Unknown: 'unknown',
}
module.exports.FileType = FileType

/**
 * ファイルの種類を取得する
 * @param {string} path パス
 * @return {FileType} ファイルの種類
 */
function getFileType(path) {
  try {
    const stat = fs.statSync(path)

    switch (true) {
      case stat.isFile():
        return FileType.File

      case stat.isDirectory():
        return FileType.Directory

      default:
        return FileType.Unknown
    }
  } catch (e) {
    return FileType.Unknown
  }
}
module.exports.getFileType = getFileType

/**
 * 指定したディレクトリ配下のすべてのファイルをリストアップする
 * @param {string} dirPath 検索するディレクトリのパス
 * @return {Array<string>} ファイルのパスのリスト
 */
function getFileList(dirPath, pathPattern) {
  const result = []
  const paths = fs.readdirSync(dirPath)

  for (const a of paths) {
    const path = `${dirPath}/${a}`

    switch (getFileType(path)) {
      case FileType.File:
        if (pathPattern && !pathPattern.test(path)) {
          break
        }
        result.push(path)
        break

      case FileType.Directory:
        result.push(...getFileList(path, pathPattern))
        break

      default:
      /* noop */
    }
  }

  return result
}
module.exports.getFileList = getFileList
