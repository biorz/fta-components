import { BaseEventOrig, Image as TaroImage, Text, View } from '@tarojs/components'
import { ImageProps as TaroImageProps } from '@tarojs/components/types/Image'
import classNames from 'classnames'
import React, { Component, CSSProperties, Fragment, ReactNode } from 'react'
import '../../style/components/image/index.scss'
import { ImageProps, ImageState } from '../../types/image'

const isString = (val: unknown): val is string => typeof val === 'string'

class Image extends Component<ImageProps, ImageState> {
  public static defaultProps: ImageProps

  public state: ImageState = {
    /** 是否加载失败 */
    _errored: false,
    /** 是否加载完成 */
    _loaded: false,
  }

  constructor(props: ImageProps) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
  }

  // FIXME: 异步加载图片不生效
  public componentDidUpdate(nextProps: ImageProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        _errored: false,
        _loaded: false,
      })
    }
  }

  /**
   * 是否是加载态
   */
  public get isLoading() {
    return !this.state._errored && !this.state._loaded
  }

  public get isErrored() {
    return this.state._errored && this.props.showError
  }

  public get needLoading() {
    return !!(this.isLoading && this.props.showLoading && this.props.loadingIcon)
  }

  public get needError() {
    return !!(this.state._errored && this.props.showError && this.props.errorIcon)
  }

  public get isCircle() {
    return this.props.shape === 'circle'
  }

  public onLoad(event: unknown) {
    this.setState({
      _loaded: true,
    })
    return this.props.onLoad?.(event as BaseEventOrig<TaroImageProps.onLoadEventDetail>)
  }

  public onError(event: unknown) {
    this.setState({
      _errored: true,
    })
    return this.props.onError?.(event as BaseEventOrig<TaroImageProps.onErrorEventDetail>)
  }

  private getInlineStyle(): CSSProperties {
    // @ts-ignore
    const style = { ...this.props.style, ...this.props.customStyle }
    let i: string
    if ((i = this.props.bgColor!)) {
      style.backgroundColor = i
    }
    return style
  }

  private renderIntermediate(needRender: boolean, icon: ReactNode, className: string) {
    const circleClass = this.isCircle && 'fta-image--circle'
    return needRender ? (
      isString(icon) ? (
        <TaroImage
          src={icon}
          className={classNames(className, circleClass)}
          style={this.getInlineStyle()}
          mode={this.props.mode}
        />
      ) : (
        <View
          className={classNames(className, 'fta-image--flex', circleClass)}
          style={this.getInlineStyle()}>
          {icon}
        </View>
      )
    ) : null
  }

  public render(): JSX.Element {
    const {
      className,
      src,
      shape,
      showLoading,
      loadingIcon,
      showError,
      errorIcon,
      // ignore
      customStyle,
      bgColor,
      onError,
      onLoad,
      asyncIcon,
      ...props
    } = this.props

    const loadingClass = classNames('fta-image', className, this.isCircle && 'fta-image--circle')

    // 异步加载的image先返回占位符
    if (!src && asyncIcon !== false) {
      return asyncIcon || <View className={loadingClass} style={this.getInlineStyle()} />
    }

    const rootClass = classNames(
      loadingClass,
      ((showLoading && this.isLoading) || this.isErrored) && 'fta-image--loading',
      this.isErrored && 'fta-image--errored'
    )

    return (
      <Fragment>
        {/* 加载中 */}
        {this.renderIntermediate(this.needLoading, loadingIcon, loadingClass)}
        {/* 加载失败 */}
        {this.renderIntermediate(this.needError, errorIcon, loadingClass)}
        <TaroImage
          {...props}
          src={src}
          className={rootClass}
          style={this.getInlineStyle()}
          onLoad={this.onLoad}
          onError={this.onError}
        />
      </Fragment>
    )
  }
}

Image.defaultProps = {
  showLoading: true,
  showError: true,
  loadingIcon: <Text className='fta-image--flex__text'>加载中</Text>,
  errorIcon: <Text className='fta-image--flex__text'>加载失败</Text>,
  src: '',
}

export default Image
