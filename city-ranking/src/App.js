import './App.css';
import SideBar from './components/SideBar/SideBar';
import BarChart from './components/BarChart/BarChart';

function App() {
  return (
    <div className="app">
      <div className='side-bar-wrapper'>
        <SideBar />
      </div>
      <div className='content'>
      <BarChart />
      </div>
    </div>
  );
}

export default App;
