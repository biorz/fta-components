import { ReactNode, useState } from 'react'

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
  return date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' + formatNum(date.getDate())
}
/** 获取选择精度 */
export const getSelectorDepth = (fields: string) =>
  fields === 'day' ? 3 : fields === 'month' ? 2 : 1
/** 获取起始日期 */
export const parseDate = (date: string) => date.split('-').map(Number)
/** 生成指定数字区间数组 */
export const genPeriodList = (start: number, end: number) =>
  new Array(end - start + 1).fill(0).map((_, i) => start + i)
/** 根据年月获取当前月有多少天 */
export const getDaysCount = (year: number, month: number) => new Date(year, month, 0).getDate()

/** 获取安全的scrollTop */
// export const resolveSafeScrollTop = (scrollTop: number, length: number) => {
// let safeScrollTop = scrollTop
// if (length >= 5) {
//   const maxScrollTop = 20 * length + 13 * 2 + 30 * 2
//   if (safeScrollTop > maxScrollTop) {
//     safeScrollTop = maxScrollTop
//   }
// }
// return scrollTop
// }

/** item是否对齐 */
export const getAlignedIndex = (scrollTop: number, range: any[]) => {
  const indexOffset = scrollTop / ItemHeight
  let indexAligned = Math.round(indexOffset)

  if (indexAligned > range.length - 1) {
    indexAligned = range.length - 1
  }

  return indexAligned * ItemHeight
}

/** 获取当前时间 */
export const getCurrentTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return formatNum(hours) + ':' + formatNum(minutes)
}

/** 解析时间·hh:mm· */
export const parseTime = <T extends [number, number] = [number, number]>(time: string) => {
  return time.split(':').map(Number) as T
}

/** useArray hook */
export const useArray = <T extends any[]>(initialArray: T | (() => T)) => {
  const [array, _setArray] = useState<T>(initialArray)
  const setArray = (value: T[number], index: number) => {
    if (value === array[index]) return
    const copy = array.slice()
    copy[index] = value
    _setArray(copy as T)
  }

  return [array, setArray, _setArray] as const
}

/** 判断children节点是否为空 */
export const isChildrenNull = (children: ReactNode) => {
  if (!children) return true
  if (Array.isArray(children) && children.every((child) => child == null)) {
    return true
  }
  return false
}

// export const useLatest = <T extends any>(current: T) => {
//   const storedValue = useRef(current)
//   useEffect(() => {
//     storedValue.current = current
//   })
//   return storedValue
// }

// export const useThrottle = (fn: (...args: any) => any, delay = 10) => {
//   // const timerRef = useRef<NodeJS.Timeout>()
//   const latestFn = useLatest(fn).current
//   const timeRef = useRef(+new Date())
//   return useCallback(
//     (...args: any[]) => {
//       const nowTime = +new Date()
//       if (nowTime - timeRef.current > delay) {
//         timeRef.current = nowTime
//         latestFn.apply(null, args)
//       } else {
//         console.log('节流')
//       }
//     },
//     [latestFn]
//   )
// }

// export const useForceUpdate = (): (() => void) => {
//   const [, force2Update] = useState<{}>(Object.create(null))

//   const forceUpdate = useCallback((): void => {
//     force2Update(Object.create(null))
//   }, [force2Update])

//   return forceUpdate
// }
