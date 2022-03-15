import PropTypes, { InferProps } from 'prop-types'
import { NoticeBarProps } from '../../types/notice-bar'

export const defaultProps: NoticeBarProps = {
  close: false,
  single: false,
  marquee: false,
  speed: 100,
  icon: '',
  customStyle: {},
}

export const propTypes: InferProps<NoticeBarProps> = {
  close: PropTypes.bool,
  single: PropTypes.bool,
  marquee: PropTypes.bool,
  speed: PropTypes.number,
  moreText: PropTypes.string,
  icon: PropTypes.string,
  customStyle: PropTypes.object,
  onClose: PropTypes.func,
}
