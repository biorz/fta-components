import { ITouchEvent, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import '../../style/components/swipe-action/index.scss'
import { SwipeActionProps, SwipeActionRef } from '../../types/swipe-action'
import { PolyCreateSelectorQuery } from './utils'

const inRN = process.env.TARO_ENV === 'rn'

// const inDesktop = typeof window !== 'undefined' && !('ontouchstart' in window)

const px = inRN ? (num) => num : (num) => num + 'px'

const transitionClass = 'fta-swipe-action-modal__transition'

const getPageX = inRN
  ? (e) => e.nativeEvent.pageX as number
  : (e) => e.changedTouches[0].pageX as number

/**
 * 是否能继续滑动
 */
function isMovable(left: boolean, offset: number, distance: number) {
  return ((!left && offset <= 0) || (left && offset >= 0)) && Math.abs(offset) <= distance
}

function SwipeAction(props: SwipeActionProps): JSX.Element {
  const {
    className,
    children,
    style,
    disabled,
    show,
    left,
    breakpoint,
    render,
    options,
    swipeClassName,
    swipeStyle,
    follow,
    swipeProps,
  } = props

  const [distance, setDistance] = useState<number>(props.distance || 0)
  const [offset, setOffset] = useState<number>(0)
  const [transition, useTransition] = useState(transitionClass)

  const ref = useRef<SwipeActionRef>({
    setOffset,
    startX: 0,
    offset: 0,
    timer: null as unknown as NodeJS.Timer,
    show: false,
    transitionClass: '',
  })

  const rootClass = classNames('fta-swipe-action', className)

  useEffect(() => {
    !inRN &&
      !distance &&
      setTimeout(() =>
        PolyCreateSelectorQuery('.fta-swipe-action-button-group', (rect) => {
          setDistance(rect.width)
        })
      ),
      17
  }, [])

  useEffect(() => {
    ref.current.show = show
  }, [props.show])

  useEffect(() => {
    ref.current.setOffset = setOffset
  }, [setOffset])

  useEffect(() => {
    const d = show ? (left ? distance : -1 * distance) : 0
    setOffset(d)
    ref.current.offset = d
  }, [show, setOffset, distance, left])

  function onTouchStart(e: ITouchEvent) {
    if (disabled) return
    useTransition('')
    const cur = ref.current
    cur.startX = e.changedTouches[0].pageX
    cur.transitionClass = ''
    // console.log(offset, 'touchstart')
  }

  function onTouchMove(e: ITouchEvent) {
    if (disabled) return
    e.preventDefault?.()
    const deltaX = getPageX(e) - ref.current.startX + ref.current.offset

    if (isMovable(left!, deltaX, distance)) {
      // console.log('movable')
      setOffset(deltaX)
      setTimer()
    } else {
    }
  }

  /** 松手自动定位，open or close */
  function autoPositioning(deltaX: number) {
    const { setOffset, show } = ref.current
    const ratio = show ? 1 - breakpoint! : breakpoint
    // console.log(show, 'ref.current.show')
    let offset = 0

    if (left && deltaX > 0) {
      offset = deltaX > distance * ratio! ? distance : 0
      setOffset(offset)
      props.onToggle?.(!!offset)
    } else if (!left && deltaX < 0) {
      offset = deltaX * -1 > distance * ratio! ? -1 * distance : 0
      setOffset(offset)
      props.onToggle?.(!!offset)
    }
    ref.current.show = !!offset
    ref.current.offset = offset
  }

  function handleLayout(e) {
    !props.distance && setDistance(e.nativeEvent.layout.width)
  }

  function onTouchEnd(e: ITouchEvent) {
    if (disabled) return
    useTransition(transitionClass)
    let t

    if ((t = ref.current.timer)) clearTimeout(t)
    const deltaX = e.changedTouches[0].pageX - ref.current.startX + ref.current.offset
    // console.log('touchend outside', deltaX, offset)
    if (isMovable(left!, deltaX, distance)) {
      autoPositioning(deltaX)
      // console.log(offset, 'touchend')
    } else {
      //做边界判断
      autoPositioning(offset)
    }
  }

  function setTimer() {
    if (!inRN) return
    const timer = ref.current.timer
    if (timer) {
      clearTimeout(timer)
      ref.current.timer = null
    }
    ref.current.timer = setTimeout(() => {
      useTransition(transitionClass)
      autoPositioning(offset)
    }, 300)
  }

  return (
    <View className={rootClass} style={style}>
      <View
        {...swipeProps}
        className={classNames('fta-swipe-action-modal', transition, swipeClassName)}
        style={{ ...swipeStyle, left: px(offset) }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        {children}
      </View>
      <View
        style={
          follow ? { [left ? 'left' : 'right']: px(-distance + (left ? offset : -offset)) } : {}
        }
        // @ts-ignore
        onLayout={handleLayout}
        className={classNames(
          'fta-swipe-action-button-group',
          transition,
          left && 'fta-swipe-action-button-group-left',
          follow && (left ? 'fta-swipe-action-follow-left' : 'fta-swipe-action-follow')
        )}>
        {render || (
          <Fragment>
            {options!.map((o, i) => (
              <View
                key={i}
                className={classNames('fta-swipe-action-button', o.containerClassName)}
                style={o.containerStyle}
                onClick={o.onClick}>
                <Text
                  className={classNames('fta-swipe-action-button__text', o.textClassName)}
                  style={o.textStyle}>
                  {o.text}
                </Text>
              </View>
            ))}
          </Fragment>
        )}
      </View>
    </View>
  )
}

const defaultProps: SwipeActionProps = {
  left: false,
  show: false,
  breakpoint: 0.3,
  swipeStyle: {},
  follow: false,
}

SwipeAction.defaultProps = defaultProps

// let Option: React.FC<SwipeActionOption>
// SwipeAction.SwipeActionOption = Option

// SwipeAction.SwipeActionOption = SwipeAction

export default SwipeAction
