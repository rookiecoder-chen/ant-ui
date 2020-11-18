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
            cool link
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <MenuItem>
            cool link 2
        </MenuItem>
    </Menu>
);

export const horizontalMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`);
    }} mode='horizontal'>
        <MenuItem>
            首页
        </MenuItem>
        <SubMenu title='下拉菜单'>
            <MenuItem>111</MenuItem>
            <MenuItem>222</MenuItem>
            <MenuItem>333</MenuItem>
        </SubMenu>
        <MenuItem disabled>
            关于
        </MenuItem>
    </Menu>
);
export const verticalMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {
        action(`clicked ${index} item`);
    }} mode='vertical'>
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title='下拉菜单'>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
        </SubMenu>
    </Menu>
);
storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)
    .add('horizontalMenu', horizontalMenu)
    .add('verticalMenu', verticalMenu);