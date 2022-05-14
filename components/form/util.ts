import { ReactNode } from 'react'
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

/** 解析函数类型的子组件 */
export const parseChildren = <P extends object = {}>(
  children: ReactNode | ((props: P) => ReactNode),
  props: P
) => (typeof children === 'function' ? children(props) : children)

/** 删除对象指定属性 */
export const omit = <T extends object = object>(target: T, omitProps: Array<keyof T> = []) => {
  omitProps.forEach((key) => delete target[key])
  return target
}
