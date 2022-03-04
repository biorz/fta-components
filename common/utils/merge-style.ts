import { objectToString } from './object2string'

/**
 * 合并 style
 * @param {Object|String} style1
 * @param {Object|String} style2
 * @returns {String}
 */
export function mergeStyle(...styles: any[]): object | string {
  const _styles = styles.reduce((pre, cur) => pre.concat(cur), [])

  if (_styles.some((style: any) => typeof style == 'string')) {
    return _styles.reduce(
      (pre: string, cur: string | Record<string, any>) => pre + objectToString(cur),
      ''
    )
  }

  return _styles.reduce((pre: any, cur: any) => Object.assign(pre, cur), {})
}
