import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { Assets, isString } from '../../common'
import '../../style/components/upload/index.scss'
import { UploadProps } from '../../types/upload'

function Upload(props: UploadProps): JSX.Element {
  const {
    camera,
    placeholder,
    customStyle,
    className,
    error,
    image,
    src,
    errorTip,
    // @ts-ignore
    style,
    ...extraProps
  } = props

  const rootClz = classNames('fta-upload', className, {
    'fta-upload--error': error,
    'fta-upload--empty': !src && !image,
  })
  return (
    <View>
      <View className={rootClz} style={{ ...style, ...customStyle }} {...extraProps}>
        {src ? (
          <Image src={src} className='fta-upload-image' mode='aspectFill'></Image>
        ) : (
          <>
            {image ? <Image src={image} className='fta-upload-image'></Image> : null}
            <Image src={camera!} className='fta-upload-camera'></Image>
            {isString(placeholder) ? (
              <Text className='fta-upload-placeholder'>{placeholder}</Text>
            ) : (
              placeholder
            )}
          </>
        )}
      </View>
      {error && errorTip ? (
        isString(errorTip) ? (
          <Text className='fta-upload-errortip'>{errorTip}</Text>
        ) : (
          errorTip
        )
      ) : null}
    </View>
  )
}

const defaultProps: UploadProps = {
  camera: Assets.camera.default,
  placeholder: '上传图片',
  error: false,
  errorTip: '请重新上传',
}

Upload.defaultProps = defaultProps

export default Upload
