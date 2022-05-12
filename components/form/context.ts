import { createContext, useContext } from 'react'
import { FormItemRefMethods, FormProps } from '../../types/Form'

export type Store = {
  __anonymous__: FormItemRefMethods[]
  [key: string]: FormItemRefMethods | FormItemRefMethods[] | undefined
}

type FormContext = Pick<
  FormProps,
  | 'model'
  | 'readonly'
  | 'align'
  | 'labelClassName'
  | 'labelStyle'
  | 'contentClassName'
  | 'contentStyle'
  | 'onMount'
  | 'onDestroy'
> & {
  /** @private */
  store: Store
  /**
   * @private
   * @supported weapp, h5
   * 滚动到指定id元素
   */
  scrollIntoView?: (id: string) => void

  /** @private 是否展示Modal */
  _showModal?: boolean
}

const context = createContext<FormContext>({
  store: { __anonymous__: [] as FormItemRefMethods[] },
})

/** 获取form表单基础配置 */
function useFormConfig(): FormContext {
  const config = useContext(context)
  return config
}

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, useFormConfig, FormProvider, FormConsumer }
