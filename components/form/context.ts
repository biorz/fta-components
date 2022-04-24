import { createContext } from 'react'
import { FormProps } from '../../types/Form'

type FormContext = Pick<
  FormProps,
  'border' | 'readonly' | 'align' | 'labelClassName' | 'labelStyle'
> & {
  /**
   * 是否展示Modal
   * @private
   */
  _showModal?: boolean
}

const context = createContext<FormContext>({
  border: true,
  readonly: false,
  _showModal: false,
})

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, FormProvider, FormConsumer }
