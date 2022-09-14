var handler = {
  //读取
  get: function (target, name, receiver) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  //设置
  set (target, propKey, value, receiver) {
    if (propKey.includes('_')) {
      throw new TypeError('it is private');
    }
    obj[prop] = value;
    return true;
  },

  //拦截函数调用
  apply: function (target, thisBinding, args) {
    return args[0];
  },

  //拦截new
  construct: function (target, args) {
    return { value: args[1] };
  },

  //拦截HasProperty操作
  has: function (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }

};

var proxyObj = new Proxy(function (x, y) {
  return x + y;
}, handler);

proxyObj(1, 2) // 拦截函数，默认返回第一项 1
new proxyObj(1, 2) // 拦截构造函数    {value: 2}
proxyObj.prototype === Object.prototype //改造原型对象 true
proxyObj.foo === "Hello, foo" //读取操作默认浅比较  true

var privateObj = new Proxy({
  _context: { data: 'data' }
}, handler);

privateObj._context = { data: null } // _ 私有属性不能设置

if (data in privateObj._context) {  //has拦截
  console.log('exist _context');
}