const ItemHeight = 30

/** 获取当前激活的索引 */
export const getAcitveIndex = (scrollTop: number, maxLenth: number) => {
  // if (scrollTop < 25) return 0
  // if (scrollTop < 25 + 33 - 10) return 1
  // if (scrollTop < 25 + 33 + 10) return 2
  // const index = Math.round((scrollTop - (25 + 33 + 15)) / 20) + 3

  //
  const index = Math.round(scrollTop / ItemHeight)
  return index >= maxLenth ? maxLenth - 1 : index
}

/** 根据索引获得当前位置 */
export const getScrollTopOverIndex = (index: number) => {
  return ItemHeight * index
}

export const formatNum = (num: number) => (num < 10 ? `0${num}` : String(num))
/** 获取当前日期·yyyy-mm-dd· */
export const getCurrentDate = () => {
  const date = new Date()
  return date.getFullYear() + formatNum(date.getMonth() + 1) + formatNum(date.getDate())
}
/** 获取选择精度 */
export const getSelectorDepth = (fields: string) =>
  fields === 'day' ? 3 : fields === 'month' ? 2 : 1
/** 获取起始日期 */
export const parseDate = (date: string) => date.split('-').map(Number)
/** 生成指定数字区间数组 */
export const genPeriodList = (start: number, end: number) =>
  new Array(end - start + 1).fill(0).map((v, i) => start + i)
/** 根据年月获取当前月有多少天 */
export const getDaysCount = (year: number, month: number) => new Date(year, month, 0).getDate()

/** 获取安全的scrollTop */
export const resolveSafeScrollTop = (scrollTop: number, length: number) => {
  // let safeScrollTop = scrollTop
  // if (length >= 5) {
  //   const maxScrollTop = 20 * length + 13 * 2 + 30 * 2
  //   if (safeScrollTop > maxScrollTop) {
  //     safeScrollTop = maxScrollTop
  //   }
  // }
  return scrollTop
}

/** item是否对齐 */
export const getAlignedIndex = (scrollTop: number, precision = 0.1) => {
  const indexOffset = scrollTop / ItemHeight
  const indexAligned = Math.round(indexOffset)
  const withinPrecision = Math.abs(indexOffset - indexAligned) <= precision
  if (withinPrecision) {
    return -1
  }
  return indexAligned * ItemHeight
}
