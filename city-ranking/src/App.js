import './App.css';
import SideBar from './components/SideBar/SideBar';
import BarChart from './components/BarChart/BarChart';
import LineChart from './components/LineChart/LineChart';
import { useState } from 'react';

function App() {

  const [active, setActive] = useState("bar");

  const receivedData = (data) => {
    setActive(data);
  };

  return (
    <div className="app">
      <div className='side-bar-wrapper'>
        <SideBar myFunc={receivedData} />
      </div>
      <div className='content'>
        {active === "bar" && <BarChart />}
        {active === "line" && <LineChart />}
        {active === "radar" && <p>Radar</p>}
        {active === "map" && <p>Map</p>}
      </div>
    </div>
  );
}

export default App;
