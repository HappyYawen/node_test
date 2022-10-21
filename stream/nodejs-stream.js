const fs = require('fs')

let rs = fs.createReadStream('./test.txt')
let ws = fs.createWriteStream('./test1.txt')

rs.pipe(ws) // 执行 就会创建一个test.txt文件，并将test.txt内容写入