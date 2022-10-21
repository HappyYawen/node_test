import express from 'express'
import { DataStore } from './data'

// console.log(process.env.HOME)
// console.log(process.argv)

// const app = express()

// app.get('/', (req, res) => {
//   res.end(JSON.stringify(DataStore.list))
// })

// app.listen(8080, () => {
//   console.log('服务启动了......')
// })

//当前脚本文件执行完成后触发
process.on('exit', (code) => {
  //code 状态码
  console.log('exit ' + code)
  //回调函数内部只能写同步代码，异步代码不支持
})
process.on('beforeExit',(code) => {
  //回调函数内部可以写异步代码
  console.log('before exit ' + code)
  setTimeout(() => {
    console.log("setTimeout trigger")
    //需要手动结束进程
    process.exit(0)
  }, 1000)
})
console.log("代码执行完了")
// console.log = function(data) {
//   process.stdout.write('---' + data + '\n')
// }

console.log(12222)

// const fs = require('fs')
// fs.createReadStream('list.json')
// // 管道，通过管道将上述读取到的内容流向下一个地方
// // 此例子是通过管道流向了标准输出process.stdout
// .pipe(process.stdout)

//命令行输入的内容，会通过管道流向标准输出，然后打印在控制台中
// process.stdin.pipe(process.stdout)

// process.stdin.setEncoding('utf-8')
// process.stdin.on('readable', () => {
//   let chunk = process.stdin.read()
//   if(chunk !== null) {
//     process.stdout.write('data ' + chunk)
//   }
// })
// const path = require('path')
// console.log(path.resolve())
// console.log(path.resolve('a', '/b'))

// console.log(process.memoryUsage())

// const b1 = Buffer.alloc(10) // 申请10个字节大小的buffer空间
// console.log(b1) // <Buffer 00 00 00 00 00 00 00 00 00 00>
// const b2 = Buffer.allocUnsafe(10)
// console.log("🚀 ", b2)

// const b3 = Buffer.from('1')
// console.log("🚀 ", b3)
// const b4 = Buffer.from('中')
// console.log("🚀 ", b4)
// const b5 = Buffer.from([1,2,3])
// console.log(b5)
// const b6 = Buffer.from(b1) // 拷贝一个新的buffer，与b1不会共享内存
// b6[0] = 1
// console.log(b1)
// console.log(b6)

// let b1 = Buffer.alloc(6)
// let b2 = Buffer.from('拉勾')
// b2.copy(b1, 0, 3, 6)
// console.log(b1)
// console.log(b1.toString())
// console.log(b2.toString())

ArrayBuffer.prototype.split = function(sep: any) {
  const len = Buffer.from(sep).length
  let start = 0
  let offset = 0
  let ret = []
  while(offset = this.indexOf(sep, start) !== 0) {
    ret.push(this.slice(start, offset))
    start = offset + len
  }
  return ret
}

let buf = 'karla吃馒头，吃面条，我吃所有吃'
let bufArr = buf.split('吃')
console.log(bufArr)