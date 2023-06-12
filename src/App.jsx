import React from 'react';
import 'App.scss';
import AddButton from 'components/common/AddButton';

function App() {
  return (
    <div>
      <AddButton width={70} height={70} handleClick={evt => console.log(evt)} />
    </div>
  );
}

export default App;
