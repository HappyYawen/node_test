const fs = require('fs')
const path = require('path')

// open
fs.open(path.resolve(__dirname, 'data.txt'), 'r', (err, fd) => { // fd文件操作符
  console.log(fd)
  // close
  fs.close(fd, (err) => {
    console.log('关闭成功')
  })
})
