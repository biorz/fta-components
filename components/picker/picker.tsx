import { ScrollView, Text, View } from '@tarojs/components'
import { PickerDateProps } from '@tarojs/components/types/Picker'
import classNames from 'classnames'
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
import '../../style/components/picker/index.scss'
import {
  Arrayable,
  FloatLayoutProps,
  PickerMode,
  PickerMultiSelectorProps,
  PickerProps,
  PickerRefMethods,
  PickerSelectorProps,
} from '../../types/picker'
import FloatLayout from '../action-sheet'
import {
  formatNum,
  genPeriodList,
  getAcitveIndex,
  getCurrentDate,
  getDaysCount,
  getScrollTopOverIndex,
  getSelectorDepth,
  parseDate,
} from './util'

type ScrollEvent = {
  detail: {
    scrollTop: number
    [key: string]: any
  }
}

const builtInModes: PickerMode[] = [
  'selector',
  /** 多列选择器 */
  'multiSelector',
  /** 时间选择器 */
  'time',
  /** 日期选择器 */
  'date',
  /** 省市区选择器 */
  'region',
]

function _ScrollArea(props: {
  onScroll?: (e: any) => void
  onChange?: (newIndex: number, oldIndex: number) => void
  activeIndex: number
  range: any[]
  format?: (value: any) => string | number
}): JSX.Element {
  const { onScroll, activeIndex, range, format, onChange } = props
  const activeIndexRef = useRef(+activeIndex >= 0 ? +activeIndex : 0)
  const [scrollTop, setScrollTop] = useState(getScrollTopOverIndex(activeIndex))

  useEffect(() => {
    activeIndexRef.current !== activeIndex && setScrollTop(getScrollTopOverIndex(activeIndex))
    // console.log(getScrollTopOverIndex(activeIndex), 'getScrollTopOverIndex(activeIndex)')
  }, [activeIndex])

  const _onScroll = (e: ScrollEvent) => {
    const scrollTop = e.detail.scrollTop

    let _activeIndex = getAcitveIndex(scrollTop, range.length)

    const _prevIndex = activeIndexRef.current
    if (_prevIndex !== _activeIndex) {
      onChange?.(_activeIndex, _prevIndex)
      activeIndexRef.current = _activeIndex
    }
    setScrollTop(scrollTop)
    onScroll?.(e.detail)
  }

  // const fixLocation = (isActive, index) => {
  //   if (!isActive) {
  //     const prev = activeIndexRef.current
  //     activeIndexRef.current = index
  //     // onChange?.(index, prev)
  //     setScrollTop(getScrollTopOverIndex(index))
  //   }
  // }

  return (
    <ScrollView
      // @ts-ignore
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      scrollY
      enhanced
      scrollWithAnimation
      className='fta-picker-block'
      scrollTop={scrollTop}
      onScroll={_onScroll}>
      {/* placeholder */}
      <View className='fta-picker-item--placeholder'>
        {/* scroll items */}
        {range.map((v, i) => {
          const _activeIndex = activeIndexRef.current
          const hitActive = _activeIndex === i
          // const hitAlmost = Math.abs(_activeIndex - i) === 1

          // TODO: 性能优化
          const itemClass = classNames('fta-picker-item', {
            'fta-picker-item--active': hitActive,
          })
          // const itemTextClass = classNames('fta-picker-item__text', {
          //   'fta-picker-item--active__text': hitActive,
          //   'fta-picker-item--almost__text': hitAlmost,
          // })
          const _value = format!(v)

          return (
            <View
              key={`${i}-${_value}`}
              className={itemClass}
              // onClick={() => fixLocation(hitActive, i)}
            >
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
      {/* placeholder */}
      {/* <View className='fta-picker-item--placeholder' /> */}
    </ScrollView>
  )
}

_ScrollArea.defaultProps = {
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
          methods!.hide()
        },
        onCancel() {
          onCancel?.(value!)
          methods!.hide()
        },
      }}
      {...extrapProps}>
      <View className='fta-picker'>
        {children}
        {/* 分割线 */}
        <View className='fta-picker-line fta-picker-line--top'></View>
        <View className='fta-picker-line fta-picker-line--bottom'></View>
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

type Compose<T> = T &
  FloatLayoutProps & {
    // onChange?: (newVal: number, oldVal: number) => void
    format?: (value: any) => string | number
  }
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
      {range.map((column: unknown[], index: number) => {
        const _format = format || createDefaultFormat(rangeKey)
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

/**
 * @component
 * 日期选择器
 */
const months = genPeriodList(1, 12)
const days = genPeriodList(1, 31)

// const restrict =
function DatePicker(props: Compose<PickerDateProps>): JSX.Element {
  const { start, end, value, onChange, format, fields } = props
  const depth = getSelectorDepth(fields!)
  const [y1, m1, d1] = parseDate(start!)
  const [y2, m2, d2] = parseDate(end!)

  const [indexs, _setIndexs] = useState([0, 0, 0])
  const setIndexs = (value: number, depth: number) => {
    const copy = indexs.slice()
    copy[depth] = value
    console.log('indexs', copy, indexs)
    _setIndexs(copy)
  }

  const nowDates = parseDate(value!)
  const dateRef = useRef(nowDates).current
  const [y, m, d] = dateRef
  const years = useRef(genPeriodList(y1, y2)).current

  let MonthElement: ReactNode = null
  let DayElement: ReactNode = null
  const yIndex = years.indexOf(y)
  // 年份
  const YearElement = (
    <ScrollArea
      activeIndex={yIndex}
      range={years}
      format={(v) => `${v}年`}
      onChange={(i) => {
        dateRef[0] = years[i]
        setIndexs(i, 0)
      }}
    />
  )
  // console.log('rerender')
  // 月份
  if (depth > 1) {
    const _months = months.slice()
    if (
      // 起始月份不是从第一天开始
      m1 !== 1 &&
      // 当前位于起始年份
      dateRef[0] === y1
    ) {
      _months.splice(0, m1 - 1)
    }
    let i
    let mActiveIndex = (i = _months.indexOf(m)) === -1 ? 0 : i
    // console.log('mActiveIndex', mActiveIndex)
    MonthElement = (
      <ScrollArea
        activeIndex={mActiveIndex}
        range={_months}
        format={(v) => `${v}月`}
        onChange={(i) => {
          console.log('m change')
          dateRef[1] = _months[i]
          setIndexs(i, 1)
        }}
      />
    )

    // 日期
    if (depth > 2) {
      const count = getDaysCount(y, m)

      const _days = days.slice(0, count)
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
        (i = _days.indexOf(d)) === -1 ? (i >= _days.length ? _days.length - 1 : 0) : i
      console.log('当前月份天数', count, dActiveIndex, d, 'index:' + i, JSON.stringify(_days))
      DayElement = (
        <ScrollArea
          activeIndex={dActiveIndex}
          range={_days}
          format={(v) => `${v}日`}
          onChange={(i) => {
            console.log('d changed index:' + i, 'value:' + _days[i])
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
}

/**
 * @component
 * 时间选择器
 */
function TimePicker(): JSX.Element {
  return <BasePicker />
}

/**
 * TODO: 待支持
 * @component
 * 地址选择器
 */
function RegionPicker(): JSX.Element {
  return <BasePicker />
}

export { Picker as default, SelectorPicker, MultiSelectorPicker, DatePicker, TimePicker }
