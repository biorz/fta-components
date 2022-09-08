import { Image, Input, View } from '@tarojs/components'
import React from 'react'
import '../../style/components/selector/index.scss'
import { SearchProps } from '../../types/selector'
import { SEARCH } from './static'

export default function Search(props: SearchProps) {
  const { placeholder, value, onChange, ...extraProps } = props
  return (
    <View className='fta-selector-search'>
      <Image src={SEARCH} className='fta-selector-search__icon' />
      <Input
        className='fta-selector-search__input'
        placeholder={placeholder}
        value={value}
        onInput={(evt) => onChange(evt.detail.value)}
        // @ts-ignore
        placeholderTextColor='#C7C7C7'
        {...extraProps}
      />
    </View>
  )
}
