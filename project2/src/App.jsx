import { Fragment } from 'react';
import Login from './components/Login.jsx';
import Counter from './components/Couter.jsx';
import MyGoogleMap from './components/MyGoogleMap.jsx';
import Map from './components/Map.jsx';
import  Search  from './components/Search.jsx';

function App() {
  return (
    <Fragment>
      <Counter />
      <Login />
      <MyGoogleMap />
    </Fragment>
   
  );
}

export default App;