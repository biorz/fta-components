import { View } from '@tarojs/components'
import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { classNames, px } from '../../common'
import '../../style/components/intro/index.scss'
import { IntroContext, MetaData, WithIntro } from '../../types/intro'
import Overlay from '../overlay'

const context = createContext<IntroContext>({} as IntroContext)

const IntroConsumer = context.Consumer

const useIntroContext = () => useContext(context)

function _IntroProvider(
  props: { children: ReactNode; disabled?: boolean; readonly?: boolean },
  _ref: ForwardedRef<IntroContext>
) {
  const [isDisabled, disabled] = useState(!!props.disabled)

  const [show, toggle] = useState(false)
  const [cursor, moveCursorTo] = useState(0)
  const [stack, setStack] = useState<MetaData[]>([])
  const ref = useRef({ isDisabled, disabled, cursor: 1 }).current

  const hasReachEnd = () => cursor + 1 >= stack.length

  useLayoutEffect(() => {
    ref.isDisabled = isDisabled
    ref.disabled = disabled
  }, [isDisabled, disabled])

  useLayoutEffect(() => {
    disabled(!!props.disabled)
    console.log('useLayoutEffect')
  }, [props.disabled])

  const refAttrs: IntroContext = {
    readonly: props.readonly,
    show(step) {
      if (ref.isDisabled) return
      step = step || 0
      moveCursorTo(step)
      toggle(true)
    },
    hide() {
      toggle(false)
    },
    next() {
      console.log('hasreachend', hasReachEnd(), cursor)
      if (hasReachEnd()) {
        toggle(false)
      } else {
        toggle(true)
      }
    },
    prev() {
      toggle(true)
    },
    register(metaData) {
      console.log('register element', metaData)
      setStack([...stack, metaData])
    },
    unregister() {},
    destroy() {},
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

  return (
    <context.Provider value={refAttrs}>
      <Overlay show={show} onClick={onOverlayClick}>
        {current ? (
          <View
            // @ts-ignore
            pointerEvents={_readonly ? 'none' : void 0}
            className={classNames('fta-intro-wrapper', _readonly && 'fta-intro-wrapper--readonly')}
            style={{
              position: 'absolute',
              top: px(current.rect.y),
              left: px(current.rect.x),
              width: px(current.rect.width),
              height: px(current.rect.height),
            }}>
            {current.el || null}
          </View>
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

export { IntroProvider, IntroConsumer, useIntroContext, withIntro }
