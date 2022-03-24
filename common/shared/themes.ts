import { deepMerge } from '../utils/deep-merge'
import { DeepPartial } from './types'

const Themes = {
  color: {
    brand: '#fa871e',
    white: '#fff',
  },
}

const mergeThemes = (newThemes: DeepPartial<typeof Themes>) => {
  deepMerge(Themes, newThemes)
}

export { Themes, mergeThemes }
