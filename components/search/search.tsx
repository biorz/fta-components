import { Image, Input, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties, Fragment, ReactElement, useState } from 'react'
import { Assets, isArray, isString, isUndef } from '../../common'
import '../../style/components/search/index.scss'
import { SearchProps, SearchResult } from '../../types/search'

const SEARCH = {
  default: Assets.search.default,
  grey: Assets.search.grey,
}
function Search(props: SearchProps): JSX.Element {
  const {
    value,
    icon,
    className,
    customStyle,
    // @ts-ignore
    style,
    inputClassName,
    inputStyle,
    children,
    hightlightColor,
    placeholderTextColor,
    clearable,
    cancelText,
    result,
    disabled,
    onCancel,
    onClear,
    onChange,
    onFocus,
    onBlur,
    onItemClick,
    ...inputProps
  } = props

  const [focused, toggleFocus] = useState(props.autoFocus || false)
  const highlightStyle = hightlightColor ? { color: hightlightColor } : void 0
  const rootClass = classNames('fta-search', className)
  const rootStyle = { ...style, ...customStyle }
  const inputClass = classNames('fta-search-input', inputClassName)
  const _onFoucs = (evt: any) => {
    toggleFocus(true)
    onFocus?.(evt)
  }

  const _onBlur = (evt: any) => {
    toggleFocus(false)
    onFocus?.(evt)
  }

  const _onItemClick = (item: SearchResult) => {
    onItemClick?.(isUndef(item.value) ? item.label : item.value)
  }

  return (
    <View className='fta-search-root'>
      <View className={rootClass} style={rootStyle}>
        {/* Input */}
        <View className='fta-search-container'>
          {isUndef(icon) || isString(icon) ? (
            <Image
              src={icon || SEARCH[focused || value?.length ? 'default' : 'grey']}
              className='fta-search-icon'
            />
          ) : (
            icon
          )}
          <Input
            disabled={disabled}
            value={value}
            className={inputClass}
            style={inputStyle}
            placeholderClass='fta-search-input--placeholder'
            // @ts-ignore
            placeholderTextColor={placeholderTextColor}
            onFocus={_onFoucs}
            onBlur={_onBlur}
            onInput={(evt) => onChange?.(evt.detail.value)}
            {...inputProps}
          />
          {/* 清空按钮 */}
          {clearable && value?.length ? (
            <Image className='fta-search-clear' src={Assets.close.circleBlack} onClick={onClear} />
          ) : null}
        </View>
        {/* 取消按钮 */}
        {focused || value?.length ? (
          <View className='fta-search-cancel' onClick={onCancel}>
            <Text className='fta-search-cancel__text'>{cancelText}</Text>
          </View>
        ) : null}
      </View>
      {children ||
        (isArray(result) ? (
          <View className='fta-search-result'>
            {result.length ? (
              result.map((item, i) => (
                <View key={i} className='fta-search-result-item' onClick={() => _onItemClick(item)}>
                  <ResultText keyword={value!} style={highlightStyle}>
                    {item.label}
                  </ResultText>
                </View>
              ))
            ) : (
              <View className='fta-search-result__empty'>
                <View className='fta-search-title'>
                  <Text className='fta-search-title__text'>搜索无结果</Text>
                </View>
                <View className='fta-search-desc'>
                  <Text className='fta-search-desc__text'>换个名称试试吧～</Text>
                </View>
              </View>
            )}
          </View>
        ) : null)}
    </View>
  )
}

function ResultText(props: {
  children: string
  keyword: string
  style?: CSSProperties
}): JSX.Element {
  const { children, keyword, style } = props
  if (!keyword) return <Text className='fta-search-result__text'>{children}</Text>
  const list = [] as ReactElement[]
  const len = keyword.length
  const reg = new RegExp(keyword, 'g')
  let t: any
  let i = 0
  let tmp: any
  while ((t = reg.exec(children))) {
    if ((tmp = children.slice(i, t.index as number))) {
      list.push(<Text className='fta-search-result__text'>{tmp}</Text>)
    }
    i = t.index
    if ((tmp = children.slice(i, i + len))) {
      list.push(
        <Text className='fta-search-result__text fta-search-result__text--hightlight' style={style}>
          {tmp}
        </Text>
      )
      i = i + len
    }
  }
  if ((tmp = children.slice(i))) {
    list.push(<Text className='fta-search-result__text'>{tmp}</Text>)
  }
  console.log('list', list.length)
  return (
    <Fragment>
      {list.map((node, i) => (
        <Fragment key={`value-${i}`}>{node}</Fragment>
      ))}
    </Fragment>
  )
}

const defaultProps: SearchProps = {
  disabled: false,
  cancelText: '取消',
  placeholderTextColor: '#cccccc',
}

Search.defaultProps = defaultProps

export default Search
