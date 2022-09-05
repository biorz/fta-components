import { Image, Input, ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { px, useCareClass, useCareMode } from '../../common'
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
  const rootClass = useCareClass.single('fta-selector-count')
  const textClass = useCareClass.single('fta-selector-count__text')
  return (
    <View className={rootClass} style={props.theme ? { backgroundColor: props.theme } : void 0}>
      <Text className={textClass}>{props.children}</Text>
    </View>
  )
}

const deepCopy = (record: Record<string, any>) => JSON.parse(JSON.stringify(record))

const formatCount = (record: Record<string, any>) => {
  const { parent, total, ...rest } = record
  const rect = Object.keys(rest).reduce((prev, cur) => {
    prev[cur] = rest[cur].total
    return prev
  }, {})
  return rect
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
    // limit,
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
  const careMode = useCareMode()
  // const [activeIndex, setActiveIndex] = useState(multiple && _end ? [] : 0)
  const builtInClass = getDefaultColClass(depth)
  const rootClass = classNames('fta-selector-scrollarea', builtInClass, className)
  const itemClass = getDefaultItemClass(depth, careMode)
  const itemActiveClass = getDefaultActiveItemClass(depth)
  const textClass = getDefaultItemTextClass(depth, careMode)
  const textActiveClass = getDefaultActiveItemTextClass(depth)

  const onSelect = (idx: number) => {
    onChange!(idx, _index!, multiple! && _end! && seletedIndexes.includes(idx))
  }

  // FIXME: 只有最后一列才能取消

  // 判断当前索引是否是激活状态
  const isActive =
    _end && multiple ? (i: number) => seletedIndexes.includes(i) : (i: number) => i === activeIndex

  // TODO: 选择时滚动定位
  const scrollTop =
    autoHeight || multiple ? undefined : (activeIndex! > 0 ? activeIndex! - 1 : 0) * itemHeight!

  const itemStaticClass = classNames(
    itemClass,
    itemClassName,
    autoHeight && `fta-selector-item--auto ${careMode ? 'fta-selector-item--auto--care' : ''}`
  )

  const textStaticClass = classNames(
    textClass,
    autoHeight && `fta-selector-text--auto ${careMode ? 'fta-selector-text--auto--care' : ''}`
  )

  const iconClass = useCareClass.single('fta-selector-suffix__icon')

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
            itemStaticClass,
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
              <Text
                className={classNames(textStaticClass, active && textActiveClass)}
                style={themeStyle}>
                {opt[fieldNames!.label]}
              </Text>
              <View>
                {_end ? (
                  (active ? activeSuffixIcon : suffixIcon) || (
                    <View
                      className={`fta-selector-suffix${
                        active ? ' fta-selector-suffix--active' : ''
                      }${careMode ? ' fta-selector-suffix--care' : ''}`}
                      style={themeBgStyle}>
                      <Image className={iconClass} src={CHECK} />
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
/** 计算已选数量 */
const calcSelectedCounts = (leaf: IndexLeaf, depth: number, counterRef = { current: 0 }) => {
  const keys = Object.keys(leaf)
  if (depth === 1) {
    counterRef.current += keys.length
  } else {
    keys.forEach((k) => {
      if (leaf[k]) {
        calcSelectedCounts(leaf[k], depth - 1, counterRef)
      }
    })
  }
  return counterRef.current
}

/** 解析子项数量 */
const resolveCounts = (
  leaf: IndexLeaf,
  depth: number,
  counter = Object.keys(leaf).reduce(
    (prev, cur) => {
      prev[cur] = {
        total: 0,
      }
      return prev
    },
    { total: 0, parent: null as any }
  ),
  _index = 0,
  parent = counter
) => {
  const keys = Object.keys(leaf)
  if (depth === 1) {
    parent.total = keys.length
    let p = parent
    while ((p = p.parent)) {
      p.total += parent.total
    }
  } else {
    keys.forEach((k) => {
      if (leaf[k]) {
        resolveCounts(leaf[k], depth - 1, counter, +k, (parent[k] = { total: 0, parent }))
      }
    })
  }

  return counter
}

/**  获取即将被选中的树结构 */
const getWillSelected = (indexes: number[], selected: IndexLeaf) => {
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

  const _loops = useRef(new Array(depth).fill(0)).current

  const rootClass = classNames('fta-selector', className)
  const rootStyle = Object.assign({}, style, customStyle)
  const containerClass = classNames('fta-selector-container', containerClassName)

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
      // 取消勾选

      if (cancel) {
        copy[cursor] = -1
        // 将勾选项目从selectedIndexes移出
        uncheck(copy.slice(0, -1).concat([index]))
      } else {
        copy[cursor] = index
        for (let i = cursor + 1; i < copy.length; i++) {
          // TODO:
          if (i + 1 === copy.length) {
            copy[i] = -1
          } else {
            copy[i] = 0
          }
        }
        // 成功勾选
        // 如果是最后一项， 加入此项，如果没有则创建索引数组
        if (depth === cursor + 1) {
          // 判断是否超出🚫
          const willChecked = getWillSelected(copy, selected)
          const counts = calcSelectedCounts(willChecked, depth!)
          if (counts > limit!) {
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
      for (let i = cursor + 1; i < copy.length; i++) {
        copy[i] = 0
      }
    }
    setActiveIndexes(copy)
  }

  // TODO:
  useImperativeHandle(ref, () => ({}))

  const counts = resolveCounts(selected, depth!)

  let tmpOpts: typeof options
  let tmpIndexes: number[]
  let tmpLeaf: IndexLeaf = selected
  // let tmpCount = 0
  // 解析每一列该展示的选项列表
  let tmpCounts = counts
  const resolveOpts = (cursor: number) => {
    const active = activeIndexes[cursor - 1]
    tmpOpts = cursor ? tmpOpts[active]?.[fieldNames!.children] || [] : options
    tmpLeaf = (cursor ? tmpLeaf[active] : tmpLeaf) || ({} as IndexLeaf)
    tmpIndexes = Object.keys(tmpLeaf).map(Number)
    tmpCounts = (cursor ? tmpCounts[active] : tmpCounts) || {}
    // tmpCounts = tmpIndexes.reduce((prev, cur) => {
    //   const leaf = (tmpLeaf[cur] || {}) as IndexLeaf
    //   prev[cur] = Object.keys(leaf).length
    //   return prev
    // }, {})
  }
  const careMode = useCareMode()

  const _itemHeight = itemHeight! * (careMode ? 1.3 : 1)

  return (
    <Provider value={{ itemHeight: _itemHeight }}>
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
                itemHeight={_itemHeight}
                options={tmpOpts}
                className={colClass}
                theme={theme}
                style={colStyle}
                multiple={multiple}
                autoHeight={autoHeight}
                limit={limit}
                counts={formatCount(tmpCounts)}
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
  autoHeight: true,
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
