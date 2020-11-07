import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
                <Button btnType={ButtonType.Primary}>Primary</Button>
                <Button btnType={ButtonType.Danger}>Danger</Button>
                <Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>
                <hr/>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Primary</Button>
                <Button btnType={ButtonType.Primary}>Primary</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary</Button>
                <hr/>
                <Button btnType={ButtonType.Primary}>primary</Button>
                <Button disabled>disabled</Button>
                <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="http://www.baidu.com" target="_blank">
                    Link</Button>
                <Button disabled btnType={ButtonType.Link} size={ButtonSize.Small} href="http://www.baidu.com"> disabled
                    Link</Button>
                <hr/>
            </header>
        </div>
    );
}

export default App;
