import { Fragment } from 'react';
import Login from './components/Login.jsx';
import Counter from './components/Couter.jsx';
import GoogleMap from './components/GoogleMap.jsx';


function App() {
  return (
    <Fragment>
      <Counter />
      <Login />
      <GoogleMap />
    </Fragment>
  );
}

export default App;