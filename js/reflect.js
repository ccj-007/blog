//观察者模式
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, { set });

function set (target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

//被观察目标对象
const person = observable({
  name: '张三',
  age: 20
});

function print () {
  console.log(`${person.name}, ${person.age}`)
}

//观察person
observe(print);
person.name = '李四';

