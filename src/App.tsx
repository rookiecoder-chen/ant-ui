import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary</Button>
        <Button disabled btnType={ButtonType.Link} size={ButtonSize.Small} href="http://www.baidu.com"> Baidu Link</Button>
      </header>
    </div>
  );
}

export default App;
