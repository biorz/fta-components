import { inDev } from './env'

export const noob = {}
export const noop = () => {}
export const no = () => false

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isArray = Array.isArray

export const extend = Object.assign

export const upperCase = (val: string) => val[0].toUpperCase() + val.slice(1)

export const log = inDev ? console.log : noob

export * from './classnames'
export * from './create-selector-query'
export * from './deep-merge'
export * from './delay'
export * from './env'
export * from './handle-touch-scroll'
export * from './merge-style'
export * from './object2string'
export * from './px-transform'
export * from './transform-if-px'
export * from './use-enhanced-state'
