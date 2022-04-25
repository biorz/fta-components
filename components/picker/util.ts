/** 获取当前激活的索引 */
export const getAcitveIndex = (scrollTop: number) => {
  if (scrollTop < 25) return 0
  if (scrollTop < 25 + 33 - 10) return 1
  if (scrollTop < 25 + 33 + 10) return 2
  return Math.round((scrollTop - (25 + 33 + 15)) / 20) + 3
}

/** 根据索引获得当前位置 */
export const getScrollTopOverIndex = (index: number) => {
  if (index === 0) return 0
  if (index === 1) return 33
  return 33 + 20 * (index - 1)
}

export const formatNum = (num: number) => (num < 10 ? `0${num}` : String(num))
// 获取当前日期·yyyy-mm-dd·
export const getCurrentDate = () => {
  const date = new Date()
  return date.getFullYear() + formatNum(date.getMonth() + 1) + formatNum(date.getDate())
}
// 获取选择精度
export const getSelectorDepth = (fields: string) =>
  fields === 'day' ? 3 : fields === 'month' ? 2 : 1
// 获取起始日期
export const parseDate = (date: string) => date.split('-').map(Number)
// 生成指定数字区间数组
export const genPeriodList = (start: number, end: number) =>
  new Array(end - start + 1).fill(0).map((v, i) => start + i)
// 根据年月获取当前月有多少天
export const getDaysCount = (year: number, month: number) => new Date(year, month, 0).getDate()
// 获取当前日期索引
