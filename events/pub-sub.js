class PubSub {
  constructor() {
    this._events = {}
  }
  //注册
  subscribe(event, cb) {
    if(this._events[event]) {
      this._events[event].push(cb)
    } else {
      this._events[event] = [cb]
    }
  }
  //发布
  publish(event, ...args) {
    const items = this._events[event]
    if(items && items.length) {
      items.forEach(function(cb) { // 使用函数声明方式，为了使用this
        cb.call(this, ...args)//this指的是pubsub实例本身
      })
    }
  }
}

let pub = new PubSub()
pub.subscribe('事件1',(a,b,c) => {
  console.log('事件1执行了',a,b,c)
})
pub.publish('事件1',1,2,3)