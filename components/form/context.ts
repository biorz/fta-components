import { createContext, MutableRefObject, ReactNode, useContext } from 'react'
import { FormItemRefMethods, FormProps } from '../../types/Form'

export type Store = {
  __anonymous__: MutableRefObject<FormItemRefMethods>[]
  __named__: MutableRefObject<FormItemRefMethods>[]
}

type FormContext = Pick<
  FormProps,
  | 'model'
  | 'readonly'
  | 'align'
  | 'labelClassName'
  | 'labelStyle'
  | 'labelTextClassName'
  | 'labelTextStyle'
  | 'contentClassName'
  | 'contentStyle'
  | 'onMount'
  | 'onDestroy'
  | 'rules'
  | 'placeholderTextColor'
> & {
  /** @private */
  store: Store
  /**
   * @private
   * @supported weapp, h5
   * 滚动到指定id元素
   */
  scrollIntoView?: (id: string) => void

  /** @private 展示提示modal */
  _showModal?: (example: ReactNode) => void

  /** @private  判断FormItem是否被Form包裹 */
  __root__?: boolean
}

const context = createContext<FormContext>({
  rules: {},
  __root__: false,
  _showModal() {},
  store: {
    __named__: [] as MutableRefObject<FormItemRefMethods>[],
    __anonymous__: [] as MutableRefObject<FormItemRefMethods>[],
  },
})

// const itemContext = createContext<>

/** 获取form表单基础配置 */
function useFormConfig(): FormContext {
  const config = useContext(context)
  return config
}

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, useFormConfig, FormProvider, FormConsumer }
