import React from 'react'
import { renderToString } from 'nerv-server'
import Avatar from '../../lib/components/avatar'

describe('Avatar Snap', () => {
  it('render Avatar -- props size(large) ', () => {
    const component = renderToString(<Avatar size='large' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props size(normal) ', () => {
    const component = renderToString(<Avatar size='normal' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props size(small) ', () => {
    const component = renderToString(<Avatar size='small' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props circle', () => {
    const component = renderToString(<Avatar circle />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props image', () => {
    const component = renderToString(<Avatar image='https://jdc.jd.com/img/100' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props text', () => {
    const component = renderToString(<Avatar text='凹凸实验室' />)
    expect(component).toMatchSnapshot()
  })
})
