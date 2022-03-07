import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Fragment } from 'react'
import Modal from '../../common/components/modal'
import '../../style/components/divider/index.scss'
import { DrawerProps, DrawerState } from '../../types/drawer'
import List, { ListItem } from '../list'
import SafeArea from '../safe-area'

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
  public static defaultProps: DrawerProps
  public static propTypes: InferProps<DrawerProps>

  public constructor(props: DrawerProps) {
    super(props)
    this.state = {
      animShow: false,
      _show: props.show,
    }
  }

  public inRN = process.env.TARO_ENV === 'rn'

  public componentDidMount(): void {
    const { _show } = this.state
    if (_show) this.animShow()
  }

  private onItemClick(index: number): void {
    this.props.onItemClick && this.props.onItemClick(index)
    this.animHide()
  }

  private onHide(): void {
    this.setState({ _show: false }, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  private animHide(): void {
    this.setState({
      animShow: false,
    })
    if (this.inRN) {
      return this.onHide()
    }
    setTimeout(() => {
      this.onHide()
    }, 300)
  }

  private animShow(): void {
    this.setState({ _show: true })
    if (this.inRN) {
      this.setState({
        animShow: true,
      })
      return
    }
    setTimeout(() => {
      this.setState({
        animShow: true,
      })
    }, 200)
  }

  private onMaskClick(): void {
    this.animHide()
  }

  public UNSAFE_componentWillReceiveProps(nextProps: DrawerProps): void {
    const { show } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide()
    }
  }

  public render(): JSX.Element {
    const { mask, width, right, items, useNativeModal } = this.props
    const { animShow, _show } = this.state
    const rootClassName = ['fta-drawer']

    const maskStyle = {
      display: mask ? 'flex' : 'none',
      opacity: animShow ? 1 : 0,
    }
    const listStyle = this.inRN
      ? {}
      : {
          width,
          transition: animShow
            ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
            : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
        }

    const classObject = {
      'fta-drawer--show': animShow,
      'fta-drawer--right': right,
      'fta-drawer--left': !right,
    }

    const viewBody = _show ? (
      <Fragment>
        <View
          className='fta-drawer__mask'
          style={maskStyle}
          onClick={this.onMaskClick.bind(this)}></View>
        <View className={classNames('fta-drawer__content', classObject)} style={listStyle}>
          <SafeArea.View>
            {!!items && items.length ? (
              <List>
                {items.map((name, index) => (
                  <ListItem
                    key={`${name}-${index}`}
                    data-index={index}
                    onClick={this.onItemClick.bind(this, index)}
                    title={name}
                    arrow='right'
                  />
                ))}
              </List>
            ) : (
              this.props.children
            )}
          </SafeArea.View>
        </View>
      </Fragment>
    ) : (
      <Fragment />
    )

    return _show ? (
      this.inRN ? (
        viewBody
      ) : (
        <Modal transparent useNative={useNativeModal}>
          <View className={classNames(rootClassName, classObject, this.props.className)}>
            {viewBody}
          </View>
        </Modal>
      )
    ) : (
      <Fragment />
    )
  }
}

Drawer.defaultProps = {
  show: false,
  mask: true,
  width: '',
  right: false,
  items: [],
  useNativeModal: true,
}

Drawer.propTypes = {
  show: PropTypes.bool,
  mask: PropTypes.bool,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
}
