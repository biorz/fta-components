import React from 'react'
import { View } from '@tarojs/components'
import Skeleton, { SkeletonProps } from './Skeleton'
import SkeletonImage from './Image'

type SkeletonBanner = {
  height?: number | string
}
export interface SkeletonPageProps extends Pick<SkeletonProps, 'active' | 'loading' | 'children'> {
  banner?: SkeletonBanner | boolean
}

const SkeletonPage = (props: SkeletonPageProps) => {
  const { active, loading, children, banner } = props

  const renderSkeletonPage = () => {
    if (loading) {
      return (
        <View className='fta-skeleton-page'>
          {banner && (
            <SkeletonImage
              active={active}
              style={{
                width: '100vw',
                height: typeof banner === 'object' ? banner.height : '150px',
              }}></SkeletonImage>
          )}
          <Skeleton paragraph={{ rows: 4 }} active={active} loading={loading} />
          <Skeleton
            style={{ marginTop: '20px' }}
            title={false}
            paragraph={{ rows: 3 }}
            active={active}
            loading={loading}
          />
          <Skeleton
            style={{ marginTop: '20px' }}
            title={false}
            paragraph={{ rows: 2 }}
            active={active}
            loading={loading}
          />
          {!banner && (
            <Skeleton
              style={{ marginTop: '20px' }}
              title={false}
              paragraph={{ rows: 3 }}
              active={active}
              loading={loading}
            />
          )}
        </View>
      )
    }
    return children
  }
  return <View>{renderSkeletonPage()}</View>
}

export default SkeletonPage
