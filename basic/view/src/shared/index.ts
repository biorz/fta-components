/** 支持的Color列表 */
export const COLOR = {
  black: ['#000', '#000000', 'rgb(0,0,0)', 'black'],
  white: ['#fff', '#ffffff', 'rgb(255,255,255)', 'white'],
}
/** 支持的underlayColor值 */
export const colorList = Object.values(COLOR).reduce((prev, cur) => [...prev, ...cur], [])

export const colorMap = Object.entries(COLOR).reduce((prev, [key, list]) => {
  list.forEach((v) => (prev[v] = key))
  return prev
}, {})
/** 支持的activeOpacity值 */
export const opacityList = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
