import { Image, OpenData, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { inWeapp } from '../../common'
import { AvatarProps } from '../../types/avatar'

const SIZE_CLASS = {
  mini: 'mini',
  large: 'large',
  normal: 'normal',
  small: 'small',
}
function Avatar(props: AvatarProps): JSX.Element {
  const { size, circle, image, text, openData, customStyle } = props
  const rootClassName = ['fta-avatar']
  const iconSize = SIZE_CLASS[size || 'normal']
  const classObject = {
    [`fta-avatar--${iconSize}`]: iconSize,
    'fta-avatar--circle': circle,
  }

  let letter = ''
  if (text) letter = text[0]

  let elem: React.ReactNode
  if (openData && openData.type === 'userAvatarUrl' && inWeapp) {
    elem = <OpenData type={openData.type}></OpenData>
  } else if (image) {
    elem = <Image className='fta-avatar__img' src={image} />
  } else {
    elem = <Text className='fta-avatar__text'>{letter}</Text>
  }
  return (
    <View className={classNames(rootClassName, classObject, props.className)} style={customStyle}>
      {elem}
    </View>
  )
}

const defaultProps: AvatarProps = {
  size: 'normal',
  circle: false,
  text: '',
  image: '',
  customStyle: {},
  className: '',
}

Avatar.defaultProps = defaultProps

const propTypes: InferProps<AvatarProps> = {
  size: PropTypes.oneOf(['large', 'normal', 'small', 'mini']),
  circle: PropTypes.bool,
  text: PropTypes.string,
  image: PropTypes.string,
  openData: PropTypes.object,
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

Avatar.propTypes = propTypes
