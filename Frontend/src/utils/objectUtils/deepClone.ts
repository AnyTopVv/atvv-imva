/**
 * @function 对象深拷贝
 * @param  {Object}
 * @return {Object}
 */
export function deepClone(obj: any, cache = new WeakMap()) {
  if (typeof obj === 'symbol') return Symbol(obj.description)	// 处理 Symbol
  if (typeof obj !== 'object') return obj //普通类型，直接返回
  if (obj === null) return obj
  if (cache.get(obj)) return cache.get(obj)//防止循环引用，程序进入死循环
  if (obj instanceof Date) return new Date(obj)//返回时间格式
  if (obj instanceof RegExp) return new RegExp(obj)//返回正则

  //找到所属原型上的constructor,所属原型上的constructor指向点前对象的构造函数
  let cloneObj = new obj.constructor()
  // console.log(cloneObj)
  cache.set(obj, cloneObj)//缓存拷贝的对象，用于处理循环引用的情况
  for (let key in obj) {
    //hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
    if (obj.hasOwnProperty(key)) {
      // console.log(key)
      cloneObj[key] = deepClone(obj[key], cache)//递归拷贝
    }
  }
  return cloneObj
}
