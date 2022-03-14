import classNames, { Value } from 'classnames'
import { useConfig } from '../context'

const isString = (s: unknown): s is string => typeof s === 'string' && s.length > 0

export type Argument = Value
/**
 * 关怀模式 - 一个组件接收多个类名
 *
 * @param careClazz  - className 数组
 * @param suffix  - 关怀模式className 后缀
 */
const useCareClass = (careClazz: Argument[], suffix: string = '--care') => {
  const careMode = useConfig('careMode')
  return classNames(
    careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}${suffix}` : '')) : careClazz
  )
}

/**
 * 关怀模式 - 一个组件接收多个类名，关怀模式后缀固定为`--care`
 *
 * @param careClazz  - className 数组
 */
useCareClass.single = (...careClazz: Argument[]) => {
  const careMode = useConfig('careMode')
  return classNames(
    careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}$--care` : '')) : careClazz
  )
}

/**
 * 关怀模式 - 多个组件接收多个类名，执行结果返回数组，解构赋值。，关怀模式后缀固定为`--care`
 *
 * @param careClazzes - className 二维数组
 * @returns
 */
const useCareClasses = (...careClazzes: Argument[][]) => {
  const careMode = useConfig('careMode')
  return careClazzes.map((careClazz) =>
    classNames(careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}--care` : '')) : careClazz)
  )
}

/**
 * 关怀模式 - 多个组件接收单个类名，执行结果返回数组，解构赋值。关怀模式后缀固定为`--care`
 *
 * @param careClazz className数组
 */
useCareClasses.single = (...careClazz: Argument[]) => {
  const careMode = useConfig('careMode')
  return careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}--care` : '')) : careClazz
}

/**
 * 关怀模式 - 接收需要关怀模式的类名数组和不需要接入关怀模式的类名数组
 *
 * @param careClazz 需要接入关怀模式的类名数组
 * @param nonCareClasszz 不需要接入关怀模式的类名数组，可选
 * @param suffix  关怀模式类名后缀，默认`--care`
 */
const useCarelessClass = (
  careClazz: Argument[],
  nonCareClasszz?: Argument[] | null,
  suffix: string = '--care'
) => {
  const careMode = useConfig('careMode')
  return classNames(
    ...(nonCareClasszz ?? []).concat(
      careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}${suffix}` : '')) : careClazz
    )
  )
}

/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收多个类名，返回相应的类名
 *
 * 建议配合`Mobx`、`Redux`或`ConfigConsumer`使用
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className 数组
 * @param suffix 关怀模式后缀
 */
const useClassWithCare = (careMode: boolean, careClazz: Argument[], suffix: string = '--care') => {
  return classNames(
    careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}${suffix}` : '')) : careClazz
  )
}

/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收一个类名，返回相应的类名
 *
 * @param careMode 是否是关怀模式
 * @param careClass className
 * @param suffix 关怀模式后缀，默认`--care`
 */
useClassWithCare.single = (careMode: boolean, careClass: Argument, suffix: string = '--care') => {
  return careMode ? (isString(careMode) ? `${careClass} ${careClass}${suffix}` : '') : careClass
}

/**
 * 关怀模式 - 判断当前是否是关怀模式，多个组件接收多个类名，返回相应的类名
 *
 * 建议配合`Mobx`、`Redux`或`ConfigConsumer`使用
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className 二维数组
 */
const useClassesWithCare = (careMode: boolean, ...careClazzes: Argument[][]) => {
  return careClazzes.map((careClazz) =>
    classNames(careMode ? careClazz.map((v) => (isString(v) ? `${v} ${v}--care` : '')) : careClazz)
  )
}

/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收一个类名，返回相应的类名
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className数组
 */
useClassesWithCare.single = (careMode: boolean, ...careClazz: Argument[]) => {
  return careClazz.map((v) => (careMode ? (isString(v) ? `${v} ${v}--care` : '') : (v as string)))
}

export {
  classNames,
  useCareClass,
  useCareClasses,
  useCarelessClass,
  useClassWithCare,
  useClassesWithCare,
}
