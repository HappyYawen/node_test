const path = require('path')
const fs = require('fs')
const vm = require('vm')

function myRequire(filename) {
  // 1绝对路径
  const mPath = Module._resolveFilename(filename)
  // 2缓存优先
  const cacheModule = Module._cache[mPath]
  if(cacheModule) return cacheModule.exports
  console.log("没有缓存！！！！！！！")
  // 3创建空对象加载目标模块
  let module = new Module(mPath)

  // 4缓存已加载模块
  Module._cache[mPath] = module

  // 5执行加载（编译执行）
  module.load()
  
  // 6返回数据
  return module.exports
}

function Module(id) {
  this.id = id
  this.exports = {}
}
Module._cache = {}
Module._resolveFilename = function(filename) {
  const absPath = path.resolve(__dirname, filename)
  // 判断路径所在文件是否存在
  if (fs.existsSync(absPath)) {
    return absPath
  } else {
    // 文件定位
    const extnames = Object.keys(Module._extensions)
    // 添加后缀，并判断文件是否存在
    for(let i = 0; i < extnames.length; i++) {
      let newPath = absPath + extnames[i]
      if (fs.existsSync(newPath)) {
        return newPath
      }
    }
    // 如果不存在，则当成一个目录，查找目录下package.json中main属性，并重复上述判断
    // 如果main不存在，则默认index，重复上述判断
    // 以上情况，暂时不考虑
    throw new Error(`${filename} is not exist`)
  }
}
Module.wrapper = [
  "(function(exports, require, module, __dirname, __filename) {",
  "})"
]
Module._extensions = {
  '.js'(module) {
    // 读取
    let content = fs.readFileSync(module.id, 'utf-8')
    //包装
    content = Module.wrapper[0] + content + Module.wrapper[1]
    // 准备参数的值
    const filename = path.extname(module.id)
    const dirname = path.dirname(module.id)
    const exports = module.exports

    // 转化为可以行函数
    const compileFn = vm.runInThisContext(content)

    // 调用
    // 此处就是默认一个文件中this为空的原因
    compileFn.call(exports, exports, myRequire, module, dirname, filename)
  },
  '.json'(module) {
    // 读取
    let content = fs.readFileSync(module.id, 'utf-8')
    module.exports = JSON.parse(content)
  }
}
Module.prototype.load = function() {
  // 根据后缀获取执行方法
  const extname = path.extname(this.id)
  Module._extensions[extname](this)
}

const obj = myRequire('./m')
console.log("🚀 ~ file: imitate-require.js ~ line 86 ~ obj", obj)
const obj1 = myRequire('../list')
console.log("🚀 ~ file: imitate-require.js ~ line 86 ~ obj", obj1)
const obj2 = myRequire('../list')
console.log("🚀 ~ file: imitate-require.js ~ line 86 ~ obj", obj2)
