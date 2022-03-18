import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { inRN, useEnhancedState } from '../../common'
import Modal from '../../common/components/modal'
import '../../style/components/toast/index.scss'
import { ToastProps, ToastRefMethods } from '../../types/toast'
import Loading from '../loading'
import { Text } from '../typography'

const nullTimer = null as unknown as NodeJS.Timer

function Toast(props: ToastProps, ref: Ref<ToastRefMethods>): JSX.Element {
  const [state, setState] = useEnhancedState(props)
  const {
    title,
    duration,
    mask,
    position,
    textClassName,
    textStyle,
    className,
    customStyle,
    transparent,
    textLevel,
    clickMaskOnClose,
    loading,
    icon,
    useNative,
    containerClassName,
    customContainerStyle,
    onMaskClick,
  } = state

  const [visible, toggleVisible] = useState(false)
  const _ref = useRef<{ timer: NodeJS.Timer; toggleVisible: typeof toggleVisible }>({
    timer: nullTimer,
    toggleVisible,
  })
  const rootClz = classNames(
    'fta-toast',
    `fta-toast--${position}`,
    !useNative && inRN && 'fta-toast--custom',
    mask ? 'fta-toast--overlay' : 'fta-toast--transparent',
    className
  )
  const containerClz = classNames(
    'fta-toast-view',
    icon && 'fta-toast-view--icon',
    loading && 'fta-toast-view--loading',
    containerClassName
  )
  const rootStyle = { ...customStyle }

  const textClz = classNames('fta-toast__text', icon && 'fta-toast__text--icon', textClassName)
  if (transparent) {
    rootStyle.backgroundColor = 'transparent'
  }

  useEffect(() => {
    _ref.current.toggleVisible = toggleVisible
  }, [toggleVisible])

  /** 设置定时器 */
  const setTimer = (force?: boolean) => {
    if (duration! > 0 && (force || visible)) {
      _ref.current.timer = setTimeout(() => _ref.current.toggleVisible(false), duration! * 1000)
    }
  }
  /** 清除定时器 */
  const clearTimer = () => {
    // console.log('清除定时器')
    clearTimeout(_ref.current.timer)
    _ref.current.timer = nullTimer
  }

  useImperativeHandle(ref, () => ({
    show: (options?: Partial<ToastProps>) => {
      clearTimer()
      setState(options!)
      toggleVisible(true)
      // setTimer(options.duration > 0)
    },
    hide: () => {
      clearTimer()
      toggleVisible(false)
    },
  }))

  useEffect(() => {
    setState(props)
  }, [props])

  useEffect(() => {
    if (!_ref.current.timer) {
      setTimer()
    }
    return clearTimer
  }, [])

  useEffect(() => {
    if (visible) {
      setTimer(state.duration! > 0)
      return clearTimer
    }
  }, [state, visible])

  const _onMaskClick = () => {
    if (clickMaskOnClose) {
      clearTimer()
      toggleVisible(false)
    }
    onMaskClick!()
  }

  const ToastView = (
    <View className={rootClz} style={rootStyle} onClick={_onMaskClick}>
      <View className={containerClz} style={customContainerStyle}>
        {loading === true ? <Loading useImage className='fta-toast-loading' /> : loading}
        {!loading && icon}
        {title ? (
          /* @ts-ignore */
          <Text level={textLevel} className={textClz} style={textStyle} pointerEvents='none'>
            {title}
          </Text>
        ) : null}
      </View>
    </View>
  )

  return (
    <Modal transparent visible={visible} useNative={useNative}>
      {inRN ? ToastView : visible ? ToastView : null}
    </Modal>
  )
}

const defaultProps: ToastProps = {
  title: '',
  duration: 2,
  mask: true,
  transparent: true,
  position: 'center',
  textLevel: 4,
  clickMaskOnClose: false,
  loading: false,
  icon: false,
  useNative: true,
  onMaskClick: () => {},
}

const ForwardToast = forwardRef(Toast)

ForwardToast.defaultProps = defaultProps

/**
 * useToast hooks
 * 返回当前toast ref和Element Fragment
 */
export function useToast(defaultProps: ToastProps = { title: '' }) {
  const ref = useRef<ToastRefMethods>() as React.MutableRefObject<ToastRefMethods>
  const toastInstance = useMemo(() => <ForwardToast {...defaultProps} ref={ref} />, [])
  return [ref, toastInstance] as const
}

export default ForwardToast
