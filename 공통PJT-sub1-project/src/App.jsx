import { Fragment } from 'react';
import Login from './components/Login.jsx';
import Counter from './components/Couter.jsx';

function App() {
  return (
    <Fragment>
      <Counter />
      <Login />
    </Fragment>
  );
}

export default App;