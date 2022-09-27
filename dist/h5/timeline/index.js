import './index.css';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import React, { Component } from 'react';
import { ConfigConsumer, useClassWithCare } from '../common';

class TimelineItem extends Component {
    render() {
        const { color, icon, hollow = false } = this.props;
        const dotStyle = {};
        if (color) {
            dotStyle[hollow ? 'borderColor' : 'backgroundColor'] = color;
        }
        return (React.createElement(ConfigConsumer, null, ({ careMode }) => {
            const dotClass = classNames(useClassWithCare(careMode, ['fta-timeline-item-dot']), hollow && 'fta-timeline-item-dot--hollow');
            return (React.createElement(View, { className: 'fta-timeline-item' },
                React.createElement(View, { className: 'fta-timeline-item-view' }, this.props.children),
                React.createElement(View, { className: 'fta-timeline-item-node' },
                    icon || React.createElement(View, { className: dotClass, style: dotStyle }),
                    React.createElement(View, { className: 'fta-timeline-item-line' }))));
        }));
    }
}
class Timeline extends Component {
    render() {
        const { reverse, children } = this.props;
        const _children = reverse && Array.isArray(children) ? children.slice().reverse() : children;
        return React.createElement(View, { className: 'fta-timeline' }, _children);
    }
}
Timeline.defaultProps = {
    reverse: false,
};
Timeline.Item = TimelineItem;

export { TimelineItem, Timeline as default };
