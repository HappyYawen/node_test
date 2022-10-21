const EventEimtter = require('events')
const ev = new EventEimtter()

const cbFn = (a,b,c) => {
  console.log(a,b,c)
}

ev.on('事件1', cbFn)

ev.emit('事件1',1,2,3)

//取消监听
ev.off('事件1', cbFn)
//触发，什么也不会发生
ev.emit('事件1',1,2,3)

module.exports = 'lg'
