import { ScrollView, Text, View } from '@tarojs/components'
import React, {
  FC,
  forwardRef,
  memo,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { inRN } from '../../common'
import '../../style/components/picker/index.scss'
import {
  Arrayable,
  FloatLayoutProps,
  PickerDateProps,
  PickerMode,
  PickerMultiSelectorProps,
  PickerProps,
  PickerRefMethods,
  PickerSelectorProps,
  PickerTimeProps,
} from '../../types/picker'
import FloatLayout from '../action-sheet'
import {
  formatNum,
  genPeriodList,
  getAcitveIndex,
  getAlignedIndex,
  getCurrentDate,
  getCurrentTime,
  getDaysCount,
  getScrollTopOverIndex,
  getSelectorDepth,
  isChildrenNull,
  parseDate,
  parseTime,
  useArray,
} from './util'

type ScrollEvent = {
  detail: {
    scrollTop: number
    [key: string]: any
  }
}

// console.log(getCurrentDate(), 'getCurrentDate')

const builtInModes: PickerMode[] = [
  'selector',
  /** 多列选择器 */
  'multiSelector',
  /** 时间选择器 */
  'time',
  /** 日期选择器 */
  'date',
  /** 省市区选择器 */
  // 'region',
]

function _ScrollArea(props: {
  scrollWithAnimation?: boolean
  // onScroll?: (e: any) => void
  onChange?: (newIndex: number, oldIndex: number) => void
  activeIndex: number
  range: any[]
  format?: (value: any) => string | number
}): JSX.Element {
  const { activeIndex, range, format, onChange, scrollWithAnimation } = props
  const activeIndexRef = useRef(+activeIndex >= 0 ? +activeIndex : 0)
  const [scrollTop, setScrollTop] = useState(getScrollTopOverIndex(activeIndex))
  const timerRef = useRef<any>()
  const [top, setTop] = useState(scrollTop)
  const scrollRef = useRef({ scrollTop, setScrollTop, top, setTop, onChange }).current

  useEffect(() => {
    scrollRef.scrollTop = scrollTop
    scrollRef.setScrollTop = setScrollTop
    scrollRef.top = top
    scrollRef.setTop = setTop
    scrollRef.onChange = onChange
  }, [scrollTop, top, setScrollTop, setTop, onChange])

  useEffect(() => {
    if (activeIndexRef.current !== activeIndex) {
      activeIndexRef.current = activeIndex
      const top = getScrollTopOverIndex(activeIndex)
      setScrollTop(top)
      // 需要直接设置高度
      setTop(top)
    }
  }, [activeIndex])

  useEffect(() => {
    fixOffset()
  }, [scrollTop])
  /** 滚动 */
  const _onScroll = (e: ScrollEvent) => {
    const scrollTop = e.detail.scrollTop
    setScrollTop(scrollTop)
    inRN && setTop(scrollTop)
  }

  /** 滚动到底部 */
  const _onScrollToLower = () => {
    const scrollTop = getScrollTopOverIndex(range.length - 1)
    setScrollTop(scrollTop)
  }

  /**
   * 滑动停止后修复位置偏移
   */
  const fixOffset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      const scrollTop = scrollRef.scrollTop
      const offset = getAlignedIndex(scrollTop, range)
      // if (offset > -1) {
      let _activeIndex = getAcitveIndex(offset, range.length)
      const _prevIndex = activeIndexRef.current
      const needChange = _prevIndex !== _activeIndex
      if (needChange) {
        activeIndexRef.current = _activeIndex
        scrollRef.onChange?.(_activeIndex, _prevIndex)
      }
      // WARNING: 滚动位置过小，使得setState生效，前后两次值必须不同
      scrollRef.setTop(offset + Math.abs(scrollTop - offset) / 1000)
      // scrollRef.setScrollTop(offset)
      //
      timerRef.current = null
      // }
    }, 500)
  }

  return (
    <ScrollView
      scrollY
      enhanced
      className='fta-picker-block'
      lowerThreshold={10}
      scrollTop={top}
      bounces={false}
      // @ts-ignore
      alwaysBounceVertical={false}
      scrollWithAnimation={scrollWithAnimation}
      showsVerticalScrollIndicator={false}
      showScrollbar={false}
      onScroll={_onScroll}
      onScrollToLower={_onScrollToLower}
      // onScrollToUpper={_onScrollToUpper}
    >
      {/* placeholder */}
      <View className='fta-picker-item--placeholder'>
        {/* scroll items */}
        {range.map((v, i) => {
          // const itemClass = classNames(
          //   'fta-picker-item',
          //   activeIndexRef.current === i && 'fta-picker-item--active'
          // )
          const _value = format!(v)
          return (
            <View key={`${_value}-${i}-${range[0]}-${range.length}`} className='fta-picker-item'>
              <Text
                // @ts-ignore
                numberOfLines={1}
                className={'fta-picker-item__text'}>
                {_value}
              </Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

_ScrollArea.defaultProps = {
  scrollWithAnimation: true,
  activeIndex: 0,
  format: (v: string | number) => v,
  onChange() {},
}

const ScrollArea = memo(_ScrollArea)

const pickerMap: Record<PickerMode, FC<any>> = {
  selector: SelectorPicker,
  multiSelector: MultiSelectorPicker,
  time: TimePicker,
  date: DatePicker,
  region: RegionPicker,
}

/**
 * @component
 * 基础Picker
 */
function BasePicker(props: FloatLayoutProps & { value?: Arrayable<number> | string }): JSX.Element {
  const {
    isOpened,
    children,
    title,
    methods,
    cancelText,
    confirmText,
    onConfirm,
    onCancel,
    value,
    ...extrapProps
  } = props

  return (
    <FloatLayout
      isOpened={isOpened}
      title={{
        title,
        cancelText,
        confirmText,
        onConfirm() {
          onConfirm?.(value!)
          console.log('确认值', value)
          methods?.hide()
        },
        onCancel() {
          onCancel?.(value!)
          methods?.hide()
        },
      }}
      {...extrapProps}>
      <View className='fta-picker' catchMove>
        {children}
        {/* 分割线 */}
        {isChildrenNull(children) ? null : (
          <>
            <View
              className='fta-picker-opacity fta-picker-opacity--top'
              // @ts-ignore
              pointerEvents='none'
            />
            <View
              className='fta-picker-line'
              // @ts-ignore
              pointerEvents='none'
            />
            <View
              className='fta-picker-opacity fta-picker-opacity--bottom'
              // @ts-ignore
              pointerEvents='none'
            />
            {/* <View className='fta-picker-line fta-picker-line--bottom'></View> */}
          </>
        )}
      </View>
    </FloatLayout>
  )
}

BasePicker.defaultProps = {
  title: ' ',
  cancelText: '取消',
  confirmText: '确认',
}

/** Picker */
function _Picker(props: Partial<PickerProps>, ref: Ref<PickerRefMethods>): JSX.Element {
  const [visible, toggle] = useState(false)
  const methods = {
    show() {
      toggle(true)
    },
    hide() {
      toggle(false)
    },
  }
  useImperativeHandle(ref, () => methods)

  const { mode } = props
  const _mode: PickerMode = builtInModes.includes(mode!) ? mode! : 'selector'
  const TypedPicker = pickerMap[_mode] as FC<PickerProps>
  // @ts-ignore
  return <TypedPicker {...props} isOpened={visible} onClose={methods.hide} methods={methods} />
}

const Picker = forwardRef(_Picker)

const pickerDefaultProps: PickerProps = {
  mode: 'selector',
  range: [],
  onChange() {},
}
// @ts-ignore
Picker.defaultProps = pickerDefaultProps

type Compose<T> = T & FloatLayoutProps
/** 默认的格式化函数 */
const createDefaultFormat = (rangeKey?: string) =>
  rangeKey ? (value: Record<string, string | number>) => value[rangeKey] : void 0

/* ========================= 类型选择器具体实现 ======================= */

/**
 * @component
 * 单列选择器
 */
function SelectorPicker(props: Compose<PickerSelectorProps>): JSX.Element {
  const { range, rangeKey, value, onChange, format } = props
  const _format = format || createDefaultFormat(rangeKey)
  const ref = useRef<number>(value || 0)
  const _onChange = (newVal: number, oldVal: number) => {
    onChange?.(newVal, oldVal)
    ref.current = newVal
  }
  return (
    <BasePicker {...props} value={ref.current}>
      <ScrollArea format={_format} range={range} activeIndex={value!} onChange={_onChange} />
    </BasePicker>
  )
}

/**
 * @component
 * 多列选择器
 */
function MultiSelectorPicker(props: Compose<PickerMultiSelectorProps>): JSX.Element {
  const { range, rangeKey, value, onChange, format } = props

  const [_value, setValue] = useState(value?.length ? value : new Array(range.length).fill(0))
  const ref = useRef<number[]>(_value)

  const _onChange = (newIndex: number, index: number) => {
    const copy = _value.slice()
    copy[index] = newIndex
    onChange?.(copy, _value)
    setValue(copy)
    ref.current = copy
  }
  return (
    <BasePicker {...props} value={ref.current}>
      {range.map((column: any[], index: number) => {
        const _format =
          Array.isArray(format) && format[index] ? format[index] : createDefaultFormat(rangeKey)
        return (
          <ScrollArea
            key={index}
            format={_format}
            range={column}
            activeIndex={_value[index]!}
            onChange={(newV) => _onChange(newV, index)}
          />
        )
      })}
    </BasePicker>
  )
}

const createTimeFormat = (
  format: Array<(value: any) => string | number> | undefined,
  index: number,
  defaultFormat: (value: number) => string | number
) => (Array.isArray(format) && format[index] ? format[index] : defaultFormat)

const months = genPeriodList(1, 12)
const days = genPeriodList(1, 31)

const dYearFormat = (v: number) => (v === 9999 ? '长期' : `${v}年`)
const dMonthFormat = (v: number) => `${v}月`
const dDayFormat = (v: number) => `${v}日`

/**
 * @component
 * 日期选择器
 */
function DatePicker(props: Compose<PickerDateProps>): JSX.Element {
  const { start, end, value, onChange, longterm, format, fields } = props

  const depth = useRef(getSelectorDepth(fields!)).current
  const [y1, m1, d1] = useRef(parseDate(start!)).current
  const [y2, m2, d2] = useRef(parseDate(end!)).current

  const [indexs, _setIndexs] = useState([0, 0, 0])
  const setIndexs = (value: number, depth: number) => {
    // if(depth)
    const copy = indexs.slice()
    copy[depth] = value
    // console.log('indexs', copy, indexs)
    _setIndexs(copy)
    // @ts-ignore
    onChange?.(dateRef)
  }

  const nowDates = parseDate(value!)
  const dateRef = useRef(nowDates).current
  const [y, m, d] = dateRef
  const years = useRef(genPeriodList(y1, y2).concat(longterm ? [9999] : [])).current

  // let yTimerRef = useRef<NodeJS.Timer | null>(null)

  const onYearChange = (i: number) => {
    dateRef[0] = years[i]
    setIndexs(years[i] === 9999 ? indexs[0] : i, 0)
    // if (yTimerRef.current) {
    //   clearTimeout(yTimerRef.current)
    //   yTimerRef.current = null
    // }
    // yTimerRef.current = setTimeout(() => {

    // }, 150)
  }

  let MonthElement: ReactNode = null
  let DayElement: ReactNode = null
  const yIndex = years.indexOf(y)
  // 年份
  const YearElement = (
    <ScrollArea
      activeIndex={yIndex}
      range={years}
      format={createTimeFormat(format, 0, dYearFormat)}
      onChange={onYearChange}
    />
  )

  // 月份
  if (depth > 1) {
    const _months = months.slice()
    if (
      // 结束月份早于12月
      m2 !== 12 &&
      // 当前位于结束年份
      dateRef[0] === y2
    ) {
      _months.splice(m2, 12 - m2)
    }
    if (
      // 起始月份不是从第一个月开始
      m1 !== 1 &&
      // 当前位于起始年份
      dateRef[0] === y1
    ) {
      _months.splice(0, m1 - 1)
    }
    let tmp: number
    let mActiveIndex =
      (tmp = _months.indexOf(m)) === -1
        ? m > _months[_months.length - 1]
          ? _months.length - 1
          : 0
        : tmp
    MonthElement = (
      <ScrollArea
        activeIndex={mActiveIndex}
        range={_months}
        format={createTimeFormat(format, 1, dMonthFormat)}
        onChange={(i) => {
          // console.log('m change')
          dateRef[1] = _months[i]
          setIndexs(i, 1)
        }}
      />
    )
    // FIXME: 重新赋值 DONE！
    dateRef[1] = _months[mActiveIndex]
    // 日期
    if (depth > 2) {
      // FIXME: 引用最新的月份 DONE！
      const m = dateRef[1]
      const count = getDaysCount(y, m)

      const _days = days.slice(0, count)
      if (
        // 结束日期不是最后一天
        d2 !== count &&
        // 当前位于结束年份
        dateRef[0] === y2 &&
        // 当前位于结束月份
        dateRef[1] === m2
      ) {
        _days.splice(d2, count - d2)
      }
      if (
        // 起始日期不是从第一天开始
        d1 !== 1 &&
        // 当前位于起始年份
        dateRef[0] === y1 &&
        // 当前位于起始月份
        dateRef[1] === m1
      ) {
        _days.splice(0, d1 - 1)
      }

      let i: number
      let dActiveIndex =
        (i = _days.indexOf(d)) === -1 ? (d > _days[_days.length - 1] ? _days.length - 1 : 0) : i

      dateRef[2] = _days[dActiveIndex]

      DayElement = (
        <ScrollArea
          activeIndex={dActiveIndex}
          range={_days}
          format={createTimeFormat(format, 2, dDayFormat)}
          onChange={(i) => {
            // console.log('d changed index:' + i, 'value:' + _days[i])
            dateRef[2] = _days[i]
            setIndexs(i, 2)
          }}
        />
      )
    }
  }

  return (
    <BasePicker {...props} value={dateRef.map(formatNum).join('-')}>
      {YearElement}
      {MonthElement}
      {DayElement}
    </BasePicker>
  )
}

DatePicker.defaultProps = {
  start: '1970-01-01',
  end: '2099-12-31',
  fields: 'day',
  value: getCurrentDate(),
  longterm: false,
}

const totalHours = genPeriodList(0, 23)
const totalMins = genPeriodList(0, 59)

/**
 * @component
 * 时间选择器
 */
function TimePicker(props: Compose<PickerTimeProps>): JSX.Element {
  const { start, end, value = getCurrentTime() } = props
  // 起始时分
  const [[h1, m1], [h2, m2]] = useRef([parseTime(start!), parseTime(end!)] as const).current
  // 小时区间不变, 用Ref存储
  const hours = useRef(totalHours.slice(h1, h2 + 1)).current
  // 存储更新之前分针的区间
  const preRef = useRef(totalMins.length)

  const [times, setTimes, replaceTimes] = useArray<[number, number]>([h1, h2])
  const [indexs, setIndexs, replaceIndexs] = useArray<[number, number]>([0, 0])
  const [mins, setMins] = useState(totalMins.slice())

  // 根据value值来取索引
  useEffect(() => {
    const [h, m] = parseTime(value)
    let hIndex = 0
    let mIndex = 0
    if (h >= h1 && h <= h2) {
      hIndex = hours.indexOf(h)
      // 分针位置
      if (h1 === h2) {
        if (h === h1 && m >= m1 && m <= m2) {
          mIndex = m - m1
        }
      } else if (h > h1 && h < h2) {
        mIndex = m
      } else if (h === h1) {
        mIndex = m >= m1 ? m - m1 : 0
      } else if (h === h2) {
        mIndex = m <= m2 ? m : 0
      }
    }
    replaceIndexs([hIndex, mIndex])
    replaceTimes([hours[hIndex], mins[mIndex]])
  }, [value])

  // 根据当前选择的小时来展示分钟区间
  useEffect(() => {
    const minsCopy = totalMins.slice()
    const activeHour = hours[indexs[0]]

    let shortened = false // 列表是否被裁剪

    // 选择了结束小时
    if (m2 !== 59 && hours[hours.length - 1] === activeHour) {
      minsCopy.splice(m2, 60 - m2)
      shortened = true
    }

    // 选择了初始小时
    if (m1 !== 0 && hours[0] === activeHour) {
      minsCopy.splice(0, m1)
      shortened = true
    }

    if (
      // 裁剪了
      shortened ||
      // 之前的长度不等于现在数组的长度
      preRef.current !== minsCopy.length ||
      // 之前被裁剪过
      preRef.current !== 60
    ) {
      // console.log('更新分针列表：' + indexs[1])
      preRef.current = minsCopy.length

      const mVal = mins[indexs[1]]
      let tmp: number
      if (!((tmp = minsCopy.indexOf(mVal)) > -1)) {
        tmp = 0
      }
      setIndexs(tmp, 1)
      setTimes(minsCopy[tmp], 1)
      setMins(minsCopy)
    }
  }, [indexs[0]])

  return (
    <BasePicker {...props} value={times.map(formatNum).join(':')}>
      <ScrollArea
        activeIndex={indexs[0]}
        range={hours}
        format={(v) => `${formatNum(v)}时`}
        onChange={(i) => {
          setIndexs(i, 0)
          setTimes(hours[i], 0)
        }}
      />
      <ScrollArea
        activeIndex={indexs[1]}
        range={mins}
        format={(v) => `${formatNum(v)}分`}
        onChange={(i) => {
          setIndexs(i, 1)
          setTimes(mins[i], 1)
        }}
      />
    </BasePicker>
  )
}

TimePicker.defaultProps = {
  start: '00:00',
  end: '23:59',
}
/**
 * TODO: 待支持
 * @component
 * 地址选择器
 */
function RegionPicker(): JSX.Element {
  return <BasePicker></BasePicker>
}

export { Picker as default, BasePicker, ScrollArea }
