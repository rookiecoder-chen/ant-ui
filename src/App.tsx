import React, {useState} from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition';

library.add(fas);

function App() {
    const [show, setShow] = useState(false);
    return (
        <div className="App">
            <header className="App-header">
                {/*<Icon icon="arrow-down" theme="danger"/>*/}
                <hr/>
                <Menu defaultIndex='0' onSelect={(index) => {
                    console.log(index);
                }}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link 2</MenuItem>
                    <SubMenu title="dropdown">
                        <MenuItem>dropdown 1</MenuItem>
                        <MenuItem>dropdown 2</MenuItem>
                        <MenuItem>dropdown 3</MenuItem>
                    </SubMenu>
                    <MenuItem>cool link 3</MenuItem>
                </Menu>
                <Button btnType="primary" size="lg"
                        onClick={() => {
                            setShow(!show);
                        }}
                >toggle</Button>
                <Transition in={show} timeout={300} animation="zoom-in-left">
                    <div>
                        <p>edit
                            <code>src/app.tsx</code>
                            and save to reload </p>
                        <p>edit
                            <code>src/app.tsx</code>
                            and save to reload </p>
                        <p>edit
                            <code>src/app.tsx</code>
                            and save to reload </p>
                    </div>
                </Transition>
                <Transition
                    in={show}
                    timeout={300}
                    animation="zoom-in-top"
                    wrapper>
                    <Button>A large button</Button>
                </Transition>
                <hr/>
                <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenus={['2']}
                      onSelect={(index) => {
                          console.log(index);
                      }}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link 2</MenuItem>
                    <SubMenu title="dropdown">
                        <MenuItem>dropdown 1</MenuItem>
                        <MenuItem>dropdown 2</MenuItem>
                        <MenuItem>dropdown 3</MenuItem>
                    </SubMenu>
                    <MenuItem>cool link 3</MenuItem>
                </Menu>
                <hr/>
                <Button>Default</Button>
                <Button btnType='primary'>Primary</Button>
                <Button btnType='danger'>Danger</Button>
                <Button btnType='link' href="http://www.baidu.com">Link</Button>
                <hr/>
                <Button btnType='primary' size='sm'>Primary</Button>
                <Button btnType='primary'>Primary</Button>
                <Button btnType='primary' size='lg'>Primary</Button>
                <hr/>
                <Button btnType='primary'>primary</Button>
                <Button disabled>disabled</Button>
                <Button btnType='link' size='sm' href="http://www.baidu.com" target="_blank">
                    Link</Button>
                <Button disabled btnType='link' size='sm' href="http://www.baidu.com"> disabled
                    Link</Button>
                <hr/>
            </header>
        </div>
    );
}

export default App;
