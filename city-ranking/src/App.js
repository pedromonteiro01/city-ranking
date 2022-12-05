import './App.css';
import SideBar from './components/SideBar/SideBar';
import BarChart from './components/BarChart/BarChart';
import city_quality_csv from './dataset/movehubqualityoflife.csv';
import cities_csv from './dataset/cities.csv';
import country_codes_csv from './dataset/country_codes.csv';
import cost_living_csv from './dataset/movehubcostofliving.csv';
import Papa from "papaparse";
import { useEffect, useState } from 'react';
import ZoomableLineChart from './components/LineChart/LineChart';
import RadarChart from './components/RadarChart/RadarChart';
import MapChart from './components/MapChart/MapChart';
import SearchCity from './components/SearchCity/SearchCity';
import Home from './components/Home/Home';

function App() {

  const [active, setActive] = useState("bar");
  const [records, setRecords] = useState(null);
  const [countries, setCountries] = useState(null);
  const [codes, setCodes] = useState(null);
  const [cities, setCities] = useState(null);
  const [products, setProducts] = useState(null);
  const [showGraphs, setShowGraphs] = useState(false);

  const handleShowGraphs = () => {
    setShowGraphs(true);
  }

  useEffect(() => {
    if (records === null) {
      let values = [];
      Papa.parse(city_quality_csv, {
        download: true,
        complete: function (input) {
          const inpt = input.data
          for (let i = 0; i < inpt.length; i++) {
            if (i !== 0) {
              values.push({ city: input.data[i][0], rating: input.data[i][1], purchasePower: input.data[i][2], healthCare: input.data[i][3], pollution: input.data[i][4], qualityLife: input.data[i][5], crimeRating: input.data[i][6] });
            }
          }
          setRecords(values);
        }
      });

      Papa.parse(country_codes_csv, {
        download: true,
        complete: function (input) {
          const inpt = input.data
          let codes = {};
          for (let i = 0; i < inpt.length; i++) {
            if (i !== 0) {
              codes[input.data[i][0]] = input.data[i][2];
            }
          }
          setCodes(codes);
        }
      });

      Papa.parse(cities_csv, {
        download: true,
        complete: function (input) {
          const inpt = input.data
          let cities = {};
          for (let i = 0; i < inpt.length; i++) {
            if (i !== 0) {
              cities[input.data[i][0]] = input.data[i][1];
            }
          }
          setCities(cities);
        }
      });

      Papa.parse(cost_living_csv, {
        download: true,
        complete: function (input) {
          const inpt = input.data
          let prods = [];
          for (let i = 0; i < inpt.length; i++) {
            if (i !== 0) {
              let d = {};
              d["city"] = inpt[i][0];
              d["values"] = [{ key: "Cappuccino", value: inpt[i][1] }, { key: "Cinema", value: inpt[i][2] }, { key: "Wine", value: inpt[i][3] }, { key: "Gasoline", value: inpt[i][4] }];
              prods.push(d);
            }
          }
          setProducts(prods);
        }
      });

    }
  }, [])

  useEffect(() => {
    if (cities !== null && codes !== null && records !== null) {
      let result = [];
      let temp = {};
      for (var key in cities) {
        temp[key] = codes[cities[key]]
      }

      for (let index in records) {
        result.push({ city: records[index].city, country: temp[records[index].city], rating: records[index].rating, purchasePower: records[index].purchasePower, healthCare: records[index].healthCare, pollution: records[index].pollution, qualityLife: records[index].qualityLife, crimeRating: records[index].crimeRating })
      }
      setCountries(result);
    }
  }, [cities])

  const receivedData = (data) => {
    setActive(data);
  };

  const [data, setData] = useState(
    [
      {
        "id": 1,
        "key": "Coffee",
        "value": 2
      },
      {
        "id": 2,
        "key": "Sugar",
        "value": 4
      },
      {
        "id": 3,
        "key": "Water",
        "value": 8
      },
      {
        "id": 4,
        "key": "Oil",
        "value": 10
      },
      {
        "id": 5,
        "key": "Gas",
        "value": 14
      },
      {
        "id": 6,
        "key": "Coke",
        "value": 6
      }
    ]
  );

  if (showGraphs) {
    return (
      <div className="app">
        <div className='side-bar-wrapper'>
          <SideBar myFunc={receivedData} />
        </div>
        <div className='content'>
          {active === "bar" && records !== null && <BarChart data={records} />}
          {active === "line" && products !== null && <ZoomableLineChart data={products} />}
          {active === "radar" && records !== null && <RadarChart data={records} />}
          {active === "map" && countries !== null && <MapChart data={countries} />}
          {active === "pie" && records !== null && <p>Pie</p>}
          {active === "search" && <SearchCity data={records} />}
        </div>
      </div>)
  }
  else {
    return (
      <Home onClick={handleShowGraphs} />
    )
  }
}

export default App;
