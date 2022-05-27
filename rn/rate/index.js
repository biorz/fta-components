import React from 'react'
import { StyleSheet } from 'react-native'
import '@fta/runtime-rn/dist/scale2dp'
import View from '@fta/components-rn/dist/components/View'

var indexScssStyleSheet = StyleSheet.create({})

var _styleSheet = indexScssStyleSheet
function Rate(props) {
  return React.createElement(View, { style: _styleSheet['fta-rate'] })
}

export { Rate as default }
