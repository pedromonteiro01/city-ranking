import './App.css';
import SideBar from './components/SideBar/SideBar';
import BarChart from './components/BarChart/BarChart';
import LineChart from './components/LineChart/LineChart';
import city_quality_csv from './dataset/movehubqualityoflife.csv';
import Papa from "papaparse";
import { useEffect, useState } from 'react';

function App() {

  const [active, setActive] = useState("bar");
  const [records, setRecords] = useState(null);

  useEffect(()=>{
    Papa.parse(city_quality_csv, {
      download: true,
      complete: function (input) {
          const inpt = input.data
          let values = [];
          for (let i = 0; i<inpt.length; i++){
            if (i !== 0) {
              values.push({city: input.data[i][0], rating: input.data[i][1], purchasePower: input.data[i][2], healthCare: input.data[i][3], pollution: input.data[i][4], qualityLife: input.data[i][5], crimeRating: input.data[i][6]});
            }
          }
          setRecords(values);
      }
    });
  },[])

  const receivedData = (data) => {
    setActive(data);
  };

  return (
    <div className="app">
      <div className='side-bar-wrapper'>
        <SideBar myFunc={receivedData} />
      </div>
      <div className='content'>
        {active === "bar" && records!==null && <BarChart data={records}/>}
        {active === "line" && records!==null && <LineChart />}
        {active === "radar" && records!==null && <p>Radar</p>}
        {active === "map" && records!==null && <p>Map</p>}
      </div>
    </div>
  );
}

export default App;
