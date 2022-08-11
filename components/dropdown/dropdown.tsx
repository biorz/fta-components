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
import createRootSiblings from './root-siblings'

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
  const { check, arrow, onChange } = props

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

  const positioning = () =>
    measure().then((res) => {
      const stretchHeight = systemInfo.windowHeight - res.bottom
      setState({ height: stretchHeight, rect: res })
      // console.log('systemInfo', systemInfo)
      // console.log('rect', res)
      // console.log('stretchHeight', stretchHeight)
    })

  useLayoutEffect(() => {
    positioning()
    return () => sRef.current?.destroy?.()
  }, [])

  useEffect(() => {
    console.log('state change', state)
  }, [state])

  useEffect(() => {
    if (!state.preventDefault && !isArray(state.options) && state.maxDepth && state.isOpened) {
      console.log('depth', depth, state.isOpened)
      fetchData()
    }
  }, [depth, state.isOpened, state.options])

  const fetchData = async () => {
    const dataList = await (state.options as any)(depth, store.option)
    console.log('dataList', dataList)
    if (isArray(dataList)) {
      setState('activeIndex', -1)
      setOpts(dataList)
    }
  }

  const hasReachEnd = (depth: number, option: Option) => {
    const res = (state.options as any)(depth, option)
    console.log('hasreachend', !res)
    return !res
  }

  const register = (ref) => {
    refs.add(ref)
  }

  const unregister = (ref) => {
    refs.delete(ref)
  }

  const toggle = (params) => {
    const { ref, ...state } = params
    console.log('toggle open', state.isOpened)
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
    if (depth < state.maxDepth!) {
      console.log('depth', depth, item)
      if (!(await hasReachEnd(depth + 1, item))) {
        // 说明是级联选择
        console.log('1111111')
        setTimeout(() => {
          setDepth(depth + 1)
        }, 200)
      }
    }

    setState('activeIndex', index)
    state.onChange(index)
    store.option = item
    onChange?.(state.prop, item.value || item.label, depth)
  }

  const closePanel = () => {
    closeItems()
    setState('isOpened', false)
  }

  const renderOptions = (opts: Option[]) => (
    <Fragment>
      {opts.map((v, i, self) => {
        return (
          <DropdownOption
            key={i}
            check={check}
            active={state.activeIndex === i}
            borderless={self.length === i + 1}
            onClick={() => _onItemClick(v, i)}>
            {v.label}
          </DropdownOption>
        )
      })}
    </Fragment>
  )

  useImperativeHandle(ref, () => ({
    measure: positioning,
    close() {
      refs.forEach((ref) => {
        ref.current.isOpened && ref.current.close()
      })
      setState('isOpened', false)
    },
  }))

  const rootClass = classNames('fta-dropdown', state.isOpened && 'fta-dropdown--full')

  const sibling = (
    <DropdownProvider
      value={{
        register,
        unregister,
        toggle,
        arrow,
        check,
      }}>
      <View className={rootClass} style={{ top: inRN ? state.rect.top : void 0 }}>
        <View className='fta-dropdown-menu'>
          {(props as DropdownWithChildren).children ||
            (props as DropdownWithList).list?.map((cprops, i) => (
              <DropdownItem {...cprops} key={i} />
            ))}
        </View>
        {state.isOpened ? (
          <View
            style={{ height: px(state.height) }}
            className={classNames(
              'fta-dropdown-options',
              !inRN && props.absolute && 'fta-dropdown-options--absolute'
            )}>
            <ScrollViewContainer>
              <ScrollView scrollY bounces={false} className='fta-dropdown-scrollview'>
                {isArray(state.options) ? renderOptions(state.options) : renderOptions(opts)}
              </ScrollView>
            </ScrollViewContainer>

            <View className='fta-dropdown-modal' onClick={closePanel} />
            <SafeArea />
          </View>
        ) : null}
      </View>
    </DropdownProvider>
  )
  const sRef = useOnceCallback(() => createRootSiblings(sibling))

  useLayoutEffect(() => {
    sRef.current?.update(sibling)
  })
  // const elem = useRef().current

  return (
    <Fragment>
      {inRN ? null : sibling}
      <NativeView className='fta-dropdown fta-dropdown--blank' {...mRef}>
        <View className='fta-dropdown-item'></View>
      </NativeView>
    </Fragment>
  )
}

function DropdownItem(props: DropdownItemProps, ref: Ref<DropdownItemRef>): JSX.Element {
  const { title, options, activeIndex, prop, preventDefault, maxDepth } = props
  const activeIndexRef = useRef(activeIndex)
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
    console.log('will open', willOpen)
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
      onChange(index: number) {
        activeIndexRef.current = index
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
}

DropdownOption.defaultProps = {
  check: Assets.check.primary,
}

export { ForwardedDropdown as default, ForwardedDropdownItem as DropdownItem, DropdownOption }
