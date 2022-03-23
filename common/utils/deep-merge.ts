type Source = Record<string, any>

type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export const isObject = (val: unknown): val is object =>
  Object.prototype.toString.call(val).slice(8, -1) === 'Object'

/**
 * 深度合并对象
 */
export function deepMerge(source: Source, target: DeepPartial<Source>) {
  if (isObject(target)) {
    Object.entries(target).forEach(([key, val]) => {
      if (isObject(val)) {
        deepMerge(source[key], val)
      } else {
        source[key] = val
      }
    })
  }
  return source
}
