import { Image, Input, ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { px } from '../../common'
import '../../style/components/selector/index.scss'
import { FieldNames, Option, ScrollAreaProps, SelectorProps } from '../../types/selector'
import { Provider } from './context'
import {
  getDefaultActiveItemClass,
  getDefaultActiveItemTextClass,
  getDefaultColClass,
  getDefaultItemClass,
  getDefaultItemTextClass,
} from './shared'
import { CHECKED, UNCHECKED } from './static'

function tail(options: Option[], depth: number, current: number, valueKey: string) {
  try {
    if (depth === current) {
      return options[0][valueKey as 'value']
    }
    return tail(options[0].children!, depth, current + 1, valueKey)
  } catch (error) {
    return null
  }
}

function CountDot(props: { children: string | number }) {
  return (
    <View className='fta-selector-count'>
      <Text className='fta-selector-count__text'>{props.children}</Text>
    </View>
  )
}

function initValue({
  options,
  fieldNames,
  depth,
}: {
  options: Option[]
  fieldNames: FieldNames
  depth: number
}) {
  const { value } = fieldNames
  return tail(options!, depth, 1, value)
}

function ScrollArea(props: ScrollAreaProps) {
  const {
    showCount,
    className,
    style,
    options,
    itemHeight,
    fieldNames,
    multiple,
    limit,
    suffixIcon,
    activeSuffixIcon,
    itemClassName,
    activeItemClassName,
    acitveItemStyle,
    itemStyle,
    _index,
    _end,
  } = props
  const depth = _index! + 1
  const [activeIndex, setActiveIndex] = useState(multiple && _end ? [] : 0)
  const builtInClass = getDefaultColClass(depth)
  const rootClass = classNames('fta-selector-scrollarea', builtInClass, className)
  const itemClass = getDefaultItemClass(depth)
  const itemActiveClass = getDefaultActiveItemClass(depth)
  const textClass = getDefaultItemTextClass(depth)
  const textActiveClass = getDefaultActiveItemTextClass(depth)
  const onSelect = (idx) => {
    setActiveIndex(idx)
  }

  const scrollTop = (activeIndex > 0 ? activeIndex - 1 : 0) * itemHeight!
  return (
    <View className={rootClass} style={style}>
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        // @ts-ignore
        showsVerticalScrollIndicator={false}>
        {(options || [])!.map((opt, i) => {
          const active = i === activeIndex
          const itemCls = classNames(
            itemClass,
            itemClassName,
            active && itemActiveClass,
            active && activeItemClassName
          )

          const itemStyl = {
            ...itemStyle,
            ...(active ? acitveItemStyle : {}),
            height: px(itemHeight!),
          }
          return (
            <View className={itemCls} style={itemStyl} key={i} onClick={() => onSelect(i)}>
              <Text className={classNames(textClass, active && textActiveClass)}>
                {opt[fieldNames!.label]}
              </Text>
              <View>
                {_end ? (
                  suffixIcon ? (
                    <Image
                      className='fta-selector-suffix'
                      src={active ? (activeSuffixIcon as string) : suffixIcon}
                    />
                  ) : null
                ) : active && showCount ? (
                  <CountDot>1</CountDot>
                ) : null}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const Selector = forwardRef(function _Selector(props: SelectorProps, ref: Ref<any>) {
  const {
    depth,
    options,
    itemHeight,
    fieldNames,
    columnClassName,
    columnStyle,
    className,
    showSearch,
    placeholder,
    // @ts-ignore
    style,
    limit,
    multiple,
    customStyle,
    containerClassName,
    containerStyle,
    value = multiple ? [] : initValue({ options, depth: depth!, fieldNames: fieldNames! }),
    ...extraProps
  } = props
  // 多选是否要聚焦，单选
  const [selected, setSelected] = useState(value)

  // 锚定目标
  const anchor = () => {
    // 深度遍历，找到为止
  }

  useEffect(() => {
    if (value != null) {
    }
  }, [value])

  const _loops = useRef(new Array(depth).fill(0)).current

  const rootClass = classNames('fta-selector', className)
  const rootStyle = Object.assign({}, style, customStyle)
  const containerClass = classNames('fta-selector-container', containerClassName)

  // TODO:
  useImperativeHandle(ref, () => ({}))

  return (
    <Provider value={{ itemHeight }}>
      <View className={rootClass} style={rootStyle}>
        {showSearch ? <Input placeholder={placeholder} /> : null}
        <View className={containerClass} style={containerStyle}>
          {_loops.map((_, i) => {
            const colClass = columnClassName?.(i + 1)
            const colStyle = columnStyle?.(i + 1)
            return (
              // @ts-ignore
              <ScrollArea
                fieldNames={fieldNames}
                itemHeight={itemHeight}
                options={options}
                className={colClass}
                style={colStyle}
                multiple={multiple}
                limit={limit}
                {...extraProps}
                key={i}
                // @private
                _index={i}
                _end={i + 1 === _loops.length}
              />
            )
          })}
        </View>
      </View>
    </Provider>
  )
})

function useSelector(initialProps: SelectorProps, deps = [] as any[]) {
  const ref = useRef()
  return [ref, useMemo(() => <Selector {...initialProps} ref={ref} />, deps)] as const
}

const defaultProps: SelectorProps = {
  depth: 3,
  limit: 3,
  itemHeight: 46,
  multiple: false,
  showSearch: false,
  showCount: false,
  options: [],
  placeholder: '支持按城市、区县名称搜索',
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children',
  },
  suffixIcon: UNCHECKED,
  activeSuffixIcon: CHECKED,
}

Selector.defaultProps = defaultProps

export { Selector as default, useSelector }
