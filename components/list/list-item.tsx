import { Image, Text, View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { CSSProperties } from 'react'
import { Assets, ConfigConsumer, inRN, px, useClassesWithCare } from '../../common'
import '../../style/components/list/list-item.scss'
import { ListItemProps } from '../../types/list'

export default class ListItem extends React.Component<ListItemProps> {
  public static defaultProps: ListItemProps
  public static propTypes: InferProps<ListItemProps>

  private handleClick = (event: ITouchEvent): void => {
    if (typeof this.props.onClick === 'function' && !this.props.disabled) {
      this.props.onClick(event)
    }
  }

  // private handleSwitchClick(e: CommonEvent): void {
  //   e.stopPropagation()
  // }

  // private handleSwitchChange = (event: CommonEvent): void => {
  //   if (typeof this.props.onSwitchChange === 'function' && !this.props.disabled) {
  //     this.props.onSwitchChange(event)
  //   }
  // }

  public render(): JSX.Element {
    const {
      note,
      arrow,
      thumb,
      iconInfo,
      disabled,
      hasBorder,
      extraThumb,
      // isSwitch,
      // switchColor,
      // switchIsCheck,
    } = this.props

    let { extraText, title } = this.props

    extraText = String(extraText)
    title = String(title)
    const iconStyle: CSSProperties = {}
    if (iconInfo?.color) {
      iconStyle.color = iconInfo.color
    }
    if (iconInfo?.size) {
      iconStyle.fontSize = px(iconInfo.size)
    }

    return (
      <ConfigConsumer>
        {({ careMode }) => {
          const iconClz: string[] = []
          if (iconInfo?.value) {
            iconClz.push(
              `${(iconInfo && iconInfo.prefixClass) || 'fta-icon'}-${iconInfo && iconInfo.value}`
            )
          }
          const [
            rootCareClz,
            iconCareClz,
            thumbCareClz,
            titleClz,
            noteClz,
            extraClz,
            extraImgClz,
            arrowClz,
          ] = useClassesWithCare(
            careMode,
            ['fta-list__item', thumb && 'fta-list__item--thumb'],
            iconClz,
            ['item-thumb'],
            ['item-content__info-title'],
            ['item-content__info-note'],
            ['item-extra__info'],
            ['item-extra__image'],
            ['item-extra__icon-arrow']
          )

          return (
            <View>
              <View
                className={classNames(
                  rootCareClz,
                  {
                    'fta-list__item--multiple': note,
                    'fta-list__item--disabled': disabled,
                    'fta-list__item--no-border': !hasBorder,
                  },
                  this.props.className
                )}
                onClick={this.handleClick}
                hoverStyle={disabled || { backgroundColor: '#F0F0F0' }}>
                <View className='fta-list__item-container'>
                  {thumb && (
                    <View className={classNames('fta-list__item-thumb', thumbCareClz)}>
                      <Image className='item-thumb__info' mode='scaleToFill' src={thumb} />
                    </View>
                  )}
                  {iconInfo && iconInfo.value ? (
                    <View className='fta-list__item-icon item-icon'>
                      <Text
                        className={classNames(
                          iconCareClz,
                          (iconInfo && iconInfo.prefixClass) || 'fta-icon',
                          iconInfo && iconInfo.className
                        )}
                        style={iconStyle}></Text>
                    </View>
                  ) : null}
                  <View className='fta-list__item-content item-content'>
                    <Text className={titleClz}>{title}</Text>
                    {note ? (
                      <View>
                        <Text className={noteClz}>{note}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View className='fta-list__item-extra item-extra'>
                    {extraText && <Text className={extraClz}>{extraText}</Text>}

                    {extraThumb && !extraText && (
                      <View className={extraImgClz}>
                        <Image
                          className='item-extra__image-info'
                          mode='aspectFit'
                          src={extraThumb}
                        />
                      </View>
                    )}

                    {/* {isSwitch && !extraThumb && !extraText && (
                    <View className='item-extra__switch' onClick={this.handleSwitchClick}>
                      <Switch
                        color={switchColor}
                        disabled={disabled}
                        checked={switchIsCheck}
                        onChange={this.handleSwitchChange}
                      />
                    </View>
                  )} */}

                    {arrow ? (
                      <View className='item-extra__icon'>
                        {!inRN ? (
                          <Text
                            className={classNames(
                              `fta-icon fta-icon-chevron-${arrow === true ? 'right' : arrow}`,
                              arrowClz
                            )}
                          />
                        ) : (
                          <Image
                            mode='aspectFit'
                            className={classNames('fta-icon', arrowClz)}
                            src={Assets.arrow[arrow as 'up' | 'right' | 'down']}
                          />
                        )}
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
              {inRN && hasBorder ? <View className='item-border-line' /> : null}
            </View>
          )
        }}
      </ConfigConsumer>
    )
  }
}

ListItem.defaultProps = {
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  // isSwitch: false,
  hasBorder: true,
  // switchColor: '#6190E8',
  // switchIsCheck: false,
  extraText: '',
  extraThumb: '',
  iconInfo: { value: '' },
}

ListItem.propTypes = {
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  onClick: PropTypes.func,
  // isSwitch: PropTypes.bool,
  hasBorder: PropTypes.bool,
  // switchColor: PropTypes.string,
  // switchIsCheck: PropTypes.bool,
  extraText: PropTypes.string,
  extraThumb: PropTypes.string,
  // onSwitchChange: PropTypes.func,
  arrow: PropTypes.oneOf(['up', 'down', 'right', true, false]),
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }),
}
