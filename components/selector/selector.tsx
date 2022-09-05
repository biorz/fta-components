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
import { FieldNames, IndexLeaf, Option, ScrollAreaProps, SelectorProps } from '../../types/selector'
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

const deepCopy = (record: Record<string, any>) => JSON.parse(JSON.stringify(record))

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
    counts,
    showCount,
    className,
    style,
    options,
    itemHeight,
    fieldNames,
    multiple,
    activeIndex,
    seletedIndexes = [],
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

  const onSelect = (idx: number) => {
    onChange!(idx, _index!, multiple! && seletedIndexes.includes(idx))
    // if (idx !== activeIndex) {
    //   onChange!(idx, _index!)
    // }
  }

  // FIXME: 只有最后一列才能取消

  // 判断当前索引是否是激活状态
  const isActive = multiple
    ? (i: number) => seletedIndexes.includes(i) || i === activeIndex
    : (i: number) => i === activeIndex
  // TODO: 选择时滚动定位
  const scrollTop =
    autoHeight || multiple ? undefined : (activeIndex! > 0 ? activeIndex! - 1 : 0) * itemHeight!
  return (
    <View className={rootClass} style={style}>
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        // @ts-ignore
        showsVerticalScrollIndicator={false}>
        {(options || [])!.map((opt, i) => {
          const active = isActive(i)
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
                ) : multiple && showCount && counts![i] ? (
                  <CountDot theme={theme}>{counts![i] as number}</CountDot>
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

const parseLeafFromIndex = (indexes: number[]) => {
  const map = {}
  let tmp = map
  indexes.forEach((i) => {
    tmp = tmp[i] = {}
  })
  return map
}

const getSelectedCounts = (leaf: IndexLeaf, depth: number, counterRef = { current: 0 }) => {
  const keys = Object.keys(leaf)
  if (depth === 1) {
    console.log('keys', keys)
    counterRef.current += keys.length
  } else {
    keys.forEach((k) => {
      if (leaf[k]) {
        getSelectedCounts(leaf[k], depth - 1, counterRef)
      }
    })
  }

  return counterRef.current
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
    onExceed,
    value = multiple ? [] : initValue({ options, depth: depth!, fieldNames: fieldNames! }),
    ...extraProps
  } = props

  const [activeIndexes, setActiveIndexes] = useState(new Array(depth).fill(0))
  const [selected, setSelected] = useState<IndexLeaf>(parseLeafFromIndex(activeIndexes))
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

  const getWillSelected = (indexes: number[]) => {
    const selectedCopy = deepCopy(selected)
    let current = selectedCopy
    let tmp: any
    for (const i of indexes) {
      const node = current[i]
      if (!node) {
        tmp = {}
        current[i] = tmp
        current = tmp
      } else {
        current = node
      }
    }
    return selectedCopy
  }

  // // 勾选节点
  // const check = (indexes: number[]) => {
  //   // console.log('选中节点', indexes)
  //   const selectedCopy = getWillSelected(indexes)
  //   setSelected(selectedCopy)
  // }

  // 取消选中的节点
  const uncheck = (indexes: number[]) => {
    const selectedCopy = { ...selected }
    const prevs = indexes.slice(0, -1)
    const end = indexes.slice(-1)[0]
    const endMap = prevs.reduce((prev, cur) => prev[cur], selectedCopy)
    delete endMap![end]
    setSelected(selectedCopy)
  }

  const onSelectChange = (index: number, cursor: number, cancel: boolean) => {
    const copy = activeIndexes.slice()
    // 多选模式
    if (multiple) {
      if (copy[cursor] === index) {
        // 取消勾选
        if (cancel) {
          copy[cursor] = -1
          // 将勾选项目从selectedIndexes移出
          uncheck(copy.slice(0, -1).concat([index]))
        }
      } else {
        copy[cursor] = index
        // 成功勾选
        // 如果是最后一项， 加入此项，如果没有则创建索引数组
        console.log('will check')
        if (depth === cursor + 1) {
          // 判断是否超出🚫
          const willChecked = getWillSelected(copy)
          console.log('willchecked', willChecked)
          const counts = getSelectedCounts(willChecked, depth!)
          if (counts > limit!) {
            console.log('exceed')
            return onExceed?.()
          } else {
            setSelected(willChecked)
          }
        }
      }
    } else {
      // 单选模式，如果已经激活则直接return
      if (copy[cursor] === index) return
      copy[cursor] = index
    }
    setActiveIndexes(copy)
  }

  // TODO:
  useImperativeHandle(ref, () => ({}))

  let tmpOpts: typeof options
  let tmpIndexes: number[]
  let tmpLeaf: IndexLeaf = selected
  // let tmpCount = 0
  // 解析每一列该展示的选项列表
  let tmpCounts: {
    [key: number]: undefined | null | number
  }
  const resolveOpts = (cursor: number) => {
    const active = activeIndexes[cursor - 1]
    tmpOpts = cursor ? tmpOpts[active]?.[fieldNames!.children] || [] : options
    tmpLeaf = (cursor ? tmpLeaf[active] : tmpLeaf) || ({} as IndexLeaf)
    tmpIndexes = Object.keys(tmpLeaf).map(Number)
    tmpCounts = tmpIndexes.reduce((prev, cur) => {
      const leaf = (tmpLeaf[cur] || {}) as IndexLeaf
      prev[cur] = Object.keys(leaf).length
      return prev
    }, {})
  }

  return (
    <Provider value={{ itemHeight }}>
      <View className={rootClass} style={rootStyle}>
        {showSearch ? <Input placeholder={placeholder} /> : null}
        <View className={containerClass} style={containerStyle}>
          {_loops.map((_, i) => {
            const colClass = columnClassName?.(i + 1)
            const colStyle = columnStyle?.(i + 1)
            const activeIndex = activeIndexes[i]
            resolveOpts(i)
            return (
              // @ts-ignore
              <ScrollArea
                activeIndex={activeIndex}
                seletedIndexes={tmpIndexes}
                fieldNames={fieldNames}
                itemHeight={itemHeight}
                options={tmpOpts}
                className={colClass}
                theme={theme}
                style={colStyle}
                multiple={multiple}
                autoHeight={autoHeight}
                limit={limit}
                counts={tmpCounts}
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
