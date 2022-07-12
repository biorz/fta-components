import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  createContext,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactNode,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { autoFix, inRN, isString, px } from '../../common'
import '../../style/components/intro/index.scss'
import { IntroContext, MetaData, TooltipProps, WithIntro } from '../../types/intro'
import Overlay from '../overlay'

const stopPropagation = (evt) => {
  evt?.stopPropagation?.()
}

const context = createContext<IntroContext>({} as IntroContext)

const IntroConsumer = context.Consumer

const useIntroContext = () => useContext(context)

function _IntroProvider(
  props: { children: ReactNode; disabled?: boolean; readonly?: boolean; delay?: number },
  _ref: ForwardedRef<IntroContext>
) {
  const [isDisabled, disabled] = useState(!!props.disabled)
  const [show, toggle] = useState(false)
  const [cursor, moveCursorTo] = useState(0)
  const stack = useRef<MetaData[]>([]).current
  const ref = useRef({ isDisabled, disabled, cursor: 1 }).current

  const hasReachEnd = () => cursor + 1 >= stack.length

  useLayoutEffect(() => {
    ref.isDisabled = isDisabled
    ref.disabled = disabled
  }, [isDisabled, disabled])

  useLayoutEffect(() => {
    disabled(!!props.disabled)
    // console.log('useLayoutEffect')
  }, [props.disabled])

  const refAttrs: IntroContext = {
    delay: props.delay || 0,
    readonly: props.readonly,
    show(cursor) {
      if (ref.isDisabled) return
      if (isString(cursor)) {
        const index = stack.findIndex((v) => v.prop === cursor)
        moveCursorTo(index > -1 ? index : 0)
      } else {
        cursor = cursor || 0
        moveCursorTo(cursor)
      }
      toggle(true)
    },
    hide() {
      toggle(false)
    },
    next() {
      // console.log('hasreachend', hasReachEnd(), cursor)
      if (hasReachEnd()) {
        toggle(false)
      } else {
        moveCursorTo(cursor + 1)
        toggle(true)
      }
    },
    prev() {
      if (cursor === 0) return
      moveCursorTo(cursor - 1)
      toggle(true)
    },
    register(metaData) {
      console.log('register element', metaData)
      stack.push(metaData)
      stack.sort((a, b) => a.priority - b.priority)
    },
    unregister(prop: string) {
      const index = stack.findIndex((meta) => meta.prop === prop)
      if (index > -1) stack.splice(index, 1)
    },
    destroy() {
      stack.length = 0
    },
    disable: () => {
      ref.disabled(true)
      ref.isDisabled = true
    },
    enable: () => ref.disabled(false),
    disabled: () => ref.isDisabled,
  }

  useImperativeHandle(_ref, () => refAttrs)

  const onOverlayClick = () => {
    refAttrs.next()
  }

  const current = stack[cursor]
  const _readonly = current?.readonly === false ? false : current?.readonly || props.readonly
  // current &&
  //   console.log('current', current, {
  //   })
  return (
    <context.Provider value={refAttrs}>
      <Overlay show={show} onClick={onOverlayClick} opacity={0.7}>
        {current ? (
          <Fragment>
            <View
              // @ts-ignore
              pointerEvents={_readonly ? 'none' : void 0}
              className={classNames(
                'fta-intro-wrapper',
                _readonly && 'fta-intro-wrapper--readonly'
              )}
              style={{
                top: px(current.rect.y),
                left: px(current.rect.x),
                width: px(current.rect.width),
                height: px(current.rect.height),
              }}>
              {current.el || null}
            </View>
            <Tooltip
              {...current.tooltip}
              tooltipClassName={current.tooltip.tooltipClassName}
              tooltipStyle={{ ...getComputedStyle(current), ...current.tooltip.tooltipStyle }}
            />
          </Fragment>
        ) : null}
      </Overlay>
      {props.children}
    </context.Provider>
  )
}

/**
 * @provider
 * 全局引导配置
 */
const IntroProvider = forwardRef(_IntroProvider)

IntroProvider.defaultProps = {
  readonly: true,
}

/** 高阶函数，直接包裹组件 */
const withIntro: WithIntro =
  (ChildComponent, props = {} as any) =>
  () =>
    (
      <IntroProvider>
        <ChildComponent {...props} />
      </IntroProvider>
    )

function Tooltip(props: TooltipProps) {
  const { tooltipClassName, tooltipStyle, title, desc, text, placement, offset, onClick } = props
  const ctx = useIntroContext()
  const rootClass = classNames('fta-intro-tooltip', tooltipClassName)
  const titleClass = classNames(
    'fta-intro-tooltip-title',
    desc || 'fta-intro-tooltip-title--simple'
  )
  return (
    <View
      className={rootClass}
      style={tooltipStyle}
      key={tooltipStyle?.marginTop}
      onClick={stopPropagation}>
      <View className={titleClass}>
        <Text className='fta-intro-tooltip-title__text'>{title}</Text>
      </View>
      {desc ? (
        <View className='fta-intro-tooltip-desc'>
          <Text className='fta-intro-tooltip-desc__text'>{desc}</Text>
        </View>
      ) : null}
      {text ? (
        <View className='fta-intro-tooltip-button' onClick={onClick || ctx.next}>
          <Text className='fta-intro-tooltip-button__text'>{text}</Text>
        </View>
      ) : null}
      <View
        style={{ left: offset }}
        className={classNames('fta-intro-tooltip-icon', `fta-intro-tooltip-icon--${placement}`)}
      />
    </View>
  )
}

Tooltip.defaultProps = {
  offset: '30%',
  placement: 'top',
}

const transformAdaptor = inRN
  ? (offset: number) => [{ translateY: offset }] as unknown as string
  : (offset: number) => `translateY(${offset}px)`

function getComputedStyle(data: MetaData) {
  const { rect, tooltip } = data
  const style: CSSProperties = {
    marginLeft: px(rect.x),
    marginTop: px(rect.y),
  }
  const absOffset = rect.height + autoFix(20)
  const offset = !tooltip.placement || tooltip.placement === 'top' ? -absOffset : absOffset
  style.transform = transformAdaptor(offset)

  return style
}

export { IntroProvider, IntroConsumer, useIntroContext, withIntro, Tooltip }
