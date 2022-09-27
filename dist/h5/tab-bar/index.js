import './index.css';
import { View } from '@tarojs/components';
import React, { Component } from 'react';

class TabBarItem extends Component {
    render() {
        return React.createElement(View, null);
    }
}
class TabBar extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            _activeIndex: 0,
        };
    }
    render() {
        return React.createElement(View, { className: 'fta-tab-bar' }, this.props.children);
    }
}
TabBar.Item = TabBarItem;

export { TabBar as default };
