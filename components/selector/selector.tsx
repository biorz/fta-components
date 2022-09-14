import { Image, ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  ForwardedRef,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { isArray, isFunction, px, useCareClass, useCareMode } from '../../common'
import '../../style/components/selector/index.scss'
import {
  HitFn,
  IndexLeaf,
  Option,
  OptionWithParent,
  ScrollAreaProps,
  SelectorCoreRefMethods,
  SelectorProps,
} from '../../types/selector'
import { Provider } from './context'
import CountDot from './count-dot'
import DoublyLinkedList from './doubly-linked-list'
import Search from './search'
import {
  getDefaultActiveItemClass,
  getDefaultActiveItemTextClass,
  getDefaultColClass,
  getDefaultItemClass,
  getDefaultItemTextClass,
} from './shared'
import { CHECK } from './static'
import Tag from './tag'

const deepCopy = (record: Record<string, any>) => JSON.parse(JSON.stringify(record))

const formatCount = (record: Record<string, any>) => {
  const { parent, total, ...rest } = record
  const rect = Object.keys(rest).reduce((prev, cur) => {
    prev[cur] = rest[cur].total
    return prev
  }, {})
  return rect
}

/**
 * 格式化每一级的选项
 */
const resolveOptions = (options: Option[], parent: Option, enableCheckAll: boolean) => {
  if (enableCheckAll && parent) {
    return [parent].concat(options)
  }
  return options
}

/**
 * @component
 */
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
    enableCheckAll,
    isDisabled,
    labelFormatter,
    onChange,
    onSelectDisabled,
    _index,
    _end,
    _parent,
  } = props

  const depth = _index! + 1
  const careMode = useCareMode()
  const prevParentRef = useRef(_parent)
  // const [activeIndex, setActiveIndex] = useState(multiple && _end ? [] : 0)
  const builtInClass = getDefaultColClass(depth)
  const rootClass = classNames('fta-selector-scrollarea', builtInClass, className)
  const itemClass = getDefaultItemClass(depth, careMode)
  const itemActiveClass = getDefaultActiveItemClass(depth)
  const textClass = getDefaultItemTextClass(depth, careMode)
  const textActiveClass = getDefaultActiveItemTextClass(depth)

  const onSelect = (idx: number, disabled: boolean, option: Option) => {
    if (disabled) {
      onSelectDisabled?.(option)
    } else {
      onChange!(idx, _index!, multiple! && _end! && seletedIndexes.includes(idx))
    }
  }

  // 判断当前索引是否是激活状态
  const isActive =
    _end && multiple ? (i: number) => seletedIndexes.includes(i) : (i: number) => i === activeIndex

  // TODO: 选择时滚动定位
  const scrollTop =
    autoHeight || multiple
      ? prevParentRef.current === _parent
        ? undefined
        : 0 + Math.random()
      : (activeIndex! > 1 ? activeIndex! - 1 : 0) * itemHeight!

  // console.log('scrollTop', scrollTop)
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

  const resolveIndex = enableCheckAll ? (index: number) => index - 1 : (index: number) => index

  useEffect(() => {
    prevParentRef.current = _parent
  }, [_parent])

  return (
    <View className={rootClass} style={style}>
      <ScrollView
        // @ts-ignore
        nestedScrollEnabled
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        // @ts-ignore
        showsVerticalScrollIndicator={false}>
        {resolveOptions(options!, _parent!, enableCheckAll!).map((opt, index) => {
          const i = resolveIndex(index)
          const active = isActive(i)
          const itemLabel = opt[fieldNames!.label]
          const itemValue = opt[fieldNames!.value]
          const disabled = isDisabled!(itemLabel, itemValue, opt, _index! + 1)
          const itemCls = classNames(
            itemStaticClass,
            active && itemActiveClass,
            active && activeItemClassName
          )

          // console.log('===opt==', opt, _parent)

          const [themeStyle, themeBgStyle] =
            theme && active ? [{ color: theme }, { backgroundColor: theme }] : [{}, {}]

          const heightStyle = autoHeight ? {} : { height: px(itemHeight!), minHeight: 'auto' }

          const itemStyl = {
            ...heightStyle,
            ...itemStyle,
            ...(active ? activeItemStyle : {}),
          }

          return (
            <View
              className={itemCls}
              style={itemStyl}
              key={`${itemValue}-${i}`}
              onClick={() => onSelect(i, disabled, opt)}>
              <Text
                className={classNames(
                  textStaticClass,
                  active && textActiveClass,
                  disabled && 'fta-selector-text--disabled'
                )}
                style={themeStyle}>
                {labelFormatter!(itemLabel, opt, i === -1, _index! + 1)}
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
  isDisabled: () => false,
  labelFormatter(label, _option, isfullCheck) {
    return (isfullCheck ? '全' : '') + label
  },
}

/** 浅比较选择的值是否相等 */
const shallowCompare = (v1: any, v2: any) => {
  if (v1 === v2) return true
  if (isArray(v1) && isArray(v2)) {
    return v1.length === v2.length && v1.every((v, i) => v === v2[i])
  }
  return false
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

const emptyRecord = (record: object) => {
  Object.keys(record).forEach((key) => delete record[key])
}

/**  获取即将被选中的树结构 */
const resolveWillSelected = (indexes: number[], selected: IndexLeaf) => {
  const selectedCopy = deepCopy(selected)
  let current = selectedCopy
  let tmp: any
  for (const i of indexes) {
    if (i === -1) {
      // 如果是全选，清空所有选项
      emptyRecord(current)
    } else {
      // 单选清空全选
      delete current[-1]
    }
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

/** 单选模式下，从索引处获得选项数组 */
const resolveOptsFromIndexes = (indexes: number[], options: Option[]) => {
  let tmpOpts = options
  let lastSelectedOpts: OptionWithParent = null as unknown as OptionWithParent
  const selectedOpts = indexes.reduce((prev, cur, i) => {
    const tmp = tmpOpts[cur]
    const copy = { ...tmp } as OptionWithParent
    copy.__parent__ = lastSelectedOpts
    copy.__index__ = i
    lastSelectedOpts = copy
    prev.push(tmp)
    tmpOpts = tmp?.children || []
    return prev
  }, [] as Option[])

  return [selectedOpts, lastSelectedOpts] as const
}

/** 多选模式下，从索引处获得数组 */
const resolveOptsFromIndexLeaf = (
  leaf: IndexLeaf,
  options: Option[],
  depth: number,
  selectedOpts = [] as (Option[] | Option)[],
  lastSelectedOpts = [] as OptionWithParent[],
  parent = null as unknown as OptionWithParent
) => {
  const keys = Object.keys(leaf).map(Number)
  keys.forEach((k) => {
    if (k === -1) {
      selectedOpts.push([parent])
      lastSelectedOpts.push(parent)
    } else if (leaf[k]) {
      // shallow copy
      const option = options[k]
      // 如果option不存在，说明有全选的情况

      const opts = [option]
      selectedOpts.push(opts)
      const copy = { ...option } as OptionWithParent
      copy.__parent__ = parent
      copy.__index__ = k
      if (depth === 1) {
        lastSelectedOpts.push(copy)
      }
      resolveOptsFromIndexLeaf(
        leaf[k] as IndexLeaf,
        (option.children || []) as Option[],
        depth - 1,
        opts,
        lastSelectedOpts,
        copy
      )
    }
  })
  return [selectedOpts, lastSelectedOpts] as const
}

function fillupList<T>(list: T[], depth: number, defaultValue: T) {
  if (list.length === depth) return list
  return list.concat(new Array(depth).fill(defaultValue)).slice(0, depth)
}

const lookupLeaf = (
  value: (string | number)[],
  options: Option[],
  depth: number,
  valueKey: string,
  linkedList = new DoublyLinkedList(0),
  result = [] as number[][]
) => {
  if (value.length) {
    for (let i = 0; i < options.length; i++) {
      if (!value.length) break
      const option = options[i]
      const optVal = option[valueKey]
      const nextLinkedList = new DoublyLinkedList(i, linkedList)
      linkedList.append(nextLinkedList)
      nextLinkedList.prev
      const index = value.indexOf(optVal)
      // console.log(option.shortName, 'optVal')
      if (index > -1) {
        // 找到索引
        // console.log('找到索引', index, nextLinkedList.resolvePath(), depth)
        const path = nextLinkedList.resolvePath()
        value.splice(index, 1)
        // const fullPath = fillupList(path, depth, 1)
        // console.log('fullPath', fullPath, path)

        result.push(path)
        if (!value.length) break
      } else if (option.children && depth > 0) {
        lookupLeaf(value, option.children, depth - 1, valueKey, nextLinkedList, result)
      }
    }
  }
  return result
}

/** 补全默认选择结果 */
const fillResult = (
  result: number[][],
  // options: Option[],
  depth: number,
  enableCheckAll: boolean[]
) => {
  return result.map((list) => {
    const copy = list.slice()
    if (copy.length < depth) {
      let root
      // 是补0还是补1
      for (let i = copy.length; i < depth; i++) {
        if (i - 1 > -1) {
          const checkAll = enableCheckAll[i - 1]
          if (root === void 0) {
            root = checkAll
          } else if (checkAll) {
            root = true
          }
          // 如果两个label相等的话就
          copy.push(root ? -1 : 0)
        }
      }
    }
    return copy
  })
}

const resolveSelectedFromValue = (
  value: any,
  options: Option[],
  depth: number,
  valueKey: string,
  enableCheckAll: boolean[]
) => {
  const leaf = {}
  if (!isArray(value) && value != null) {
    value = [value]
  }
  if (isArray(value) && value.length) {
    const result = lookupLeaf(value.slice(), options, depth, valueKey)
    const filledResult = fillResult(result, depth, enableCheckAll)
    // console.log('filledResult==', filledResult)
    filledResult.forEach((path) => {
      path.reduce((prev, cur) => {
        return (prev[cur] = prev[cur] || {})
      }, leaf)
    })
    // console.log('leaffff', leaf)
    return [
      leaf,
      filledResult[0],
      // fillupList(result[0], depth, -1)
    ] as const
  }
  return [leaf, [] as number[]] as const
}

/** 遍历搜索 */
const traverseSearch = (
  options: Option[],
  hit: HitFn,
  labelKey: string,
  keyword: string,
  needbreakRef = { current: false },
  linkedList = new DoublyLinkedList(0),
  result: number[] = []
) => {
  if (needbreakRef.current) return result
  for (let i = 0; i < options.length; i++) {
    if (needbreakRef.current) break
    const option = options[i]

    if (hit(keyword, option[labelKey], option)) {
      needbreakRef.current = true
      result.push(...linkedList.resolvePath(), i)
      break
    }
    const newLinkedList = new DoublyLinkedList(i)
    newLinkedList.prepend(linkedList)
    linkedList.append(newLinkedList)
    if (option.children) {
      traverseSearch(option.children, hit, labelKey, keyword, needbreakRef, newLinkedList, result)
    }
  }

  return result
}

const formatTagText = (option: OptionWithParent, labelKey: string, valueKey: string) => {
  let str = option[labelKey] as string
  const parent = option.__parent__
  if (
    parent &&
    parent[valueKey] !== option[valueKey] &&
    // 如 北京/北京 格式成 北京
    str !== parent[labelKey]
  ) {
    return parent[labelKey] + '/' + str
  }
  return str
}

const SelectorCore = forwardRef(function _SelectorCore(
  props: SelectorProps,
  ref: ForwardedRef<SelectorCoreRefMethods>
) {
  const {
    depth,
    options,
    itemHeight,
    fieldNames,
    showSearch,
    showResult,
    strictSearch,
    enableCheckAll,
    theme,
    placeholder,
    columnClassName,
    columnStyle,
    className,
    // @ts-ignore
    style,
    limit,
    limitHint,
    multiple,
    autoHeight,
    customStyle,
    containerClassName,
    containerStyle,
    tagBgColor,
    tagColor,
    tagFormatter,
    emptyHint,
    onExceed,
    onChange,
    defaultValue: value = multiple ? [] : null,
    ...extraProps
  } = props

  const prevValueRef = useRef(value)
  // 记录useEffect是否第一次触发
  const firstRef = useRef(true)
  const _loops = useRef(new Array(depth).fill(0)).current
  // 当前选择项是否是全选
  const checkAllRef = useRef(false)
  // const sortRef = useRef<Record<string, number>>({}).current
  const [showEmpty, setEmpty] = useState(false)
  const [activeIndexes, setActiveIndexes] = useState<number[]>(_loops)
  const [selected, setSelected] = useState<IndexLeaf>({})
  const [activeList, setActiveList] = useState<OptionWithParent[]>([])

  useEffect(() => {
    if (options.length && value != null) {
      const [leaf, indexes] = resolveSelectedFromValue(
        value,
        options,
        depth!,
        fieldNames!.value,
        enableCheckAll!
      )
      // console.log('leaf', leaf, indexes)
      setSelected(leaf)
      if (indexes?.length) {
        setActiveIndexes(indexes)
      }

      // console.log('useEffect indexes', indexes, leaf, value, [value])
    }
  }, [options])

  useEffect(() => {
    if (shallowCompare(prevValueRef.current, value)) return
    prevValueRef.current = value
    // 重新聚焦
  }, [value])

  const rootClass = classNames('fta-selector', className)
  const rootStyle = Object.assign({}, style, customStyle)
  const containerClass = classNames('fta-selector-container', containerClassName)

  // 取消选中的节点
  const uncheck = (indexes: number[]) => {
    const selectedCopy = { ...selected }
    const prevs = indexes.slice(0, -1)
    const end = indexes.slice(-1)[0]

    const endMap = prevs.reduce(
      (prev, cur) =>
        prev[cur] ||
        // ⚠️容错性
        {},
      selectedCopy
    )
    delete endMap![end]
    setSelected(selectedCopy)
  }

  // 从选择的列表中取消选中节点
  const uncheckFromList = (option: OptionWithParent) => {
    const indexes = [] as number[]
    let tmp: OptionWithParent | null = option
    while (tmp) {
      indexes.push(tmp.__index__)
      tmp = tmp.__parent__
    }

    // console.log('==indexes==', indexes)
    uncheck(indexes.reverse())
  }

  const onSearch = (keyword: string) => {
    if (!keyword) {
      setEmpty(false)
      return
    }
    const hit = isFunction(strictSearch)
      ? strictSearch
      : strictSearch === true
      ? (keyword: string, label: string) => keyword === label
      : (keyword: string, label: string) => String(label).indexOf(keyword) > -1

    const result = traverseSearch(options, hit, fieldNames!.label, keyword)
    if (result.length) {
      const indexes = result.concat(_loops).slice(0, depth)
      setActiveIndexes(indexes)
      setEmpty(false)
    } else {
      console.log('search result: null')
      setEmpty(true)
    }
  }

  const onSelectChange = (index: number, cursor: number, cancel: boolean) => {
    // 标记当前选择是否为全选
    checkAllRef.current = index === -1
    const copy = activeIndexes.slice()
    // 多选模式
    if (multiple) {
      // 取消勾选
      if (cancel) {
        // 置为空指针
        copy[cursor] = null as unknown as number
        // 将勾选项目从selectedIndexes移出
        uncheck(copy.slice(0, -1).concat([index]))
      } else {
        copy[cursor] = index
        for (let i = cursor + 1; i < copy.length; i++) {
          // TODO:
          if (i + 1 === copy.length) {
            copy[i] = null as unknown as number
          } else {
            copy[i] = 0
          }
        }
        // 成功勾选
        // 如果是最后一项， 加入此项，如果没有则创建索引数组
        if (depth === cursor + 1) {
          // 判断是否超出🚫
          const willChecked = resolveWillSelected(copy, selected)
          // console.log('willSelected', copy, willChecked)
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

  useImperativeHandle(ref, () => ({
    reset() {
      setActiveIndexes(_loops)
      setSelected({} as IndexLeaf)
      setActiveList([])
    },
    uncheck(option) {
      if (isArray(option)) {
        uncheck(option)
      } else {
        uncheckFromList(option)
      }
    },
  }))

  useEffect(() => {
    // console.log('activeIndeses', activeIndexes)
    if (!multiple && activeIndexes.every((v) => v >= 0)) {
      if (firstRef.current) {
        firstRef.current = false
        return
      }
      const [selectedOpts, lastSelectedOpt] = resolveOptsFromIndexes(activeIndexes, options)
      onChange?.(selectedOpts, lastSelectedOpt)
    }
  }, [activeIndexes])

  useEffect(() => {
    if (multiple) {
      const [selectedOpts, lastSelectedOpts] = resolveOptsFromIndexLeaf(selected, options, depth!)
      // 这里的选项要排序，找出差异的项目，排在最后
      // if (activeList.length && lastSelectedOpts.length) {
      //   sortList(lastSelectedOpts, activeList)
      //   console.log('需要进行排序')
      // }

      setActiveList(lastSelectedOpts)
      // console.log('setter', lastSelectedOpts.length)
      if (firstRef.current) {
        firstRef.current = false
        return
      }
      // console.log('effect: selected', selected)
      // console.log('on Change: ', selectedOpts)
      onChange?.(selectedOpts, lastSelectedOpts)
    }
  }, [selected])

  const counts = resolveCounts(selected, depth!)

  let tmpOpts: typeof options
  let tmpIndexes: number[]
  let tmpLeaf: IndexLeaf = selected
  let tmpParent: Option
  // let tmpCount = 0
  // 解析每一列该展示的选项列表
  let tmpCounts = counts
  let active
  const resolveOpts = (cursor: number) => {
    // parentActive = activeIndexes[cursor - 2]
    active = activeIndexes[cursor - 1]
    const nexParent = cursor ? tmpOpts[active] || null : (null as unknown as Option)

    if (!(tmpParent && !nexParent)) {
      tmpParent = nexParent
    }

    tmpOpts = cursor ? tmpOpts[active]?.[fieldNames!.children] || [] : options
    tmpLeaf = (cursor ? tmpLeaf[active] : tmpLeaf) || ({} as IndexLeaf)
    tmpIndexes = Object.keys(tmpLeaf).map(Number)
    tmpCounts = (cursor ? tmpCounts[active] : tmpCounts) || {}
  }
  const careMode = useCareMode()

  const _itemHeight = itemHeight! * (careMode ? 1.3 : 1)

  return (
    <Provider value={{ itemHeight: _itemHeight }}>
      <View className={rootClass} style={rootStyle}>
        {showSearch ? (
          <View className='fta-selector-search-wrap'>
            <Search placeholder={placeholder} onChange={onSearch} />
          </View>
        ) : null}
        {isValidElement(showResult) ? (
          showResult
        ) : showResult && activeList.length ? (
          <View className='fta-selector-result'>
            <View className='fta-selector-result-container'>
              {limitHint ? <Text className='fta-selector-result-limit'>{limitHint}</Text> : null}
              <ScrollView
                // @ts-ignore
                nestedScrollEnabled
                scrollX
                scrollY={false}
                enableFlex
                // @ts-ignore
                showsHorizontalScrollIndicator={false}
                className={`fta-selector-result-wrap${
                  limitHint ? '' : ' fta-selector-result-container'
                }`}>
                <View className='fta-selector-result-tags'>
                  {activeList.map((option, i) => (
                    <Tag
                      key={option[fieldNames!.value] + '__' + i}
                      color={tagColor}
                      bgColor={tagBgColor}
                      onClose={() => uncheckFromList(option)}>
                      {tagFormatter!(option, fieldNames!.label, fieldNames!.value)}
                    </Tag>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : null}
        <View className={containerClass} style={containerStyle}>
          {emptyHint && showEmpty ? (
            <View className='fta-selector-empty'>
              <Text className='fta-selector-empty__text'>{emptyHint}</Text>
            </View>
          ) : null}
          {_loops.map((_, i) => {
            const colClass = columnClassName?.(i + 1)
            const colStyle = columnStyle?.(i + 1)
            const activeIndex = activeIndexes[i]
            resolveOpts(i)
            return (
              // @ts-ignore
              <ScrollArea
                key={i}
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
                enableCheckAll={
                  // 较为恶心的逻辑
                  tmpOpts.length === 1 &&
                  tmpOpts[0][fieldNames!.label] === tmpParent[fieldNames!.label] // 诸如北京等
                    ? false
                    : !tmpOpts.length && active === -1 // 其他省
                    ? true
                    : enableCheckAll![i - 1]
                }
                counts={formatCount(tmpCounts)}
                {...extraProps}
                onChange={onSelectChange}
                // @private
                _index={i}
                _end={i + 1 === _loops.length}
                _parent={tmpParent}
              />
            )
          })}
        </View>
      </View>
    </Provider>
  )
})

function useSelectorCore(initialProps: SelectorProps, deps = [] as any[]) {
  const ref = useRef<SelectorCoreRefMethods>(null)
  return [ref, useMemo(() => <SelectorCore {...initialProps} ref={ref} />, deps)] as const
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
  enableCheckAll: [],
  placeholder: '搜索',
  emptyHint: '暂无搜索结果',
  tagFormatter: formatTagText,
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children',
  },
}

SelectorCore.defaultProps = defaultProps

export { SelectorCore, SelectorCore as default, useSelectorCore }
