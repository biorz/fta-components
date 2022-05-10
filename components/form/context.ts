import { createContext } from 'react'
import { FormProps } from '../../types/Form'

type FormContext = Pick<
  FormProps,
  'border' | 'align' | 'labelClassName' | 'labelStyle' | 'contentClassName' | 'contentStyle'
> & {
  /** @private 是否展示Modal */
  _showModal?: boolean
}

const context = createContext<FormContext>({
  border: true,
  _showModal: false,
})

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, FormProvider, FormConsumer }
