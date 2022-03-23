import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useCareClass } from '../../common'
import '../../style/components/nav-bar/navbar-button.scss'
import { NavBarButtonProps } from '../../types/nav-bar'
import { Text } from '../typography'
import { TouchableOpacity } from '../view'

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
      <Text level={3} className={textClz} style={tintColor ? { color: tintColor } : {}}>
        {title}
      </Text>
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
  // tintColor: '#0076FF',
  disabled: false,
  handler: () => ({}),
}
