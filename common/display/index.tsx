import { Gap, inAlipay, inRN, NavBar, SafeArea, Tabs, TouchableOpacity } from '@fta/components'
import {
  inWeapp,
  useCareClass,
  useCareClasses,
  useCarelessClass,
  useConfig,
  withCare as nativeWithCare,
} from '@fta/components/common'
import { Input, ScrollView, Text, View } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import { ViewProps } from '@tarojs/components/types/View'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import React, {
  ChangeEvent,
  Component,
  ComponentProps,
  ComponentType,
  CSSProperties,
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { Debugger } from '../debugger'
import './index.scss'
import MBBridge from './polyfill/bridge'
import copyToClipboard from './polyfill/clipboard'
import QRCode from './qrcode'

export { Tabs, Gap }

const EmptyComponent = () => null

const THEME_KEY = '--fta-brand-color'
const DEFAULT_COLOR = '#1F5DE9'

const setThemeColor = (color: string) => {
  if (inFTAView) {
    const root = document.documentElement
    root.style.setProperty(THEME_KEY, color)
    sessionStorage[THEME_KEY] = color
  }
}

const getThemeColor = () => inFTAView && (sessionStorage.getItem(THEME_KEY) || DEFAULT_COLOR)

interface DemoAreaProps<P = object> {
  /**
   * 演示区域标题
   * @default '演示'
   */
  title?: string
  children?: ReactNode
  props?: P
  render?: ComponentType<P>
  parent?: ComponentType
  parentProps?: any
  className?: string
  style?: CSSProperties | string
  repeat?: number | boolean
}
const toRaw = Object.prototype.toString
const isString = (val: unknown): val is string => typeof val === 'string'
const isObject = (val: unknown): val is object => toRaw.call(val).slice(8, -1) === 'Object'

function assemblePropsToString(props: object) {
  // @ts-ignore
  const { children, ...extraProps } = props
  // console.log((window.dddd = children), 'dddddd')
  return Object.entries(extraProps)
    .map(
      ([key, val]) =>
        ` ${key}=${
          isString(val) ? `'${val}'` : isObject(val) ? `{${JSON.stringify(val)}}` : `{${val}}`
        }`
    )
    .join('')
}

/** 组装组件样例代码 */
function assembleSampleCode(params: {
  render?: ComponentType<any>
  parent?: ComponentType<any>
  parentProps?: object
  props?: object
}): string {
  const { render, parent, parentProps = {}, props = {} } = params
  const renderPropsStr = assemblePropsToString(props)
  let renderStr = render?.name
    ? `<${render.name}${renderPropsStr}>${props.children == null ? '' : props.children}</${
        render.name
      }>`
    : ''
  if (parent?.name) {
    return `
    <${parent.name}${assemblePropsToString(parentProps)}>${renderStr}</${parent.name}>`
  } else {
    return renderStr
  }
}

function createDemoHOC<P extends object>(
  Comp: ComponentType<P>,
  extra: { props: P; repeat?: number | boolean; parent?: ComponentType; parentProps?: any }
) {
  return class DemoHOC extends Component {
    render() {
      let { repeat, props, parentProps = {} } = extra
      repeat = repeat === true ? 2 : repeat
      const Parent = extra.parent

      const children =
        (repeat as number) > 1 ? (
          new Array(repeat).fill(0).map((v, i) => <Comp key={i} {...props} />)
        ) : (
          <Comp {...props} />
        )
      return Parent ? <Parent {...parentProps}>{children}</Parent> : children
    }
  }
}

export function Button(props: ComponentProps<typeof TouchableOpacity>) {
  const { className, style, ...extraProps } = props
  const rootClass = useCarelessClass(['fta-demo-button'], [className])
  const txtClz = useCareClass(['fta-demo-button__text'])
  return (
    <TouchableOpacity className={rootClass} style={style} {...extraProps}>
      <Text className={txtClz}>{props.children}</Text>
    </TouchableOpacity>
  )
}

/**
 * 组件演示区
 */
export function DemoArea<P extends object>(demoAreaProps: DemoAreaProps<P>): JSX.Element {
  const { children, props, repeat, render, parentProps, parent, title, style, className } =
    demoAreaProps

  let HOC: ComponentType = EmptyComponent
  if (!children) {
    HOC = createDemoHOC(render as unknown as ComponentType<any>, {
      props,
      repeat,
      parent,
      parentProps,
    })
  }
  /** 拷贝代码 */
  function copySampleCode() {
    copyToClipboard(
      assembleSampleCode({
        render,
        parent,
        parentProps,
        props,
      }),
      () => {
        Taro.showToast({ title: '代码拷贝成功' })
      }
    )
  }

  const [titleClz, copyClz] = useCareClasses(['fta-demo-title__text'], ['fta-demo-title__copy'])

  return (
    <View className='fta-demo-wrap'>
      <View className='fta-demo-title'>
        <Text className={titleClz}>{title}</Text>
        {HOC !== EmptyComponent ? (
          <Text className={copyClz} title='拷贝样例代码' onClick={copySampleCode}>
            Copy
          </Text>
        ) : null}
      </View>
      <View className={classNames(className)} style={style}>
        {children || <HOC />}
      </View>
    </View>
  )
}

DemoArea.defaultProps = {
  title: '演示效果',
}

interface Option<T = unknown> {
  label: string
  /**
   * props可选值列表
   */
  list: T[]
  remark?: string
  /**
   * 是否省略属性不传
   */
  omit?: boolean
  /**
   * props是否是引用类型
   * @default false
   */
  reference?: boolean
}
interface PropsAreaProps<T = unknown> {
  /**
   * 演示区域标题
   * @default '参数'
   */
  children?: ReactNode
  /**
   * 演示区域标题
   * @default '参数'
   */
  title?: string
  /**
   * 展示信息
   */
  options?: Option<T>[]
  /**
   * 前缀节点
   */
  prefix?: ReactNode
  /**
   * 后缀节点
   */
  suffix?: ReactNode
  /**
   * 默认缺省文本
   * @default ''
   */
  omitText?: string
  /**
   * 点击选项
   */
  onChange?: (prop: string, params: { value: T; omit?: boolean }) => any
}

type LabelProps = { label: string; remark?: string; border?: boolean }
export function Label(props: LabelProps) {
  const textClz = useCarelessClass(
    ['fta-demo-label__text'],
    [props.border || 'fta-demo-label__text--no-border']
  )

  return (
    <View className='fta-demo-label'>
      {props.border ? <View className='fta-demo-label__border' /> : null}
      <Text className={textClz}>
        {props.label + (props.remark != null ? `（${props.remark}）` : '')}
      </Text>
    </View>
  )
}

type FlexProps = Pick<CSSProperties, 'flexDirection' | 'justifyContent' | 'alignItems'>

/** 演示区 */
export function DemoBlock(
  props: LabelProps & { children: ReactNode; pure?: boolean } & ViewProps & FlexProps
) {
  const {
    label,
    remark,
    pure,
    children,
    className,
    style,
    flexDirection,
    justifyContent,
    alignItems,
  } = props
  const rootClass = classNames('fta-demo-block', pure && 'fta-demo-block--pure', className)
  const rootStyle = { ...(style as CSSProperties) }
  if (flexDirection) rootStyle.flexDirection = flexDirection
  if (justifyContent) rootStyle.justifyContent = justifyContent
  if (alignItems) rootStyle.alignItems = alignItems
  return (
    <>
      <Label label={label} remark={remark} border={false} />
      <View className={rootClass} style={rootStyle}>
        {children}
      </View>
    </>
  )
}

/**
 * @type {CSSProperties}
 */
DemoBlock.defaultProps = {
  // flexDirection: 'row',
  // justifyContent: 'flex-start',
  // alignItems: 'flex-start',
}

/**
 * 组件属性区
 */
export function PropsArea(props: PropsAreaProps): JSX.Element {
  function onChange(val: any, item: Option) {
    const { label, omit, reference, list } = item
    const value = reference ? (list as any[]).find((l) => l.label === val)?.value : val
    return props.onChange?.(label, { value, omit })
  }

  const [titleClz] = useCareClasses(['fta-demo-title__text'])

  return (
    <View className='fta-demo-props'>
      <View className='fta-demo-title fta-demo-title--no-margin'>
        <Text className={titleClz}>{props.title}</Text>
      </View>
      {props.prefix}

      {props.children ||
        props.options?.map((item, i) => {
          const list = item.reference ? item.list.map((item: any) => item.label) : item.list
          return (
            <Fragment key={i}>
              <Label label={item.label} remark={item.remark}></Label>
              <Tabs
                scrollX
                scrollY
                scrollable
                tabClassName='fta-demo-tab'
                className='fta-demo-tabs'
                options={list}
                controls={false}
                onChange={(i: number, value: any) => onChange(value, item)}
              />
            </Fragment>
          )
        })}
      {props.suffix}
    </View>
  )
}

PropsArea.defaultProps = {
  title: '参数配置',
}
const inFTAView = process.env.TARO_ENV_RUNTIME === 'h5'
const __DEV__ = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'

const navigateBack = () => {
  inFTAView
    ? window.open(`${location.origin}${location.pathname}#/~demos/overall-overall`, '_self')
    : Taro.getCurrentPages().length > 1
    ? Taro.navigateBack()
    : Taro.navigateTo({ url: '/components/overall/overall' })

  // Taro.showToast({ title: Taro.getCurrentPages().length + '' })
}
/** 包裹层 */
// alert(process.env.LOCAL_IP)

const withCare = inFTAView
  ? nativeWithCare
  : (v: any, careMode?: boolean): ReturnType<typeof nativeWithCare> => v
export const Layout = withCare(
  function Layout(props: {
    children: ReactNode
    title: string
    qrcode?: string
    className?: string
    style?: CSSProperties
    showLeft?: boolean
    safeArea?: boolean
    useScrollView?: boolean
    scrollviewProps?: ScrollViewProps
  }): JSX.Element {
    const ScrollViewAdapter = props.useScrollView === false ? View : ScrollView
    const { careMode, toggle } = useConfig()
    const [showQR, toggleQR] = useState(false)
    useEffect(() => {
      if (inAlipay) {
        Taro.setNavigationBarTitle({
          title: props.title,
        })
      }
      if (inFTAView) {
        const themeColor = getThemeColor()
        setThemeColor(themeColor as string)
      }
    }, [])

    const changeThemeColor = (e: ChangeEvent<HTMLInputElement>) => {
      setThemeColor(e.target.value)
    }

    const handler = () => {
      if (inRN) {
        Taro.showModal({
          title: '提示',
          content: '在满帮WebView中预览该组件',
          success(result) {
            if (result.cancel) return
            MBBridge.app.base.openSchema({
              url: `ymm://view/web?immersive=true&useMBWebView=true&url=${encodeURIComponent(
                // 'http://10.190.195.235:8000/#/~demos/basic-button'
                `${
                  __DEV__
                    ? `http://${process.env.LOCAL_IP}:8000`
                    : 'https://dev-fta.amh-group.com/view'
                }/#/~demos/${props
                  .qrcode!.replace('components/', '')
                  .replace('/index', '')
                  .replace('/', '-')}`
              )}`,
            })
          },
        })
        return
      }
      toggleQR(!showQR)
    }

    const titleClz = useCareClass(['fta-demo-back-button__text'])

    return (
      <>
        <View className={classNames('fta-demo', props.className)} style={props.style}>
          {inAlipay ? null : (
            <NavBar
              safeAreaStyle={{ backgroundColor: '#fff' }}
              title={{ title: props.title, handler }}
              leftButton={
                props.showLeft === false ? (
                  <Fragment />
                ) : (
                  <TouchableOpacity onClick={navigateBack} className='fta-demo-back-button'>
                    <NavBar.BackIcon title='查看组件总览' />
                    <Text className={titleClz}>组件总览</Text>
                  </TouchableOpacity>
                )
              }
              rightButton={{
                title: inFTAView
                  ? '更改主题色'
                  : `${!careMode ? '关怀' : '标准'}${
                      inWeapp ? (careMode ? '           ' : '              ') : '模式'
                    }`,
                style: inWeapp ? { whiteSpace: 'pre' } : undefined,
                handler() {
                  if (inFTAView) {
                    const color = document.getElementById('color-input')!
                      .firstChild as HTMLInputElement
                    color.focus()
                    color.value = getThemeColor() as string
                    Promise.resolve().then(() => color.click())

                    return
                  }
                  toggle('careMode', !careMode)
                  Taro.showToast({ title: `切换到${careMode ? '标准' : '关怀'}模式`, mask: true })
                  if (inFTAView) {
                    localStorage.__CARE_MODE__ = !careMode ? '1' : ''
                  }
                },
              }}
            />
          )}
          <Debugger force />

          {inFTAView ? (
            <Input
              style={{ display: 'none' }}
              id='color-input'
              /* @ts-ignore */
              type='color'
              /* @ts-ignore */
              onChange={changeThemeColor}
              /* @ts-ignore */
              onInput={changeThemeColor}
            />
          ) : null}
          <ScrollViewAdapter scrollY {...props.scrollviewProps} className='fta-demo-container'>
            {props.children}
          </ScrollViewAdapter>
          {inAlipay || props.safeArea === false ? null : <SafeArea bottom />}
        </View>
        {showQR && props.qrcode && !inWeapp ? (
          <QRCode qrcode={props.qrcode} onClick={handler} />
        ) : null}
      </>
    )
  },
  inFTAView ? !!localStorage.__CARE_MODE__ : void 0
)

