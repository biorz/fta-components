import React, { cloneElement, ForwardedRef, forwardRef, Fragment, useEffect, useRef } from 'react'
import '../../style/components/intro/index.scss'
import { IntroProps } from '../../types/intro'
import { IntroConsumer, IntroProvider, Tooltip, useIntroContext, withIntro } from './context'
import { getBoundingClientRect } from './dom-rect'

function _Intro(props: Omit<IntroProps, 'prop'>, ref: ForwardedRef<any>) {
  const children = cloneElement(props.children, { ref })
  return <Fragment>{children}</Fragment>
}

let uid = 0

const FowardedIntro = forwardRef(_Intro)
function Intro(props: IntroProps) {
  const ref = useRef<HTMLElement>(uid++ as any as HTMLElement)
  const ctx = useIntroContext()

  useEffect(() => {
    if (ctx.disabled()) return
    // console.log('ref', ref)
    getBoundingClientRect(ref, props.delay! || ctx.delay!).then((rect) => {
      // @ts-ignore
      ctx.register({
        rect,
        prop: props.prop,
        el: React.cloneElement(props.children),
        tooltip: props,
      })
    })
  }, [])

  return (
    <FowardedIntro ref={ref}>
      {React.cloneElement(props.children, {
        id: 'fta-intro-child' + ref.current,
        /**
         * 下列属性兼容部分安卓机位置获取不到的问题
         * @see https://reactnative.dev/docs/view#collapsable-android
         * Views that are only used to layout their children or otherwise don't draw anything may be automatically removed from the native hierarchy as an optimization.
         * Set this property to false to disable this optimization and ensure that this View exists in the native view hierarchy.
         */
        collapsable: false,
      })}
    </FowardedIntro>
  )
}

Intro.Provider = IntroProvider
Intro.Consumer = IntroConsumer
Intro.useContext = useIntroContext
Intro.with = withIntro
Intro.Tooltip = Tooltip

export default Intro
