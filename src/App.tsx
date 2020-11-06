import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
            </header>
        </div>
    );
}

export default App;
