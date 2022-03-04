import * as React from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import Title, { SkeletonTitleProps } from './Title'
import Paragraph, { SkeletonParagraphProps } from './Paragraph'
import Element from './Element'
import { AvatarProps } from './Avatar'
import './style/index.scss'

/* This only for skeleton internal. */
interface SkeletonAvatarProps extends Omit<AvatarProps, 'active'> {}

export interface SkeletonProps {
  active?: boolean
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  avatar?: SkeletonAvatarProps | boolean
  title?: SkeletonTitleProps | boolean
  paragraph?: SkeletonParagraphProps | boolean
  round?: boolean
}

function getComponentProps<T>(prop: T | boolean | undefined): T | {} {
  if (prop && typeof prop === 'object') {
    return prop
  }
  return {}
}

function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return { size: 'large', shape: 'square' }
  }

  return { size: 'large', shape: 'circle' }
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' }
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' }
  }

  return {}
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
  const basicProps: SkeletonParagraphProps = {}

  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%'
  }

  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3
  } else {
    basicProps.rows = 2
  }

  return basicProps
}

const Skeleton = (props: SkeletonProps) => {
  const renderSkeleton = () => {
    const { loading, className, style, children, avatar, title, paragraph, active, round } = props

    const prefixCls = 'fta-skeleton'

    if (loading || !('loading' in props)) {
      const hasAvatar = !!avatar
      const hasTitle = !!title
      const hasParagraph = !!paragraph

      // Avatar
      let avatarNode
      if (hasAvatar) {
        const avatarProps: SkeletonAvatarProps = {
          prefixCls: `${prefixCls}-avatar`,
          ...getAvatarBasicProps(hasTitle, hasParagraph),
          ...getComponentProps(avatar),
        }
        // We direct use SkeletonElement as avatar in skeleton internal.
        avatarNode = (
          <View className={`${prefixCls}-header`}>
            <Element {...avatarProps} />
          </View>
        )
      }

      let contentNode
      if (hasTitle || hasParagraph) {
        // Title
        let $title
        if (hasTitle) {
          const titleProps: SkeletonTitleProps = {
            prefixCls: `${prefixCls}-title`,
            ...getTitleBasicProps(hasAvatar, hasParagraph),
            ...getComponentProps(title),
          }

          $title = <Title {...titleProps} />
        }

        // Paragraph
        let paragraphNode
        if (hasParagraph) {
          const paragraphProps: SkeletonParagraphProps = {
            prefixCls: `${prefixCls}-paragraph`,
            ...getParagraphBasicProps(hasAvatar, hasTitle),
            ...getComponentProps(paragraph),
          }

          paragraphNode = <Paragraph {...paragraphProps} />
        }

        contentNode = (
          <View className={`${prefixCls}-content`}>
            {$title}
            {paragraphNode}
          </View>
        )
      }

      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-with-avatar`]: hasAvatar,
          [`${prefixCls}-active`]: active,
          // [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-round`]: round,
        },
        className
      )

      return (
        <View className={cls} style={style}>
          {avatarNode}
          {contentNode}
        </View>
      )
    }

    return children
  }
  return <View>{renderSkeleton()}</View>
}

Skeleton.defaultProps = {
  avatar: false,
  title: true,
  paragraph: true,
}

export default Skeleton
