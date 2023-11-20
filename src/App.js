// App.js
import React from 'react';
import AjaxComponent1 from './components/AjaxComponent1';
import Button from './components/Button';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  return (
    <div className="App">
      <AjaxComponent1 />
      <Button />
    </div>

  );
}

export default App;
