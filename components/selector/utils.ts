import { Option } from '../../types/selector'

export function search(
  rootOptions: Option[],
  value: string | number,
  depth: number,
  label = 'value'
) {
  if (!rootOptions || !rootOptions.length) {
    return null
  }
  // debugger
  function dfs(options = rootOptions, parents = [] as Option[], result = [] as number[]) {
    // 获取当前的深度
    const current = parents.length
    console.log(JSON.stringify(result), 'result=======')
    // 如果没有到倒数第二步，则继续搜索
    if (current + 1 < depth) {
      for (let i = 0; i < options.length; i++) {
        if (result.length === depth) {
          return console.log('完成搜索')
        }
        const option = options[i]
        console.log('option.children', option.children)
        // 有节点时需要遍历
        if (option.children) {
          console.log('option==========\n', option, i)
          parents.push(option)
          result.push(i)
          dfs(option.children, parents, result)
        }
      }
      console.log('=======循坏完毕=======')
    } else {
      // 到了第二步，就直接搜索
      const index = options.findIndex((opt) => opt[label] === value)
      //找到了
      if (index > -1) {
        result.push(index)
        parents.push(options[index])
      } else {
        // 没找到
        parents.splice(current - 1, 1)
        result.splice(current - 1, 1)
        console.log('splice', JSON.stringify(options[0]))

        // 是否到底
      }
    }

    console.log('直接return了', JSON.stringify(result), parents)
    // 这里要做文章
    if (result.length === depth) {
      console.log('返回结果')
      debugger
    } else {
      console.log('未找到')
    }
    return result.length === depth ? { result, parents } : null
  }
  return dfs()
}

// 循环一轮到底后向上回溯