type DisplayProps = Required<Pick<DemoAreaProps, 'render'> & Pick<PropsAreaProps, 'options'>> &
  Pick<DemoAreaProps, 'style' | 'className' | 'repeat' | 'parent' | 'parentProps'> &
  Pick<PropsAreaProps, 'suffix' | 'prefix' | 'omitText'> & {
    /**
     * 传给组件的默认props
     */
    defaultProps?: DemoAreaProps['props']
    /**
     * 导航栏标题
     */
    title: string
    /**
     * 组件路径
     */
    qrcode: string
  }

/**
 * 展示组件
 */
export default function Display(props: DisplayProps) {
  const { options, title, defaultProps, omitText, qrcode, ...demoAreaProps } = props
  const defaultState =
    defaultProps ||
    Object.fromEntries(
      options.filter((item) => !item.omit).map(({ label, list }) => [[label], list[0]])
    )
  const [state, setState] = useState(defaultState)
  const opts = options.map((item) => {
    const newItem = { ...item }
    newItem.list = [...newItem.list]
    if (newItem.omit)
      newItem.list.unshift(item.reference ? { label: omitText, value: 'value' } : omitText)
    return newItem
  })
  return (
    <Layout title={title} qrcode={qrcode}>
      <DemoArea {...demoAreaProps} props={state} />
      <PropsArea
        options={opts}
        onChange={(label, { value, omit }) => {
          const nextState = { ...state } as Record<string, unknown>
          if (omit && value === omitText) {
            // 省略不传
            delete nextState[label]
          } else {
            nextState[label] = value
          }
          setState(nextState)
        }}
      />
    </Layout>
  )
}

Display.defaultProps = {
  omitText: '不传',
}
