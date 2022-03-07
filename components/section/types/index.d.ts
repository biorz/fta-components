import { Component } from 'react'
import './index.scss'
export default class Section extends Component<any> {
  static defaultProps: any
  state: {
    selected: any
    itemBgStyle: {
      width: string
      left: string
      backgroundColor: string
      height: string
      transition: string
    }
    listInfo: any[]
    currentIndex: number
    randomNumber: string
  }
  subsectionStyle(): any
  itemStyle(): any
  itemBarStyle(): any
  textStyle(index: Number): any
  componentDidMount(): void
  getTabsInfo: () => void
  click(index: number): void
  changeSectionStatus(nVal: number): void
  itemBgLeft(): {
    width: string
    left: string
    backgroundColor: string
    height: string
    transition: string
  }
  render(): JSX.Element
}
