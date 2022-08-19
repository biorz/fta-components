import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  cloneElement,
  forwardRef,
  Fragment,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { inRN, isFunction, isString, px, useMeasure } from '../../common'
import '../../style/components/tooltip/index.scss'
import { Rect, TooltipProps, TooltipViewProps } from '../../types/tooltip'
import createRootSiblings, { withRootSiblings } from './root-siblings'

const useOnceCallback = (cb) => {
  const timesRef = useRef(true)
  const resRef = useRef<any>()
  if (timesRef.current) {
    timesRef.current = false
    resRef.current = cb()
  }
  return resRef
}

//
createRootSiblings
function Tooltip(props: TooltipProps) {
  const {
    children,
    className,
    customStyle,
    // @ts-ignore
    style,
    content,
    isOpened,
    icon,
    iconClassName,
    iconStyle,
    contentClassName,
    contentStyle,
    popoverClassName,
    popoverStyle,
    textClassName,
    textStyle,
  } = props

  const rootClass = classNames('fta-tooltip', className)
  const iconClass = classNames('fta-tooltip-popover__icon', iconClassName)
  const popClass = classNames('fta-tooltip-popover', popoverClassName)
  const textClass = classNames('fta-tooltip-popover__content__text', textClassName)
  const contentClass = classNames('fta-tooltip-popover__content', contentClassName)
  return (
    <View className={rootClass} style={{ ...style, ...customStyle }}>
      {isOpened ? (
        <View
          className={popClass}
          style={popoverStyle}
          // @ts-ignore
          pointerEvents='box-none'>
          <View className={contentClass} style={contentStyle}>
            {isString(content) ? (
              <Text className={textClass} style={textStyle}>
                {content}
              </Text>
            ) : (
              content
            )}
          </View>
          <Image className={iconClass} style={iconStyle} src={icon!} />
        </View>
      ) : null}
      {children}
    </View>
  )
}

const defaultRect: Rect = {
  left: 0,
  right: 0,
  // hack
  top: -0.1,
  bottom: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
}

const position = inRN ? 'absolute' : 'fixed'

function _TooltipView(props: TooltipViewProps, ref: Ref<any>) {
  const {
    children,
    render,
    overlay,
    overlayClassName,
    overlayStyle,
    clickOverlayOnClose = true,
  } = props
  const [visible, setVisible] = useState(false)
  const [rect, setRect] = useState<Rect>(defaultRect)
  const [refs, measure] = useMeasure()
  const clonedChildren = cloneElement(children, refs)

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
    measure: () => measure().then(setRect),
  }))

  useEffect(() => {
    if (visible) {
      measure().then((res) => {
        console.log('res', res)
        setRect(res)
      })
    }
  }, [visible])

  useEffect(() => {
    inRN && sRef.current?.update?.(renderTooltip())

    return () => inRN && sRef.current?.destroy?.()
  })

  const renderTooltip = () => {
    if (visible) {
      const wrapperEl =
        rect.top === -0.1 ? null : isFunction(render) ? (
          render(rect)
        ) : (
          <View style={{ position, top: px(rect.top), left: px(rect.left), zIndex: 100 }}>
            {render}
          </View>
        )
      return overlay ? (
        <View
          className={classNames('fta-tooltip-overlay', overlayClassName)}
          style={overlayStyle}
          onClick={() => {
            clickOverlayOnClose && setVisible(false)
          }}>
          {wrapperEl}
        </View>
      ) : (
        wrapperEl
      )
    }
    return <Fragment />
  }

  const sRef = useOnceCallback(() => createRootSiblings(renderTooltip()))

  return (
    <Fragment>
      {inRN ? null : renderTooltip()}
      {clonedChildren}
    </Fragment>
  )
}

const TooltipView = forwardRef(_TooltipView)

const defaultProps: TooltipProps = {
  isOpened: true,
  icon: 'https://imagecdn.ymm56.com/ymmfile/static/resource/006b5964-32f4-47ba-9c5f-6209360421ad.png',
}

Tooltip.defaultProps = defaultProps

export { Tooltip as default, TooltipView, withRootSiblings as withTooltip }
