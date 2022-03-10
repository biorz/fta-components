import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { isString } from '../../common'
import '../../style/components/tag/index.scss'
import { TagProps } from '../../types/tag'

function Tag(props: TagProps): JSX.Element {
  const {
    className,
    customStyle,
    type,
    textStyle,
    textClassName,
    bgColor,
    border,
    color,
    borderColor,
    children,
    onClick,
  } = props

  const rootClz = classNames(
    'fta-tag',
    `fta-tag--${type}`,
    border && 'fta-tag--bordered',
    className
  )
  const textClz = classNames('fta-tag__text', `fta-tag__text--${type}`, textClassName)

  const rootStyle = {
    ...customStyle,
  }

  const txtStyle = {
    ...textStyle,
  }

  if (bgColor) rootStyle.backgroundColor = bgColor
  if (borderColor) rootStyle.borderColor = borderColor
  if (color) txtStyle.color = color
  return (
    <View onClick={onClick} className={rootClz} style={rootStyle}>
      {isString(children) ? (
        <Text style={txtStyle} className={textClz}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

const defaultProps: TagProps = {
  type: 'primary',
  border: true,
}

Tag.defaultProps = defaultProps

export default Tag

// export default class Tag extends Component<IProps, Istate> {
//   state = {
//     isRN: Taro.getEnv() === Taro.ENV_TYPE.RN,
//   }
//   render() {
//     const {
//       mode = 'light',
//       type = 'primary',
//       text,
//       shape = 'square',
//       size = 'medium',
//       clickTag = () => {},
//       clickIcon = () => {},
//       closeable = false,
//     } = this.props
//     const { isRN } = this.state
//     return (
//       <View className={`fta-tag  fta-shape-${shape} fta-size-${size} fta-mode-${mode}-${type}`}>
//         <Text
//           onClick={(e) => clickTag(e)}
//           className={`fta-size-${size}__word fta-mode-${mode}-${type}__word`}>
//           {text}
//         </Text>
//         {closeable && !isRN ? (
//           <Text className='fta-icon fta-icon-close' onClick={() => clickIcon()}></Text>
//         ) : null}
//         {closeable && isRN ? (
//           <Image
//             className='fta-tag__icon'
//             src='https://image.ymm56.com/ymmfile/operation-biz/f45222e4-4884-43ef-ae5b-fb2bd79d7263.png'
//           />
//         ) : null}
//       </View>
//     )
//   }
// }
