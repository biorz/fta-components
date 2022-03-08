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
import { useEnhancedState } from '../../common'
import Modal from '../../common/components/modal'
import '../../style/components/toast/index.scss'
import { ToastProps, ToastRefMethods } from '../../types/toast'
import { Text } from '../typography'

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
    style,
    transparent,
    textLevel,
    clickMaskOnClose,
  } = state

  const [visible, toggleVisible] = useState(true)
  const _ref = useRef<{ timer: NodeJS.Timer; toggleVisible: typeof toggleVisible }>({
    timer: null,
    toggleVisible,
  })
  const rootClz = classNames(
    'fta-toast',
    `fta-toast--${position}`,
    mask ? 'fta-toast--overlay' : 'fta-toast--transparent',
    className
  )
  const rootStyle = { ...style }

  const textClz = classNames('fta-toast__text', textClassName)
  if (transparent) {
    rootStyle.backgroundColor = 'transparent'
  }

  useEffect(() => {
    _ref.current.toggleVisible = toggleVisible
  }, [toggleVisible])

  /** 设置定时器 */
  const setTimer = (force?: boolean) => {
    if (duration > 0 && (force || visible)) {
      _ref.current.timer = setTimeout(() => _ref.current.toggleVisible(false), duration * 1000)
    }
  }
  /** 清除定时器 */
  const clearTimer = () => {
    // console.log('清除定时器')
    clearTimeout(_ref.current.timer)
    _ref.current.timer = null
  }

  useImperativeHandle(ref, () => ({
    show: (options?: Partial<ToastProps>) => {
      clearTimer()
      setState(options)
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
    console.log('visible', visible)
    if (visible) {
      setTimer(state.duration > 0)
      return clearTimer
    }
  }, [state, visible])

  const onMaskClick = () => {
    if (clickMaskOnClose) {
      clearTimer()
      toggleVisible(false)
    }
  }

  return (
    <Modal transparent visible={visible} useNative>
      <View className={rootClz} style={rootStyle} onClick={onMaskClick}>
        {/* @ts-ignore */}
        <Text level={textLevel} className={textClz} style={textStyle} pointerEvents='none'>
          {title}
        </Text>
      </View>
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
}

const ForwardToast = forwardRef(Toast)

ForwardToast.defaultProps = defaultProps

/**
 * useToast hooks
 * 返回当前toast ref和Element Fragment
 */
export function useToast(defaultProps: ToastProps = { title: '' }) {
  const ref = useRef<ToastRefMethods>()
  const toastInstance = useMemo(() => <ForwardToast {...defaultProps} ref={ref} />, [])
  return [ref, toastInstance] as const
}

export default ForwardToast
