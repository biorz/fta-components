import { Image, ScrollView, Text, View } from '@tarojs/components'
import React, {
  forwardRef,
  Fragment,
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  Assets,
  classNames,
  inRN,
  isArray,
  px,
  systemInfo,
  useEnhancedState,
  useMeasure,
} from '../../common'
import '../../style/components/dropdown/index.scss'
import {
  DropdownItemProps,
  DropdownItemRef,
  DropdownOptionProps,
  DropdownProps,
  DropdownRef,
  DropdownSideEffectState,
  DropdownWithChildren,
  DropdownWithList,
  Option,
} from '../../types/dropdown'
import SafeArea from '../safe-area'
import { DropdownProvider, useDropdown } from './context'
import NativeView from './native-view'
import createRootSiblings, { withRootSiblings } from './root-siblings'

const useOnceCallback = (cb) => {
  const timesRef = useRef(true)
  const resRef = useRef<any>()
  if (timesRef.current) {
    timesRef.current = false
    resRef.current = cb()
  }
  return resRef
}

const ScrollViewContainer = inRN ? View : Fragment

function Dropdown(props: DropdownProps, ref: Ref<DropdownRef>): JSX.Element {
  const { check, arrow, delay, onChange, overlay, overlayClassName, overlayStyle, safeArea } = props

  const [state, setState] = useEnhancedState<DropdownSideEffectState>({
    prop: '',
    isOpened: false,
    preventDefault: false,
    activeIndex: -1,
    // activeItem: -1,
    options: [],
    onChange() {},
    rect: {},
    height: 300,
    maxDepth: 0,
  })
  const [depth, setDepth] = useState(1)
  const [opts, setOpts] = useState<Option[]>([])
  const refs = useRef<Set<RefObject<any>>>(new Set()).current
  const store = useRef({
    // depth: 1,
    option: {},
    options: [] as Option[],
    // reachEnd: false,
  }).current

  const [mRef, measure] = useMeasure()

  /** 定位 */
  const positioning = () =>
    measure().then((res) => {
      const stretchHeight = systemInfo.windowHeight - res.bottom
      setState({ height: stretchHeight, rect: res })
    })

  useLayoutEffect(() => {
    positioning()
    return () => sRef.current?.destroy?.()
  }, [])

  useEffect(() => {
    if (!state.preventDefault && !isArray(state.options) && state.maxDepth && state.isOpened) {
      // console.log('depth', depth, state.isOpened)
      fetchData()
    }
  }, [depth, state.isOpened, state.options])

  const fetchData = async () => {
    const dataList = await (state.options as any)(depth, store.option)
    // console.log('dataList', dataList)
    if (isArray(dataList)) {
      setState('activeIndex', state.maxDepth ? state.activeIndex : -1)
      setOpts(dataList)
    }
  }

  const hasReachEnd = (depth: number, option: Option) => {
    const res = (state.options as any)(depth, option)
    // console.log('hasreachend', !res)
    return !res
  }

  const register = (ref) => {
    refs.add(ref)
  }

  const unregister = (ref) => {
    refs.delete(ref)
  }

  const toggle = async (params) => {
    await positioning()
    const { ref, ...state } = params
    closeItems(ref)
    if (!state.preventDefault) {
      // 重置当前选择的深度
      setDepth(1)
      setState(state)
    } else {
      setState('isOpened', false)
    }
  }

  const closeItems = (ref?: any) => {
    const copy = new Set(refs)
    ref && copy.delete(ref)

    copy.forEach((ref) => {
      ref.current.isOpened && ref.current.close()
    })
  }

  const _onItemClick = async (item, index) => {
    if (depth <= state.maxDepth!) {
      // 说明是级联选择
      if (depth < state.maxDepth! && !(await hasReachEnd(depth + 1, item))) {
        setTimeout(() => {
          setDepth(depth + 1)
        }, delay)
      }
      const activeIndex = state.activeIndex as number[]
      activeIndex[depth - 1] = index
      setState('activeIndex', activeIndex.slice())
    } else {
      setState('activeIndex', index)
    }
    state.onChange(index, state.maxDepth ? depth : undefined)
    store.option = item
    onChange?.(state.prop, item.value || item.label, depth)
  }

  const closePanel = () => {
    closeItems()
    setState('isOpened', false)
  }

  const renderOptions = (opts: Option[]) => {
    const activeIndex = state.maxDepth ? state.activeIndex[depth - 1] : state.activeIndex
    return (
      <Fragment>
        {opts.map((v, i, self) => {
          return (
            <DropdownOption
              key={i}
              check={check}
              active={activeIndex === i}
              borderless={self.length === i + 1}
              onClick={() => _onItemClick(v, i)}>
              {v.label}
            </DropdownOption>
          )
        })}
      </Fragment>
    )
  }

  useImperativeHandle(ref, () => ({
    measure: positioning,
    close() {
      refs.forEach((ref) => {
        ref.current.isOpened && ref.current.close()
      })
      setState('isOpened', false)
    },
    show() {
      sRef.current?.update?.(sibling)
    },
    hide() {
      sRef.current?.update?.(null)
    },
    destroy() {
      sRef.current?.destroy?.()
    },
  }))

  const rootClass = classNames('fta-dropdown', state.isOpened && 'fta-dropdown--full')

  const itemsFragment = (
    <NativeView className='fta-dropdown-menu' {...mRef}>
      {(props as DropdownWithChildren).children ||
        (props as DropdownWithList).list?.map((cprops, i) => <DropdownItem {...cprops} key={i} />)}
    </NativeView>
  )

  const dynamicStyle = inRN ? { top: state.rect.bottom } : { top: px(state.rect.bottom) }

  const sibling = (
    <View className={rootClass} style={dynamicStyle}>
      {/* 占位符 */}
      {state.isOpened ? (
        <View
          style={{ [overlay ? 'height' : 'maxHeight']: px(state.height) }}
          className={classNames(
            'fta-dropdown-options',
            !inRN && props.absolute && 'fta-dropdown-options--absolute'
          )}>
          <ScrollViewContainer>
            <ScrollView scrollY bounces={false} className='fta-dropdown-scrollview'>
              {isArray(state.options) ? renderOptions(state.options) : renderOptions(opts)}
            </ScrollView>
          </ScrollViewContainer>

          {overlay ? (
            <View
              className={classNames('fta-dropdown-modal', overlayClassName)}
              style={overlayStyle}
              onClick={closePanel}
            />
          ) : null}
          <SafeArea {...safeArea} />
        </View>
      ) : null}
    </View>
  )
  const sRef = useOnceCallback(() => createRootSiblings(sibling))

  useLayoutEffect(() => {
    sRef.current?.update(sibling)
    // console.log('sRef.current', sRef.current?.)
  })
  // const elem = useRef().current

  return (
    <Fragment>
      <DropdownProvider
        value={{
          register,
          unregister,
          toggle,
          arrow,
          check,
        }}>
        {inRN ? null : sibling}
        {itemsFragment}
        {/* <NativeView className='fta-dropdown fta-dropdown--blank' {...mRef}>
        <View className='fta-dropdown-item' />
      </NativeView> */}
      </DropdownProvider>
    </Fragment>
  )
}

