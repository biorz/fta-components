import { createContext } from 'react'
import { FormProps } from '../../types/Form'

type FormContext = Pick<
  FormProps,
  'border' | 'readonly' | 'align' | 'labelClassName' | 'labelStyle'
>

const context = createContext<FormContext>({
  border: true,
  readonly: false,
})

const { Provider: FormProvider, Consumer: FormConsumer } = context

export { context, FormProvider, FormConsumer }
