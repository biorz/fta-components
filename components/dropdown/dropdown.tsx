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
  })

  const refs = useRef<Set<RefObject<any>>>(new Set()).current
  const [mRef, measure] = useMeasure()

  useLayoutEffect(() => {
    measure().then((res) => {
      const stretchHeight = systemInfo.windowHeight - res.bottom
      setState({ height: stretchHeight, rect: res })
      // console.log('systemInfo', systemInfo)
      // console.log('rect', res)
      // console.log('stretchHeight', stretchHeight)

      return () => sRef.current?.destroy?.()
    })
  }, [])

  const register = (ref) => {
    refs.add(ref)
  }

  const unregister = (ref) => {
    refs.delete(ref)
  }

  const toggle = (params) => {
    const { ref, ...state } = params

    const copy = new Set(refs)
    copy.delete(ref)

    copy.forEach((ref) => {
      ref.current.isOpened && ref.current.close()
    })
    if (!state.preventDefault) {
      setState(state)
    } else {
      setState('isOpened', false)
    }
  }

  const _onItemClick = (item, index) => {
    setState('activeIndex', index)
    state.onChange(index)
    onChange?.(state.prop, item.value || item.label)
  }

  const closePanel = () => setState('isOpened', false)

  useImperativeHandle(ref, () => ({
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
            <View>
              <ScrollView bounces={false} className='fta-dropdown-scrollview'>
                {state.options.map((v, i, self) => {
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
              </ScrollView>
            </View>

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
  const { title, options, activeIndex, prop, preventDefault } = props
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
    if (!preventDefault) {
      toggleOpened(willOpen)
    }
    ctx.toggle({
      prop,
      ref: mRef,
      options,
      isOpened: willOpen,
      preventDefault: !!preventDefault,
      activeIndex: activeIndexRef.current,
      onChange(index: number) {
        activeIndexRef.current = index
      },
    })
  }

  useImperativeHandle(ref, () => _ref)

  useEffect(() => {
    mRef.current = _ref
  })

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