function DropdownItem(props: DropdownItemProps, ref: Ref<DropdownItemRef>): JSX.Element {
  const { title, options, activeIndex, prop, preventDefault, maxDepth } = props
  const activeIndexRef = useRef(
    maxDepth && !isArray(activeIndex) ? [activeIndex ?? -1] : activeIndex
  )
  const [isOpened, toggleOpened] = useState(false)
  const ctx = useDropdown()

  const _ref = {
    isOpened: () => isOpened,
    close: () => toggleOpened(false),
  }

  const mRef = useRef(_ref)

  const onClick = () => {
    props.onClick?.()

    const willOpen = !isOpened
    // console.log('will open', willOpen)
    if (!preventDefault) {
      toggleOpened(willOpen)
    }
    ctx.toggle({
      prop,
      options,
      ref: mRef,
      maxDepth: maxDepth || 0,
      isOpened: willOpen,
      preventDefault: !!preventDefault,
      activeIndex: activeIndexRef.current,
      onChange(index: number, depth?: number) {
        if (depth) {
          ;(activeIndexRef.current as number[])[depth - 1] = index
        } else {
          activeIndexRef.current = index
        }
      },
    })
  }

  useImperativeHandle(ref, () => _ref)

  mRef.current = _ref

  useEffect(() => {
    ctx.register(mRef)
    return () => ctx.unregister(mRef)
  }, [])

  return (
    <View className='fta-dropdown-item' onClick={onClick}>
      <Text
        className={classNames(
          'fta-dropdown-item__text',
          isOpened && 'fta-dropdown-item__text--active'
        )}>
        {title}
      </Text>
      <Image
        src={isOpened ? (ctx.arrow as string) : Assets.arrow.down}
        className='fta-dropdown-item__arrow'
      />
    </View>
  )
}

function DropdownOption(props: DropdownOptionProps) {
  const { active, children, borderless, check, onClick } = props

  return (
    <View
      className={classNames('fta-dropdown-option', borderless && 'fta-dropdown-option--borderless')}
      onClick={onClick}>
      <Text
        className={classNames(
          'fta-dropdown-option__text',
          active && 'fta-dropdown-option__text--active'
        )}>
        {children}
      </Text>
      {active ? <Image src={check!} className='fta-dropdown-option__check' /> : null}
    </View>
  )
}

const ForwardedDropdown = forwardRef(Dropdown)

const ForwardedDropdownItem = forwardRef(DropdownItem)

ForwardedDropdownItem.defaultProps = {}

ForwardedDropdown.defaultProps = {
  absolute: true,
  arrow: Assets.arrow.up,
  check: Assets.check.primary,
  delay: 200,
  overlay: true,
  safeArea: {},
}

DropdownOption.defaultProps = {
  check: Assets.check.primary,
}

export {
  ForwardedDropdown as default,
  ForwardedDropdownItem as DropdownItem,
  DropdownOption,
  withRootSiblings as withDropdown,
}
