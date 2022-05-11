import { createContext, useContext } from 'react'
import { FormProps } from '../../types/Form'

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
  /** @private 是否展示Modal */
  _showModal?: boolean
}

const context = createContext<FormContext>({})

/** 获取form表单基础配置 */
function useFormConfig(): FormContext {
  const config = useContext(context)
  return config
}

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, useFormConfig, FormProvider, FormConsumer }
