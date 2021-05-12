const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise')
}
