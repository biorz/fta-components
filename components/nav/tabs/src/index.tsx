import { ConfigConsumer, useClassWithCare } from '@fta/common'
import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { InferProps } from 'prop-types'
import React, {
  cloneElement,
  Component,
  Fragment,
  isValidElement,
  ReactNode,
  ReactNodeArray,
} from 'react'
import { TabProps, TabsProps, TabsState } from '../types'
import { TabContext } from './context'
import './style/index.scss'

/**
 * 克隆子节点（数组）
 */
function cloneChidren(nodeList: ReactNodeArray, index: number) {
  let tabCursor = 0
  return nodeList.map((el, i) => {
    // 如果不是合法的element就不做处理，直接返回
    if (!isValidElement(el) || el.type !== Tab) return <Fragment key={i}>{el}</Fragment>
    return cloneElement(el, {
      active: index === tabCursor,
      key: 'fta_tab_' + tabCursor,
      index: tabCursor++,
    })
  })
}

const isString = (val: unknown): val is string => typeof val === 'string'

const isPrimitive = (val: unknown): val is string | number | boolean =>
  ['number', 'string', 'boolean'].includes(typeof val)

/**
 * @component
 * Tabs 包裹层
 */
class Tabs extends Component<TabsProps, TabsState> {
  public static defaultProps: InferProps<TabsProps>
  public state: TabsState = {
    _activeIndex: this.props.activeIndex || 0,
  }

  private _onChange = (i: number, val: any) => {
    this.setState({ _activeIndex: i })
    this.props.onChange?.(i, val)
  }

  private get activeIndex() {
    return this.props.controls ? this.props.activeIndex : this.state._activeIndex
  }

  public static Tab: typeof Tab
  public render(): JSX.Element {
    const { className, style, children, scrollable, options, controls, ...props } = this.props
    const activeIndex = this.activeIndex
    const { vertical } = this.props
    let clonedChildren: ReactNode

    if (Array.isArray(options)) {
      clonedChildren = options.map((item, i) => {
        // 文本直接返回
        if (isPrimitive(item))
          return (
            <Tab
              active={i === activeIndex}
              key={i}
              index={i}
              value={item}
              className={classNames(this.props.tabClassName)}>
              {item + ''}
            </Tab>
          )
        // 解析对象形式
        const { label, labelClassName, labelStyle, className, style, ...props } = item
        return (
          <Tab
            className={classNames(className, this.props.tabClassName)}
            style={style}
            active={i === activeIndex}
            key={i}
            index={i}
            {...props}>
            {isString(label) ? (
              <Text style={labelStyle} className={labelClassName}>
                {label}
              </Text>
            ) : (
              label
            )}
          </Tab>
        )
      })
    } else {
      // 克隆子节点，注入相关props
      clonedChildren = Array.isArray(children) ? cloneChidren(children, activeIndex) : children
    }

    const rootClass = classNames('fta-tabs', vertical && 'fta-tabs--vertical', className)
    const RootView = scrollable ? ScrollView : View
    const scrollProps = {
      [`scroll${vertical ? 'Y' : 'X'}`]: true,
    }
    return (
      <TabContext.Provider value={controls ? props : { ...props, onChange: this._onChange }}>
        <RootView className={rootClass} style={style} {...props} {...scrollProps}>
          {clonedChildren}
        </RootView>
      </TabContext.Provider>
    )
  }
}

Tabs.defaultProps = {
  activeIndex: 0,
  onChange: null,
  disabled: false,
  scrollable: false,
  vertical: false,
  options: null,
  controls: true,
}

/**
 * @component
 * 单个Tab项
 */
class Tab extends Component<TabProps> {
  public static defaultProps: InferProps<TabProps>

  public render(): JSX.Element {
    const { className, style, disabled, active, children, index, value } = this.props

    return (
      <ConfigConsumer>
        {({ careMode }) => (
          <TabContext.Consumer>
            {(context) => {
              // console.log(context.tabClassName, ' context.tabClassName')
              const isDisabled = disabled || context.disabled
              const rootClass = classNames(
                'fta-tab',
                context.vertical && 'fta-tab--vertical',
                context.tabClassName,
                className,
                isDisabled
                  ? 'fta-tab--disabled'
                  : active &&
                      classNames(
                        useClassWithCare(careMode, ['fta-tab--active']),
                        context.activeClassName
                      ),
                isDisabled && context.disabledClassName
              )
              return (
                <View
                  className={rootClass}
                  style={style}
                  onClick={() => isDisabled || context.onChange?.(index, value)}>
                  {isString(children) ? (
                    <Text
                      className={classNames(
                        useClassWithCare(careMode, ['fta-tab__text']),
                        isDisabled
                          ? 'fta-tab--disabled__text'
                          : active
                          ? 'fta-tab--active__text'
                          : null
                      )}>
                      {children}
                    </Text>
                  ) : (
                    children
                  )}
                </View>
              )
            }}
          </TabContext.Consumer>
        )}
      </ConfigConsumer>
    )
  }
}

Tab.defaultProps = {
  active: false,
  disabled: false,
}

// Tab.displayName = 'FTA-tab'

Tabs.Tab = Tab

export { Tab }

export default Tabs
