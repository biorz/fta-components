import React, {
  ComponentClass,
  ComponentProps,
  ComponentType,
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react'

interface Platform {
  /** 运满满 */
  ymm: any
  /** 货车帮 */
  hcb: any
  /** 短途 */
  dt: any
}
/** 获取必选属性 */
type GetRequired<T, U extends Required<T> = Required<T>, K extends keyof T = keyof T> = Pick<
  T,
  K extends keyof T ? (T[K] extends U[K] ? K : never) : never
>

interface GlobalContext {
  /**
   * 是否开启关怀模式
   * @default false
   */
  careMode: boolean
  /**
   * 当前运行平台
   * @default 'ymm'
   */
  platform: keyof Platform
  /**
   * 更新配置信息
   */
  toggle?: (key: keyof GetRequired<GlobalContext>, value: GlobalContext[typeof key]) => void
}

type ConfigProviderProps = Partial<GlobalContext> & { children: ReactNode }

const defaultContext: GlobalContext = {
  careMode: false,
  platform: 'ymm',
}

const Context = createContext<GlobalContext>(defaultContext)

Context.displayName = 'GlobalConfigContext'

/**
 * 全局配置生产者
 * @example
 * function Page(): JSX.Element {
 *  return (
 *   <ConfigProvider platform='ymm' careMode={false}>
 *     <View>
 *       <Text>FTA View based APP</Text>
 *     </View>
 *   </ConfigProvider>
 *  )
 * }
 */
function ConfigProvider(props: ConfigProviderProps) {
  const { children, ...extraProps } = props
  const [state, setState] = useState(extraProps)
  extraProps.toggle = (key, value) =>
    setState({
      ...state,
      [key]: value,
    })
  return <Context.Provider value={state as GlobalContext}>{children}</Context.Provider>
}

ConfigProvider.defaultProps = defaultContext

ConfigProvider.context = Context

/**
 * 为组件注入ConfigProvider
 * @param Component
 * @param careMode
 * @returns
 */
function withCare<P extends object = {}>(
  Component: ComponentClass<P> | FC<P>,
  careMode?: boolean
): (props: ComponentProps<typeof Component>) => JSX.Element {
  return (props) => (
    <ConfigProvider careMode={careMode}>
      <Component {...props} />
    </ConfigProvider>
  )
}

/**
 * 获取全局配置
 * @example
 *
 */
function useConfig(): Required<GlobalContext>

function useConfig(key: keyof GlobalContext): GlobalContext[typeof key]

function useConfig(key?: keyof GlobalContext) {
  const ctx = useContext(Context)
  if (key) return ctx[key]
  return ctx as Required<GlobalContext>
}

/**
 * 当关怀模式的组件和标准模式无法进行复用时，需要拆成两个组件
 * 此hook简化模式之间的判断，传入两个模式的组件，内部展示
 * @param NormalComponent 标准模式组件
 * @param CareModeComponent 关怀模式组件
 * @param props 组件props
 */
function useCareComponent<P extends object = {}>(
  NormalComponent: ComponentType<P>,
  CareModeComponent: ComponentType<P>,
  props: P
): JSX.Element

function useCareComponent<P extends object = {}>(
  NormalComponent: ComponentType<P>,
  CareModeComponent: ComponentType<P>
): ComponentType<P>

function useCareComponent<P extends object = {}>(
  NormalComponent: ComponentType<P>,
  CareModeComponent: ComponentType<P>,
  props?: P
) {
  const careMode = useConfig('careMode')
  const DynamicComponent = careMode ? CareModeComponent : NormalComponent
  return props ? <DynamicComponent {...props} /> : DynamicComponent
}

/**
 * 全局配置消费者
 */
const ConfigConsumer = Context.Consumer

export { ConfigProvider, ConfigConsumer, useConfig, useCareComponent, withCare }
