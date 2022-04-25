import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import '../../style/components/picker/index.scss'
import { ActionSheetProps, CustomTitle } from '../../types/action-sheet'
import { Arrayable, PickerMode, PickerProps, PickerSelectorProps } from '../../types/picker'
import FloatLayout from '../action-sheet'

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

/** 获取当前激活的索引 */
const getAcitveIndex = (scrollTop: number) => {
  if (scrollTop < 25) return 0
  if (scrollTop < 25 + 33 - 10) return 1
  if (scrollTop < 25 + 33 + 10) return 2
  return Math.round((scrollTop - (25 + 33 + 15)) / 20) + 3
}

/** 根据索引获得当前位置 */
const getScrollTopOverIndex = (index: number) => {
  if (index === 0) return 0
  if (index === 1) return 33
  return 33 + 20 * (index - 1)
}

const range = new Array(20).fill(0).map((v, i) => 2010 + i)

function _ScrollArea(props: {
  onScroll?: (e: any) => void
  onChange?: (newIndex: number, oldIndex: number) => void
  activeIndex: number
  range: any[]
  format?: (value: any) => string | number
}): JSX.Element {
  const { onScroll, activeIndex, range, format, onChange } = props
  const activeIndexRef = useRef(+activeIndex >= 0 ? +activeIndex : 0)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    setScrollTop(getScrollTopOverIndex(activeIndex))
  }, [])

  const _onScroll = (e: ScrollEvent) => {
    const scrollTop = e.detail.scrollTop
    setScrollTop(scrollTop)
    onScroll?.(e.detail)
    const _activeIndex = getAcitveIndex(scrollTop)
    const _prevIndex = activeIndexRef.current
    if (_prevIndex !== _activeIndex) {
      onChange?.(_activeIndex, _prevIndex)
      activeIndexRef.current = _activeIndex
    }
  }

  return (
    <ScrollView
      // @ts-ignore
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      scrollY
      scrollWithAnimation={false}
      className='fta-picker-block'
      scrollTop={scrollTop}
      onScroll={_onScroll}>
      {/* placeholder */}
      <View className='fta-picker-item--placeholder' />
      {/* scroll items */}
      {range.map((v, i) => {
        const _activeIndex = activeIndexRef.current
        const hitActive = _activeIndex === i
        const hitAlmost = Math.abs(_activeIndex - i) === 1

        const itemClass = classNames('fta-picker-item', {
          'fta-picker-item--active': hitActive,
          'fta-picker-item--almost': hitAlmost,
        })
        const itemTextClass = classNames('fta-picker-item__text', {
          'fta-picker-item--active__text': hitActive,
          'fta-picker-item--almost__text': hitAlmost,
        })

        return (
          <View key={i} className={itemClass}>
            <Text
              // @ts-ignore
              numberOfLines={1}
              className={itemTextClass}>
              {format!(v)}
            </Text>
          </View>
        )
      })}
      {/* placeholder */}
      <View className='fta-picker-item--placeholder' />
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
function BasePicker(props: ActionSheetProps): JSX.Element {
  const { isOpened, children, title, ...extrapProps } = props
  return (
    <FloatLayout
      isOpened={isOpened}
      title={{
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm() {
          console.log('点击了确定')
        },
        onCancel() {},
        ...(title as CustomTitle),
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

/** Picker */
function Picker(props: Partial<PickerProps>): JSX.Element {
  const { mode } = props
  const _mode: PickerMode = builtInModes.includes(mode!) ? mode! : 'selector'
  const TypedPicker = pickerMap[_mode] as FC
  return <TypedPicker {...props} />
}

const pickerDefaultProps: PickerProps = {
  mode: 'selector',
  range: [],
  onChange() {},
  isOpened: true,
}

Picker.defaultProps = pickerDefaultProps

type singleFormat = (value: any) => string | number

type Compose<T> = T &
  ActionSheetProps & {
    onChange?: (newVal: number, oldVal: number) => void
    format?: Arrayable<singleFormat>
  }

function SelectorPicker(props: Compose<PickerSelectorProps>): JSX.Element {
  const { range, rangeKey, value, onChange, format } = props
  const _format = format || (rangeKey ? (item: object) => item[rangeKey] : void 0)
  return (
    <BasePicker {...props}>
      <ScrollArea
        format={_format as singleFormat}
        range={range}
        activeIndex={value!}
        onChange={onChange}
      />
    </BasePicker>
  )
}

function MultiSelectorPicker(): JSX.Element {
  return <BasePicker />
}

function DatePicker(): JSX.Element {
  return <BasePicker />
}

function TimePicker(): JSX.Element {
  return <BasePicker />
}

// TODO: 待支持
function RegionPicker(): JSX.Element {
  return <BasePicker />
}

export { Picker as default }
