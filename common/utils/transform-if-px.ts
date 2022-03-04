import { pxTransform } from './px-transform'

export function transformIfPx(size: string | number): string | number {
  if (!/px$/.test(String(size))) return size

  size = Number(String(size).replace(/px$/, ''))
  return pxTransform(size)
}
