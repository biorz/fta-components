export const tuple = <T extends string[]>(...args: T) => args

export type FlexType = number | 'none' | 'auto' | string

export function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }
  return flex
}
