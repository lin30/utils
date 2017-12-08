function extendObj() { // 浅拷贝合并对象
  var len = arguments.length
  var target = {}
  for (var i = 0; i < len; i++) {
    for (var attr in arguments[i]) {
      if (arguments[i].hasOwnProperty(attr)) { // 过滤原型上的属性,方法
        target[attr] = arguments[i][attr]
      }
    }
  }
  return target
}

function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  } else {
    return arr instanceof Array
    // return arr.constructor === Array
    // return Object.prototype.toString.call(arr) == '[object Array]'
  }
}