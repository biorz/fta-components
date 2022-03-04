const defaultDesignWidth = 750
const deviceRatio = {
  640: 2.34 / 2,
  750: 1,
  828: 1.81 / 2,
}

export function pxTransform(
  size: number,
  designWidth: keyof typeof deviceRatio = defaultDesignWidth
): string | number {
  if (!size) return ''
  return size / deviceRatio[designWidth]
}
