export * from './create-selector-query'
export * from './env'

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isArray = Array.isArray

export const extend = Object.assign

export const upperCase = (val: string) => val[0].toUpperCase() + val.slice(1)
