import { ScrollView as RNScrollView } from 'react-native'
import { ScrollIntoView, wrapScrollViewConfigured } from 'react-native-scroll-into-view'

const ScrollView = wrapScrollViewConfigured({
  // ScrollIntoView default/fallback options
  options: {},
  // Use this if you use a ScrollView wrapper that does not use React.forwardRef()
  refPropName: 'ref',
  // unwraps the ref that the wrapped ScrollView gives you (this lib need the bare metal ScrollView ref)
  getScrollViewNode: (ref) => ref,
  // fallback value for throttling, can be overriden by user with props
  scrollEventThrottle: 16,
})(RNScrollView)

export { ScrollIntoView, ScrollView }
