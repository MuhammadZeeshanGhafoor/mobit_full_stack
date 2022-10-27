
import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';
import SideNav from './components/SideNav';


function App() {
  const [tab, setTab] = useState(0)
  return (
      <div className="App">
          <Header/>
          <div className='main-body'>
          <SideNav setTab={setTab} />
          <MainView tab={tab}/>
          </div>
      </div>
  );
}

export default App;
