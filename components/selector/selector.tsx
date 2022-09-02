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
import { CHECK } from './static'

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
/**
 * @component
 * 计数小红点
 */
function CountDot(props: { children: string | number; theme?: string }) {
  return (
    <View
      className='fta-selector-count'
      style={props.theme ? { backgroundColor: props.theme } : void 0}>
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
    activeIndex,
    limit,
    theme,
    suffixIcon,
    autoHeight,
    activeSuffixIcon,
    itemClassName,
    activeItemClassName,
    itemStyle,
    activeItemStyle,
    onChange,
    _index,
    _end,
  } = props

  const depth = _index! + 1
  // const [activeIndex, setActiveIndex] = useState(multiple && _end ? [] : 0)
  const builtInClass = getDefaultColClass(depth)
  const rootClass = classNames('fta-selector-scrollarea', builtInClass, className)
  const itemClass = getDefaultItemClass(depth)
  const itemActiveClass = getDefaultActiveItemClass(depth)
  const textClass = getDefaultItemTextClass(depth)
  const textActiveClass = getDefaultActiveItemTextClass(depth)

  const onSelect = (idx) => {
    if (idx !== activeIndex) {
      onChange!(idx, _index!)
    }
  }

  const scrollTop = autoHeight ? undefined : (activeIndex! > 0 ? activeIndex! - 1 : 0) * itemHeight!
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

          const [themeStyle, themeBgStyle] =
            theme && active ? [{ color: theme }, { backgroundColor: theme }] : [{}, {}]

          const heightStyle = autoHeight ? {} : { height: px(itemHeight!), minHeight: 'auto' }

          const itemStyl = {
            ...heightStyle,
            ...itemStyle,
            ...(active ? activeItemStyle : {}),
          }

          return (
            <View className={itemCls} style={itemStyl} key={i} onClick={() => onSelect(i)}>
              <Text className={classNames(textClass, active && textActiveClass)} style={themeStyle}>
                {opt[fieldNames!.label]}
              </Text>
              <View>
                {_end ? (
                  (active ? activeSuffixIcon : suffixIcon) || (
                    <View
                      className={`fta-selector-suffix${
                        active ? ' fta-selector-suffix--active' : ''
                      }`}
                      style={themeBgStyle}>
                      <Image className='fta-selector-suffix__icon' src={CHECK} />
                    </View>
                  )
                ) : multiple && active && showCount ? (
                  <CountDot theme={theme}>1</CountDot>
                ) : null}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

ScrollArea.defaultProps = {
  activeIndex: 0,
  onChange() {},
}

const Selector = forwardRef(function _Selector(props: SelectorProps, ref: Ref<any>) {
  const {
    depth,
    options,
    itemHeight,
    fieldNames,
    showSearch,
    theme,
    placeholder,
    columnClassName,
    columnStyle,
    className,
    // @ts-ignore
    style,
    limit,
    multiple,
    autoHeight,
    customStyle,
    containerClassName,
    containerStyle,
    value = multiple ? [] : initValue({ options, depth: depth!, fieldNames: fieldNames! }),
    ...extraProps
  } = props
  // 多选是否要聚焦，单选
  // const [selected, setSelected] = useState(value)

  const [activeIndexes, setActiveIndexes] = useState(new Array(depth).fill(0))

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

  const onSelectChange = (index: number, depth: number) => {
    const copy = activeIndexes.slice()
    copy[depth] = index
    setActiveIndexes(copy)
  }

  // TODO:
  useImperativeHandle(ref, () => ({}))

  let tmpOpts: typeof options

  return (
    <Provider value={{ itemHeight }}>
      <View className={rootClass} style={rootStyle}>
        {showSearch ? <Input placeholder={placeholder} /> : null}
        <View className={containerClass} style={containerStyle}>
          {_loops.map((_, i) => {
            const colClass = columnClassName?.(i + 1)
            const colStyle = columnStyle?.(i + 1)
            tmpOpts = i ? tmpOpts[activeIndexes[i - 1]]?.[fieldNames!.children] || [] : options
            return (
              // @ts-ignore
              <ScrollArea
                activeIndex={activeIndexes[i]}
                fieldNames={fieldNames}
                itemHeight={itemHeight}
                options={tmpOpts}
                className={colClass}
                theme={theme}
                style={colStyle}
                multiple={multiple}
                autoHeight={autoHeight}
                limit={limit}
                {...extraProps}
                key={i}
                onChange={onSelectChange}
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
  showCount: true,
  autoHeight: false,
  options: [],
  placeholder: '支持按城市、区县名称搜索',
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children',
  },
}

Selector.defaultProps = defaultProps

export { Selector as default, useSelector }
