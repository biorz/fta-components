import { Image, Text, View } from '@tarojs/components'
import React, {
  forwardRef,
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Assets, classNames, inRN, useEnhancedState } from '../../common'
import '../../style/components/dropdown/index.scss'
import {
  DropdownItemProps,
  DropdownItemRef,
  DropdownProps,
  DropdownRef,
  DropdownSideEffectState,
  DropdownWithChildren,
  DropdownWithList,
} from '../../types/dropdown'
import { DropdownProvider, useDropdown } from './context'

function Dropdown(props: DropdownProps, ref: Ref<DropdownRef>): JSX.Element {
  const { check, arrow, onChange } = props
  const [state, setState] = useEnhancedState<DropdownSideEffectState>({
    prop: '',
    isOpened: false,
    activeIndex: -1,
    // activeItem: -1,
    options: [],
    onChange() {},
  })

  const refs = useRef<Set<RefObject<any>>>(new Set()).current

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
    return setState(state)
  }

  const _onItemClick = (item, index) => {
    setState('activeIndex', index)
    state.onChange(index)
    onChange?.(state.prop, item.value || item.label)
  }

  useImperativeHandle(ref, () => ({
    close() {
      refs.forEach((ref) => {
        ref.current.isOpened && ref.current.close()
      })
      setState('isOpened', false)
    },
  }))

  return (
    <DropdownProvider
      value={{
        register,
        unregister,
        toggle,
        arrow,
        check,
      }}>
      <View className='fta-dropdown'>
        <View className='fta-dropdown-menu'>
          {(props as DropdownWithChildren).children ||
            (props as DropdownWithList).list?.map((cprops, i) => (
              <DropdownItem {...cprops} key={i} />
            ))}
        </View>
        {state.isOpened ? (
          <View
            className={classNames(
              'fta-dropdown-options',
              !inRN && props.absolute && 'fta-dropdown-options--absolute'
            )}>
            {state.options.map((v, i) => {
              const isActive = state.activeIndex === i
              return (
                <View className='fta-dropdown-option' key={i} onClick={() => _onItemClick(v, i)}>
                  <Text
                    className={classNames(
                      'fta-dropdown-option__text',
                      isActive && 'fta-dropdown-option__text--active'
                    )}>
                    {v.label}
                  </Text>
                  {isActive ? <Image src={check!} className='fta-dropdown-option__check' /> : null}
                </View>
              )
            })}
          </View>
        ) : null}
      </View>
    </DropdownProvider>
  )
}

function DropdownItem(props: DropdownItemProps, ref: Ref<DropdownItemRef>): JSX.Element {
  const { title, options, activeIndex, prop } = props
  const activeIndexRef = useRef(activeIndex)
  const [isOpened, toggleOpened] = useState(false)
  const ctx = useDropdown()

  const _ref = {
    isOpened: () => isOpened,
    close: () => toggleOpened(false),
  }

  const mRef = useRef(_ref)

  const onClick = () => {
    const willOpen = !isOpened
    toggleOpened(willOpen)
    ctx.toggle({
      prop,
      ref: mRef,
      options,
      isOpened: willOpen,
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

const ForwardedDropdown = forwardRef(Dropdown)

const ForwardedDropdownItem = forwardRef(DropdownItem)

ForwardedDropdownItem.defaultProps = {}

ForwardedDropdown.defaultProps = {
  absolute: true,
  arrow: Assets.arrow.up,
  check: Assets.check.primary,
}

export { ForwardedDropdown as default, ForwardedDropdownItem as DropdownItem }
