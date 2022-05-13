import { createContext, MutableRefObject, ReactNode, useContext } from 'react'
import { FormItemRefMethods, FormProps } from '../../types/Form'

export type Store = {
  __anonymous__: MutableRefObject<FormItemRefMethods>[]
  [key: string]:
    | MutableRefObject<FormItemRefMethods>
    | MutableRefObject<FormItemRefMethods>[]
    | undefined
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
  | 'rules'
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
}

const context = createContext<FormContext>({
  rules: {},
  store: { __anonymous__: [] as MutableRefObject<FormItemRefMethods>[] },
})

/** 获取form表单基础配置 */
function useFormConfig(): FormContext {
  const config = useContext(context)
  return config
}

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, useFormConfig, FormProvider, FormConsumer }
