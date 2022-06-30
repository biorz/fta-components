import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { IntroContext, WithIntro } from '../../types/intro'
import Overlay from '../overlay'

const context = createContext<IntroContext>({} as IntroContext)

const IntroConsumer = context.Consumer

const useIntroContext = () => useContext(context)

function _IntroProvider(props: { children: ReactNode }, ref: ForwardedRef<IntroContext>) {
  const [show, toggle] = useState(false)
  const [children, setChildren] = useState<any>(null)
  const [stack, setStack] = useState([])
  const r = useRef({ cursor: 1 }).current

  const hasReachEnd = () => r.cursor >= stack.length + 1

  const refMethods: IntroContext = {
    show(step = r.cursor++) {
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
    register() {},
    unregister() {},
    destroy() {},
  }

  useImperativeHandle(ref, () => refMethods)

  const onOverlayClick = () => {
    refMethods.next()
  }

  return (
    <context.Provider value={refMethods}>
      <Overlay show={show} onClick={onOverlayClick}></Overlay>
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
