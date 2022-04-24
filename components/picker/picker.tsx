import { ScrollView, Text, View } from '@tarojs/components'
import React, { FC } from 'react'
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

const pickerMap: Record<PickerMode, FC<PickerProps>> = {
  selector: SelectorPicker,
  multiSelector: MultiSelectorPicker,
  time: TimePicker,
  date: DatePicker,
  region: RegionPicker,
}

function BasePicker(props: PickerProps): JSX.Element {
  const { itemHeight = 40 } = props
  return (
    <FloatLayout
      isOpened
      title={{
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
      }}>
      <View className='fta-picker'>
        {new Array(3).fill(0).map((v, i) => (
          <ScrollView key={i} className='fta-picker-scrollview fta-picker-item-block'>
            <View className='fta-picker-item'>
              <Text className='fta-picker-item__text'>2018年</Text>
            </View>
            {/* almost */}
            <View className='fta-picker-item fta-picker-item--almost'>
              <Text className='fta-picker-item__text fta-picker-item--almost__text'>2019年</Text>
            </View>
            {/* active */}
            <View className='fta-picker-item fta-picker-item--active'>
              <Text className='fta-picker-item__text fta-picker-item--active__text'>2020年</Text>
            </View>
            {/* almost */}
            <View className='fta-picker-item fta-picker-item--almost'>
              <Text className='fta-picker-item__text fta-picker-item--almost__text'>2021年</Text>
            </View>

            <View className='fta-picker-item'>
              <Text className='fta-picker-item__text'>2022年</Text>
            </View>

            <View className='fta-picker-item'>
              <Text className='fta-picker-item__text'>2023年</Text>
            </View>

            <View className='fta-picker-item'>
              <Text className='fta-picker-item__text'>2024年</Text>
            </View>

            <View className='fta-picker-item'>
              <Text className='fta-picker-item__text'>2025年</Text>
            </View>
            {/* 分割线 */}
          </ScrollView>
        ))}

        <View className='fta-picker-line fta-picker-line--top'></View>
        <View className='fta-picker-line fta-picker-line--bottom'></View>
      </View>
    </FloatLayout>
  )
}

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
