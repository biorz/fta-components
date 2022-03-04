/**
 * 主题支持的平台
 */
export type Platform = 'ymm' | 'hcb' | 'tms'

/**
 * 主题context
 */
export interface ThemeContext {
  /**
   * 主题支持的平台
   * @default 'ymm'
   */
  platform: Platform
}
