import BaseComponent, { PropsWithChildren } from '../../../types/base'

export interface FullScreenProps extends BaseComponent, Required<PropsWithChildren> {
  onClick?: () => void
}

type b = FullScreenProps['']
