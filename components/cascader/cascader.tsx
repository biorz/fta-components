import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { CascaderProps, Option } from '../../types/cascader'
import { PickerRefMethods } from '../../types/picker'
import { BasePicker, ScrollArea } from '../picker'

function parsevValueAndOptions(
  value: CascaderProps['value'],
  options: CascaderProps['options'],
  depth: number,
  index: number,
  collections: {
    value: any[]
    indexs: any[]
    ranges: any[]
  }
) {
  let v = value![index] // 选中值
  let i = 0 // 选中索引
  // 找不到给定的值，则默认聚焦第一个值
  if (v == null || (i = options.findIndex((_) => _.value === v)) === -1) {
    v = options[0].value
    i = i === -1 ? 0 : i
  }
  value![index] = v
  // 开始收集信息
  collections.value.push(v)
  collections.indexs.push(i)
  collections.ranges.push(options.map(({ label, value }) => (label == null ? value : label)))

  if (++index === depth) return collections
  return parsevValueAndOptions(value, options[i].children || [], depth, index, collections)
}

/** 根据前面的索引取得当前需要渲染的数组 */
function getRangesAndValuesOverIndexs(indexs: number[], options: CascaderProps['options']) {
  const tmpList: any[][] = []
  const values: CascaderProps['value'] = []
  let tmp = options
  const len = indexs.length
  indexs.forEach((v, i) => {
    values.push(tmp[v].value)
    tmpList.push(tmp.map(({ label, value }) => (label == null ? value : label)))
    if (i + 1 < len) {
      tmp = tmp[v]?.children || ([] as Option[])
    }
  })
  return { ranges: tmpList, values }
}

/** 获取级联选择的深度 */
function getDepth(options: CascaderProps['options']) {
  let depth = 0
  let tmp: Option | undefined = options[0]
  while (tmp) {
    depth++
    tmp = tmp.children?.[0]
  }
  return depth
}

const Cascader = forwardRef(function Cascader(
  props: CascaderProps,
  ref: Ref<PickerRefMethods>
): JSX.Element {
  const { value, options, onChange, onConfirm, depth, ...extraProps } = props
  const _depth = useRef(depth || getDepth(options)).current
  const emptys = useRef(new Array(_depth).fill(0)).current
  const [indexs, setIndexs] = useState(emptys)
  const [values, setValues] = useState(value)
  const [ranges, setRanges] = useState(emptys.map(() => [] as any[]))
  const [visible, toggle] = useState(false)
  const startTimestamp = useRef(+new Date()).current

  const methods = {
    show() {
      toggle(true)
    },
    hide() {
      toggle(false)
    },
  }

  useImperativeHandle(ref, () => methods)
  // 将第一次排除掉, 可能会执行多次
  const _onChange = (newIndex: number, index: number) => {
    if (+new Date() - startTimestamp < 1000) return
    const icopy = indexs.slice()
    if (index + 1 < _depth) {
      for (let i = index + 1; i < _depth; i++) {
        // 重置后面的索引
        icopy[i] = 0
      }
    }
    icopy[index] = newIndex
    // 重置后面的选项
    const { ranges, values } = getRangesAndValuesOverIndexs(icopy, options)
    setValues(values)
    setRanges(ranges)
    setIndexs(icopy)
  }

  useEffect(() => {
    const arrayValue = Array.isArray(value) ? value : [] // 容错
    const collections = parsevValueAndOptions(arrayValue, options, _depth, 0, {
      indexs: [],
      value: [],
      ranges: [],
    })
    setValues(collections.values)
    setRanges(collections.ranges)
    setIndexs(collections.indexs)
    // console.log(collections.indexs, 'collections.indexs')
    // console.log('ranges', collections.ranges)
    // 处理默认值和选项
  }, [value])

  // useEffect(() => {
  //   console.log(indexs, 'indexs')
  // }, [indexs])

  return (
    <BasePicker
      {...extraProps}
      methods={methods}
      isOpened={visible}
      onClose={methods.hide}
      // @ts-ignore
      value={values}>
      {emptys.map((_, i) => (
        <ScrollArea
          activeIndex={indexs[i]}
          range={ranges[i] || []}
          key={i}
          onChange={(newIndex) => _onChange(newIndex, i)}></ScrollArea>
      ))}
    </BasePicker>
  )
})

const defaultProps: CascaderProps = {
  options: [],
  value: [],
  depth: 0,
}

Cascader.defaultProps = defaultProps

export default Cascader
