import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { cloneElement, ForwardedRef, forwardRef, Fragment, useEffect, useRef } from 'react'
import '../../style/components/intro/index.scss'
import { IntroProps, TooltipProps } from '../../types/intro'
import { IntroConsumer, IntroProvider, useIntroContext, withIntro } from './context'
import { getBoundingClientRect } from './dom-rect'

function _Intro(props: IntroProps, ref: ForwardedRef<any>) {
  const children = cloneElement(props.children, { ref })
  return <Fragment>{children}</Fragment>
}

const FowardedIntro = forwardRef(_Intro)

function Intro(props: IntroProps) {
  const ref = useRef<HTMLElement>(null as any as HTMLElement)
  const ctx = useIntroContext()

  useEffect(() => {
    if (ctx.disabled()) return
    console.log('ref', ref)
    getBoundingClientRect(ref).then((rect) => {
      // @ts-ignore
      ctx.register({
        rect,
        el: React.cloneElement(props.children, {
          style: { marginTop: rect.y, marginLeft: rect.x },
        }),
      })
    })
  }, [])

  return <FowardedIntro ref={ref}>{props.children}</FowardedIntro>
}

function Tooltip(props: TooltipProps) {
  const { tooltipClassName, tooltipStyle, title, desc, text, onClick } = props
  const rootClass = classNames('fta-intro-tooltip', tooltipClassName)
  return <View className={rootClass} style={tooltipStyle}></View>
}

Intro.Provider = IntroProvider
Intro.Consumer = IntroConsumer
Intro.useContext = useIntroContext
Intro.with = withIntro

export default Intro
