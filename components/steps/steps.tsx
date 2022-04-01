import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { cloneElement } from 'react'
import { isArray, isString } from '../../common'
import '../../style/components/steps/index.scss'
import { StepsItemProps, StepsProps } from '../../types/steps'

function Steps(props: StepsProps): JSX.Element {
  const { children, items, current, type, onChange, format } = props

  return (
    <View className='fta-steps'>
      {children?.map?.((child, index) =>
        cloneElement(child, {
          index,
          type,
          endpoint: index === children!.length - 1,
          startpoint: !index,
          onChange: (i: number) => i !== current && onChange!(i),
          key: index,
          active: current! >= index,
          current: current === index,
          mark: isArray(format) ? format[index] : format!(index),
        })
      ) ||
        items!.map((item, index) => (
          <StepsItem
            onChange={(i) => i !== current && onChange!(i)}
            key={index}
            index={index}
            active={current! >= index}
            current={current === index}
            type={type}
            startpoint={!index}
            endpoint={index === items!.length - 1}
            mark={isArray(format) ? format[index] : format!(index)}
            {...item}
          />
        ))}
    </View>
  )
}
/**
 * @type {StepsProps}
 */
Steps.defaultProps = {
  items: [],
  current: 0,
  type: 'dot',
  onChange: () => {},
  format: (i: number) => i + 1,
}

function StepsItem(props: StepsItemProps): JSX.Element {
  const {
    title,
    desc,
    startpoint,
    endpoint,
    active,
    type,
    current,
    index,
    mark,
    onChange,
    render,
  } = props
  const rootClz = classNames('fta-step')
  const wrapClz = classNames('fta-step-wrap', `fta-step-wrap--${type}`)
  const ballClz = classNames(
    'fta-step-ball',
    type === 'dot' ? 'fta-step-ball--dot' : 'fta-step-ball--ordered',
    {
      'fta-step-ball--active': active,
    }
  )
  const leftLineClz = classNames('fta-step-line', {
    'fta-step-line--active': active,
  })
  const rightLineClz = classNames('fta-step-line', {
    'fta-step-line--active': active,
    'fta-step-line--inactive': current,
  })
  const titleClz = classNames('fta-step-title__text', {
    'fta-step-title__text--active': active,
  })

  const descClz = desc
    ? classNames('fta-step-desc__text', {
        'fta-step-desc__text--active': active,
      })
    : void 0

  return (
    <View className={rootClz} onClick={() => onChange?.(index!)}>
      {/* 上层 */}
      <View className={wrapClz}>
        {startpoint ? <View className='fta-step-lineless' /> : <View className={leftLineClz} />}
        {type === 'custom' && render ? (
          render
        ) : (
          <View className={ballClz}>
            {type !== 'dot' ? <Text className='fta-step-index'>{mark}</Text> : null}
          </View>
        )}
        {endpoint ? <View className='fta-step-lineless' /> : <View className={rightLineClz} />}
      </View>
      {/* 标题 */}
      <View className='fta-step-title'>
        {isString(title) ? <Text className={titleClz}>{title}</Text> : title}
      </View>
      {/* 描述 */}
      {desc ? (
        <View className='fta-step-desc'>
          {isString(desc) ? <Text className={descClz}>{desc}</Text> : desc}
        </View>
      ) : null}
    </View>
  )
}

/**
 * @type {StepsProps}
 */
StepsItem.defaultProps = {
  type: 'dot',
}

export { StepsItem, Steps as default }
