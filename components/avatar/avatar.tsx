import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { inWeapp } from '../../common'
import '../../style/components/avatar/index.scss'
import { AvatarProps } from '../../types/avatar'
import Image from '../image'
import { OpenData } from './open-data'

function Avatar(props: AvatarProps): JSX.Element {
  const {
    size,
    circle,
    src,
    text,
    openData,
    customStyle,
    textClassName,
    textStyle,
    className,
    ...imageProps
  } = props
  const rootClassName = ['fta-avatar']
  const classObject = {
    [`fta-avatar--${size}`]: true,
    'fta-avatar--circle': circle,
  }

  let letter = ''
  if (text) letter = text

  let elem: React.ReactNode
  if (inWeapp && openData && openData.type === 'userAvatarUrl') {
    elem = <OpenData type={openData.type}></OpenData>
  } else if (src) {
    console.log(classNames(rootClassName, classObject, className))
    return (
      <Image
        className={classNames(rootClassName, classObject, className)}
        style={customStyle}
        src={src}
        {...imageProps}
      />
    )
  } else {
    const textClass = classNames('fta-avatar__text', `fta-avatar--${size}__text`, textClassName)
    elem = (
      <Text className={textClass} style={textStyle}>
        {letter}
      </Text>
    )
  }
  return (
    <View className={classNames(rootClassName, classObject, props.className)} style={customStyle}>
      {elem}
    </View>
  )
}

const defaultProps: AvatarProps = {
  size: 'medium',
  circle: false,
  text: '',
  src: '',
  customStyle: {},
  className: '',
  showLoading: false,
  showError: false,
}

Avatar.defaultProps = defaultProps

const propTypes: InferProps<AvatarProps> = {
  size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
  circle: PropTypes.bool,
  text: PropTypes.string,
  src: PropTypes.string,
  openData: PropTypes.object,
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

Avatar.propTypes = propTypes

export default Avatar
