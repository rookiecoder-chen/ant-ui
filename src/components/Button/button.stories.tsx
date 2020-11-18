import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Button from './button';

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
);
const buttonWithSize = () => (
    <>
        <Button size='sm'>small button</Button>
        <Button size='lg'>large button</Button>
    </>
);
const buttonWithType = () => (
    <>
        <Button btnType='default'>default button</Button>
        <Button btnType='primary'>primary button</Button>
        <Button btnType='danger'>danger button</Button>
        <Button btnType='link' href="https://www.baidu.com" target="_blank">link button</Button>
    </>
);


storiesOf('Button 按钮', module)
    .add('Button', defaultButton)
    .add('不同尺寸的Button', buttonWithSize)
    .add('不同类型的Button', buttonWithType);
