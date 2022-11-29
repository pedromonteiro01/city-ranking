import './App.css';
import SideBar from './components/SideBar/SideBar';
import BarChart from './components/BarChart/BarChart';
import city_quality_csv from './dataset/movehubqualityoflife.csv';
import Papa from "papaparse";
import { useEffect, useState } from 'react';
import ZoomableLineChart from './components/LineChart/LineChart';
import RadarChart from './components/RadarChart/RadarChart';
import MapChart from './components/MapChart/MapChart';

function App() {

  const [active, setActive] = useState("bar");
  const [records, setRecords] = useState(null);

  useEffect(()=>{
    if (records === null) {
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
    }
  },[])

  const receivedData = (data) => {
    setActive(data);
  };

  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <div className="app">
      <div className='side-bar-wrapper'>
        <SideBar myFunc={receivedData} />
      </div>
      <div className='content'>
        {active === "bar" && records!==null && <BarChart data={records}/>}
        {active === "line" && records!==null && <ZoomableLineChart data={data} />}
        {active === "radar" && records!==null && <RadarChart />}
        {active === "map" && records!==null && <p><MapChart /></p>}
        {active === "pie" && records!==null && <p>Pie</p>}
      </div>
    </div>
  );
}

export default App;
