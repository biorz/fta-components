import { useCareClass } from '@fta/common'
import { TouchableOpacity } from '@fta/components-view'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavBarButtonProps } from '../types'
import './style/navbar-button.scss'

export default function NavbarButton(props: NavBarButtonProps): JSX.Element {
  const textClz = useCareClass(['fta-nav-bar-button__text'])
  // console.log('渲染button', props)
  const { style, className, tintColor, title, handler, disabled, accessible, accessibilityLabel } =
    props
  const rootClass = classNames('fta-nav-bar-button', className)
  return (
    <TouchableOpacity
      className={rootClass}
      style={style}
      onClick={handler}
      disabled={disabled}
      // @ts-ignore
      accessible={accessible}
      // @ts-ignore
      accessibilityLabel={accessibilityLabel}>
      <View style={style}>
        <Text className={textClz} style={tintColor ? { color: tintColor } : null}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

NavbarButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tintColor: PropTypes.string,
  title: PropTypes.string,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  accessible: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}

NavbarButton.defaultProps = {
  style: {},
  title: '',
  tintColor: '#0076FF',
  disabled: false,
  handler: () => ({}),
}
