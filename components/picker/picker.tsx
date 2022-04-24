import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { FC, memo, useRef, useState } from 'react'
import '../../style/components/picker/index.scss'
import { PickerMode, PickerProps } from '../../types/picker'
import FloatLayout from '../action-sheet'

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

const pickerMap: Record<PickerMode, FC<PickerProps>> = {
  selector: SelectorPicker,
  multiSelector: MultiSelectorPicker,
  time: TimePicker,
  date: DatePicker,
  region: RegionPicker,
}

function BasePicker(props: PickerProps): JSX.Element {
  return (
    <FloatLayout
      isOpened={true}
      title={{
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
      }}>
      <View className='fta-picker'>
        <ScrollArea
          range={range}
          activeIndex={1}
          format={(v) => `${v}年`}
          onChange={(newIndex, oldIndex) => {
            console.log('onChange', newIndex, oldIndex)
          }}
        />
        {/* 分割线 */}
        <View className='fta-picker-line fta-picker-line--top'></View>
        <View className='fta-picker-line fta-picker-line--bottom'></View>
      </View>
    </FloatLayout>
  )
}

function _ScrollArea(props: {
  onScroll?: (e: any) => void
  onChange?: (newIndex: number, oldIndex: number) => void
  activeIndex: number
  range: any[]
  format?: (value: any) => string | number
}): JSX.Element {
  const { onScroll, activeIndex, range, format, onChange } = props
  const activeIndexRef = useRef(activeIndex)
  const [scrollTop, setScrollTop] = useState(getScrollTopOverIndex(activeIndex))

  const _onScroll = (e) => {
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
  format: (v) => v,
}

const ScrollArea = memo(_ScrollArea)

function Picker(props: PickerProps): JSX.Element {
  const { mode, ...extraProps } = props
  const _mode: PickerMode = builtInModes.includes(mode!) ? mode! : 'selector'
  const RealPicker = pickerMap[_mode]
  return <RealPicker mode={_mode} {...extraProps} />
}

const pickerDefaultProps: PickerProps = {
  mode: 'selector',
  range: [],
  onChange() {},
  itemHeight: 40,
}

Picker.defaultProps = pickerDefaultProps

function SelectorPicker(): JSX.Element {
  return <BasePicker />
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

export { BasePicker as default }
