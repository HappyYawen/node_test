const fs = require('fs')
const path = require('path')
const vm = require('vm')

let age = 33
let content = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
//执行字符串代码的方法：

// eval执行
// 会有弊端，如果字符串代码中变量与当前文件变量同名，就会冲突
// eval(content)
// console.log(age)

//使用 new Function
let fn = new Function('age', 'return age + 1')
console.log(fn(age))

// vm沙箱环境执行
// vm.runInThisContext(content)
// 可以识别当前文件的全局变量，无法识别当前文件的局部变量
vm.runInThisContext("age += 10")
console.log(age)