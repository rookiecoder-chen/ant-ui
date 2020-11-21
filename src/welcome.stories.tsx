import React from 'react';
import {storiesOf} from '@storybook/react';

storiesOf('Welcome page', module)
    .add('welcome', () => {
        return (
            <>
                <h1>欢迎来到 taozi UI 组件库</h1>
                <hr/>
                <p>taozi-ui: 一套仿照Ant-Design打造的简易风格的组件库</p>
                <h3>安装试试</h3>
                <code>
                    npm install taozi-ui --save
                </code>
            </>
        );
    }, {info: {disable: true}});