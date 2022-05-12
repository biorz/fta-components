import { ValidateRule } from '../../types/form'

/** 是否未设置校验规则 */
export const isEmptyRules = (rules?: ValidateRule[]) => !rules || !rules.length
/** 生成唯一的key */
export const uniqueId = (() => {
  let count = 0
  return (prefix = '') => `${prefix}${++count}`
})()

/** 缓存值的函数 */
export const cache = (fn: (...args: any) => any, cached?: object) => {
  const hit = cached || {}
  return (key: string) => hit[key] || (hit[key] = fn(key))
}
