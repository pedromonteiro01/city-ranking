import './App.css';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="app">
      <div className='side-bar-wrapper'>
        <SideBar />
      </div>
      <div className='content' style={{marginLeft: '1rem'}}>
        <p>content</p>
      </div>
    </div>
  );
}

export default App;
