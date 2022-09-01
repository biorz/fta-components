import { Option } from '../../types/selector'

function dive(options: Option[], cursors: number[], depth: number, current: number = 1) {
  let opts = options
  while (opts) {
    options
  }
}

export function dfs(
  rootOptions: Option[],
  depth: number,
  key: 'value',
  value: string | number,
  parentOptions = rootOptions,
  // 当前深度
  current = 1,
  cursor = 0,
  indexes = [] as number[]
) {
  // 目标是找到最深处的节点索引
  const options = parentOptions[cursor++].children || []
  // 已经遍历到最深处
  if (depth === current) {
    const index = options.findIndex((opt) => opt.value === value)
    if (index > -1) {
      // 找到节点， 直接返回
      indexes[depth - 1] = index
      return indexes
    }
    // 最深处没有找到，查看是否有同级节点，如果有，继续遍历，没有则返回上一层，直至顶层为止
    if (cursor === parentOptions.length) {
      return
    } else {
      return dfs(rootOptions, depth, key, value, parentOptions, current, cursor, indexes)
    }
  }
  // 如果不在最深处，往最深处找

  return dfs(rootOptions, depth, key, value, parentOptions, current, cursor, indexes)
}
