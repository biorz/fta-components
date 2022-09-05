export const defaults = {
  // col
  columnClassNames: ['fta-selector-col-0', 'fta-selector-col-1', 'fta-selector-col-2'],
  unsetColumnClassName: 'fta-selector-col-2',
  // item
  itemClassNames: ['fta-selector-item-0', 'fta-selector-item-1', 'fta-selector-item-2'],
  itemActiveClassNames: [
    'fta-selector-item-0--active',
    'fta-selector-item-1--active',
    'fta-selector-item-2--active',
  ],
  itemTextClassNames: ['fta-selector-text-0', 'fta-selector-text-1', 'fta-selector-text-2'],
  itemTextActiveClassNames: [
    'fta-selector-text-0--active',
    'fta-selector-text-1--active',
    'fta-selector-text-2--active',
  ],
  unsetItemClassName: 'fta-selector-item-1',
  unsetItemActiveClassName: 'fta-selector-item-1--active',
  unsetItemTextClassName: 'fta-selector-text-1',
  unsetItemTextActiveClassName: 'fta-selector-text-1--active',
  initItemClassName: 'fta-selector-item',
  initItemActiveClassName: 'fta-selector-item--active',
  initItemTextClassName: 'fta-selector-text',
  initItemTextActiveClassName: 'fta-selector-text--active',
}

/** 获取默认列类名 */
export const getDefaultColClass = (depth: number) =>
  defaults.columnClassNames[depth - 1] || defaults.unsetColumnClassName

/** 获取默认item类名 */
export const getDefaultItemClass = (depth: number, careMode?: boolean) =>
  `${defaults.itemClassNames[depth - 1] || defaults.unsetItemClassName} ${
    defaults.initItemClassName
  } ${careMode ? defaults.initItemClassName + '--care' : ''}`

/** 获取默认item激活类名 */
export const getDefaultActiveItemClass = (depth: number) =>
  `${defaults.itemActiveClassNames[depth - 1] || defaults.itemActiveClassNames} ${
    defaults.initItemActiveClassName
  }`
/** 获取默认item text 类名 */
export const getDefaultItemTextClass = (depth: number, careMode?: boolean) =>
  `${defaults.itemTextClassNames[depth - 1] || defaults.unsetItemTextClassName} ${
    defaults.initItemTextClassName
  } ${careMode ? defaults.initItemTextClassName + '--care' : ''}`

/** 获取默认item text激活类名 */
export const getDefaultActiveItemTextClass = (depth: number) =>
  `${defaults.itemTextActiveClassNames[depth - 1] || defaults.itemTextActiveClassNames} ${
    defaults.initItemTextActiveClassName
  }`
