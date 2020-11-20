import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

export const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`);
    }}>
        <MenuItem>
            导航一
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <MenuItem>
            导航二
        </MenuItem>
    </Menu>
);

export const horizontalMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`);
    }} mode='horizontal'>
        <MenuItem>
            导航一
        </MenuItem>
        <MenuItem disabled>
            导航二
        </MenuItem>
        <SubMenu title='个人中心'>
            <MenuItem>账号信息</MenuItem>
            <MenuItem>操作记录</MenuItem>
            <MenuItem>退出登录</MenuItem>
        </SubMenu>

    </Menu>
);
export const verticalMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`);
    }} mode='vertical'>
        <MenuItem>
            导航一
        </MenuItem>
        <MenuItem disabled>
            导航二
        </MenuItem>
        <SubMenu title='个人中心'>
            <MenuItem>账号信息</MenuItem>
            <MenuItem>操作记录</MenuItem>
            <MenuItem>退出登录</MenuItem>
        </SubMenu>
    </Menu>
);
storiesOf('Menu 菜单', module)
    .add('Menu', defaultMenu)
    .add('horizontalMenu', horizontalMenu)
    .add('verticalMenu', verticalMenu);