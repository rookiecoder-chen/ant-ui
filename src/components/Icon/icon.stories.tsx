import React from 'react'
import { storiesOf } from '@storybook/react';
import Icon from './icon';

const defaultIcon = () => (
    <>
        <Icon icon="times" />
        {'  '}
        <Icon icon="ad" />
        {'  '}
        <Icon icon="toggle-on" />
        {'  '}
        <Icon icon="upload" />
        {'  '}
        <Icon icon="users" />
        {'  '}
        <Icon icon="trash" />
        {'  '}
        <Icon icon="tv" />
        {'  '}
        <Icon icon="wifi" />
        {'  '}
        <Icon icon="user" />
        <br/>
        <br/>
        <span>更多Icon请前往：<a target="__blank" href="http://www.fontawesome.com.cn/faicons/">font-awesome 图标库</a></span>
    </>
);

const sizeIcon = () => (
    <>
        {'size="5x": '}<Icon icon="home" size="5x" />
        <br/>
        {'size="2x": '}<Icon icon="home" size="2x" />
        <br/>
        {'size="lg": '}<Icon icon="home" size="lg" />
        <br/>
        {'size="sm": '}<Icon icon="home" size="sm" />
        <br/>
        {'size="xs": '}<Icon icon="home" size="xs" />
    </>
);

const themeIcon = () => (
    <>
        <Icon icon="camera"/>
        {'  '}
        <Icon icon="camera" theme="primary"/>
        {'  '}
        <Icon icon="camera" theme="danger"/>
        {'  '}
        <Icon icon="camera" theme="dark"/>
        {'  '}
        <Icon icon="camera" theme="light"/>
        {'  '}
        <Icon icon="camera" theme="info"/>
        {'  '}
        <Icon icon="camera" theme="success"/>
        {'  '}
        <Icon icon="camera" theme="warning"/>
        {'  '}
        <Icon icon="camera" theme="warning"/>
    </>
);

storiesOf('Icon 图标', module)
    .add('Icon', defaultIcon)
    .add('不同Size的Icon', sizeIcon)
    .add('不同Theme的Icon', themeIcon)