class MyEvent {
  constructor() {
    this._event = Object.create(null)
  }
}
MyEvent.prototype.on = function(event, cb) {
  if(this._event[event]) {
    this._event[event].push(cb)
  } else {
    this._event[event] = [cb]
  }
}
MyEvent.prototype.emit = function(event, ...args) {
  const listeners = this._event[event]
  if(listeners && listeners.length) {
    listeners.forEach(function(listener) {
      listener.call(this, ...args)
    })
  }
}
MyEvent.prototype.off = function(event, cb) {
  const listeners = this._event[event]
  if(listeners && listeners.length) {
    this._event[event] = listeners.filter(function(item) {
      return item !== cb && cb.link !== item
    })
  }
}
MyEvent.prototype.once = function(event, cb) {
  const self = this
  let fn = function(...args) {
    cb.call(self, ...args)
    self.off(event, fn)
  }
  fn.link = cb
  self.on(event, fn)
}

const ev = new MyEvent()
const fn = (a,b) => {
  console.log('事件1执行了',a,b)
}
ev.on('事件1', fn)
ev.on('事件1', () => {
  console.log('222222')
})
ev.once('事件2', () => {
  console.log('事件2执行了')
})
ev.emit('事件1',1,2)
ev.emit('事件2')

ev.off('事件1',fn)
ev.emit('事件1',1,2)
ev.emit('事件2')