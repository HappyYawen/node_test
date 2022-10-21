/*
* 执行同步代码，将不同的任务添加至相应的队列
* 所有同步代码执行后会去执行满足条件的微任务
* 所有微任务代码执行后会执行 timer 队列中满足的宏任务
* timer中所有宏任务执行完成后就会依次切换队列
* 注意：新版node，已改为与浏览器一致，也就是每执行完一个宏任务，就回去清空一次微任务队列
*/
/**
 * 宏任务不同队列，顺序切换执行如下
 * **timers**: 执行setTimeout 与 setInterval 回调
 * pending callbacks: 执行系统操作的回调，例如 tcp udp
 * idle,prepare: 只在系统内部进行使用
 * **poll**: 执行与 I/O 相关的回调
 * **check**: 执行 setImmediate 中的回调
 * close callbacks: 执行 close 事件的回调
 * 注意：特意*号的三项，是代码中常见的，其他的事系统内部的不会在业务代码层面展现出来
 */
/**
 * 注意微任务中，nextTick的优先级高于promise.then，所以nextTick会先执行
 */
setTimeout(() => {
  console.log('s1')
  new Promise((res,rej) => {
    console.log('p0')
    res()
  }).then(() => {
    console.log('p1')
  })
  process.nextTick(() => {
    console.log('t1')
  })
})
Promise.resolve().then(() => {
  console.log('p2')
})
console.log('start')

setTimeout(() => {
  console.log('s2')
  Promise.resolve().then(() => {
    console.log('p3')
  })
  process.nextTick(() => {
    console.log('t2')
  })
})

setImmediate(() => {
  console.log('s3')
})

console.log('end')

// start end p2 s1 p0 t1 p1 s2 t2 p3 s3