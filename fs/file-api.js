const fs = require('fs')
const path = require('path')

// readFile path.resolve获取到的绝对路径，也可以写相对路径
// fs.readFile(path.resolve('data1.txt'), 'utf-8', (err, data) => {
//   console.log(err)
//   if(!err) {
//   console.log(data)
//  }
// })

// writeFile 
// 如果文件存在，覆盖文件原本的内容
// 如果是不存在的文件，则直接创建一个文件并写入内容
// fs.writeFile('data1.txt', 'hello Node.js', (err) => {
//   if(!err) {
//     fs.readFile('data.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

// fs.writeFile('data.txt', '11111', {
//   mode: 438, // 操作权限权限位 438 是十六进制数字，表示可读可写
//   flag: 'r+', // 从第一个位置开始重写内容，原本内容如果长度多于本次重写内容长度，则多出的部分会保留着
//   encoding: 'utf-8'
// }, (err) => {
//   if(!err) {
//     fs.readFile('data.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

// appendFile 追加文件内容
// fs.appendFile('data.txt', ' hello karla', (err) => {
//   if(!err) {
//     console.log('写入成功')
//   }
// })

// copyFile
// fs.copyFile('data.txt', 'test.txt', (err) => {
//   if(!err) {
//     console.log("拷贝成功")
//   }
// })

//watchFile
fs.watchFile('data.txt', {
 interval: 20 // 单位ms
}, (curr, prev) => {
  console.log("🚀 ~ file: file-api.js ~ line 53 ~ curr, prev", curr, prev)
  if(curr.mtime !== prev.mtime) {
    console.log("文件被修改了")
    fs.unwatchFile('data.txt') // 取消监控
  }
})