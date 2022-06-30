import { View } from '@tarojs/components'
import React from 'react'
import '../../style/components/intro/index.scss'
import { IntroProps } from '../../types/intro'
import { IntroConsumer, IntroProvider, useIntroContext, withIntro } from './context'

function Intro(props: IntroProps) {
  return <View className='fta-intro'></View>
}

Intro.Provider = IntroProvider
Intro.Consumer = IntroConsumer
Intro.useContext = useIntroContext
Intro.with = withIntro

export default Intro
