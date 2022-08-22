import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import '../../style/components/form/index.scss'
import { FormCaptcha } from '../../types/form'

const nullTimer = null as unknown as NodeJS.Timer

const Captcha: typeof FormCaptcha = forwardRef((props, ref) => {
  const { style, className, textClassName, textStyle, format, duration, text, onClick } = props
  const [dura, setDura] = useState(duration! + 1)
  const timerRef = useRef<NodeJS.Timer>(nullTimer)

  const rootClass = classNames('fta-form-captcha', className)
  const textClass = classNames('fta-form-captcha__text', textClassName)

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = nullTimer
    }
  }

  const countdown = () => {
    resetTimer()
    setDura(duration!)
    timerRef.current = setInterval(() => {
      setDura((val) => val - 1)
    }, 1000)
  }

  const onCountdown = async () => {
    if (dura && timerRef.current) return
    // setDura(duration! - 1)
    if ((await onClick!()) !== false) {
      countdown()
    }
  }

  useEffect(() => resetTimer, [])

  useEffect(() => {
    if (!dura) {
      resetTimer()
      setDura(duration! + 1)
    }
  }, [dura])

  useImperativeHandle(ref, () => ({
    countdown,
    reset() {
      if (timerRef.current) {
        resetTimer()
        setDura(duration! + 1)
      }
    },
  }))

  return (
    <View className={rootClass} style={style} onClick={onCountdown}>
      <Text className={textClass} style={textStyle}>
        {dura && timerRef.current ? format!(dura) : text}
      </Text>
    </View>
  )
})

Captcha.defaultProps = {
  duration: 60,
  text: '获取验证码',
  format: (dura) => `${dura}s`,
  onClick: () => {},
}

export default Captcha
