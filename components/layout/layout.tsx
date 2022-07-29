import { ScrollView, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../style/components/layout/index.scss'
import { LayoutProps } from '../../types/layout'
import NavBar from '../nav-bar'
import SafeArea from '../safe-area'

function Layout(props: LayoutProps) {
  const {
    scrollable,
    rootClassName,
    rootStyle,
    wrapperClassName,
    wrapperStyle,
    children,
    customWrapper,
    ...navBarprops
  } = props
  const Wrapper = customWrapper || (scrollable ? ScrollView : View)
  const rootCls = classNames('fta-layout', rootClassName)
  const wrapperCls = classNames('fta-layout-wrapper', wrapperClassName)
  console.log('wrapper =', Wrapper === ScrollView)
  return (
    <View className={rootCls} style={rootStyle}>
      <NavBar {...navBarprops} />
      <Wrapper className={wrapperCls} style={wrapperStyle} scrollY>
        {children}
      </Wrapper>
      <SafeArea />
    </View>
  )
}

const defaultProps: LayoutProps = {
  scrollable: true,
}

Layout.defaultProps = defaultProps

export default Layout
