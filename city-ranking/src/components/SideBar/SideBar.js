import CheckBoxGroup from '../CheckBoxGroup/CheckBoxGroup';
import FiltersBox from '../FiltersBox/FiltersBox';
import Input from '../Input/Input';
import logo from './logo-without-bg.png';
import 'animate.css';
import './SideBar.css';
import ChartOption from '../ChartOption/ChartOption';

const SideBar = () => {
    return (
        <div className='side-bar'>
            <div className='logo-wrapper'>
                <img src={logo} alt=''></img>
            </div>
            <div className='side-bar-items'>
                <div className='side-bar-items-bar-selection'>
                    <div className='side-bar-items-bar-selection-elements'>
                        <ChartOption image="charts/line-chart.png" desc="Line" />
                        <ChartOption image="charts/bar-chart.png" desc="Bar" />
                    </div>
                    <div className='side-bar-items-bar-selection-elements' style={{marginBottom: '1.5rem'}}>
                        <ChartOption image="charts/radar-chart.png" desc="Radar" />
                        <ChartOption image="charts/mundo.png" desc="Map" />
                    </div>
                </div>
                <FiltersBox />
                <Input />
                <CheckBoxGroup />
            </div>
        </div>
    )
}

export default SideBar;