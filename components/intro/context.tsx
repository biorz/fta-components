import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { IntroContext, WithIntro } from '../../types/intro'
import Overlay from '../overlay'

const context = createContext<IntroContext>({} as IntroContext)

const IntroConsumer = context.Consumer

const useIntroContext = () => useContext(context)

function _IntroProvider(
  props: { children: ReactNode; disabled?: boolean },
  _ref: ForwardedRef<IntroContext>
) {
  const [isDisabled, disabled] = useState(!!props.disabled)

  const [show, toggle] = useState(false)
  const [children, setChildren] = useState<any>(null)
  const [stack, setStack] = useState<ReactElement[]>([])
  const ref = useRef({ isDisabled, disabled, cursor: 1 }).current

  const hasReachEnd = () => ref.cursor >= stack.length + 1

  useLayoutEffect(() => {
    ref.isDisabled = isDisabled
    ref.disabled = disabled
  }, [isDisabled, disabled])

  useLayoutEffect(() => {
    disabled(!!props.disabled)
    console.log('useLayoutEffect')
  }, [props.disabled])

  const refMethods: IntroContext = {
    show(step = ref.cursor++) {
      if (ref.isDisabled) return
      toggle(true)
    },
    hide() {
      toggle(false)
    },
    next() {
      if (hasReachEnd()) {
        toggle(false)
      } else {
        toggle(true)
      }
    },
    prev() {
      toggle(true)
    },
    register(el: ReactElement) {
      console.log('register element', el)
      setStack([...stack, el])
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

  useImperativeHandle(_ref, () => refMethods)

  const onOverlayClick = () => {
    refMethods.next()
  }

  return (
    <context.Provider value={refMethods}>
      <Overlay show={show} onClick={onOverlayClick}>
        {stack[ref.cursor - 1] || null}
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
