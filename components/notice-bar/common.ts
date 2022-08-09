import PropTypes, { InferProps } from 'prop-types'
import { NoticeBarProps } from '../../types/notice-bar'

export const defaultProps: NoticeBarProps = {
  close: false,
  single: false,
  marquee: false,
  icon: false,
  speed: 100,
  text: [],
  duration: 3,
}

export const propTypes: InferProps<NoticeBarProps> = {
  close: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  single: PropTypes.bool,
  marquee: PropTypes.bool,
  speed: PropTypes.number,
  moreText: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  customStyle: PropTypes.object,
  onClose: PropTypes.func,
}
