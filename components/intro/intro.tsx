import React, { cloneElement, ForwardedRef, forwardRef, Fragment, useEffect, useRef } from 'react'
import '../../style/components/intro/index.scss'
import { IntroProps } from '../../types/intro'
import { IntroConsumer, IntroProvider, Tooltip, useIntroContext, withIntro } from './context'
import { getBoundingClientRect } from './dom-rect'

function _Intro(props: Omit<IntroProps, 'prop'>, ref: ForwardedRef<any>) {
  const children = cloneElement(props.children, { ref })
  return <Fragment>{children}</Fragment>
}

const FowardedIntro = forwardRef(_Intro)
function Intro(props: IntroProps) {
  const ref = useRef<HTMLElement>(null as any as HTMLElement)
  const ctx = useIntroContext()

  useEffect(() => {
    if (ctx.disabled()) return
    // console.log('ref', ref)
    getBoundingClientRect(ref).then((rect) => {
      // @ts-ignore
      ctx.register({
        rect,
        prop: props.prop,
        el: React.cloneElement(props.children),
        tooltip: props,
      })
    })
  }, [])

  return <FowardedIntro ref={ref}>{props.children}</FowardedIntro>
}

Intro.Provider = IntroProvider
Intro.Consumer = IntroConsumer
Intro.useContext = useIntroContext
Intro.with = withIntro
Intro.Tooltip = Tooltip

export default Intro
