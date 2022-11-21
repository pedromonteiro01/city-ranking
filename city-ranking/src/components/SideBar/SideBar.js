import CheckBoxGroup from '../CheckBoxGroup/CheckBoxGroup';
import FiltersBox from '../FiltersBox/FiltersBox';
import Input from '../Input/Input';
import logo from './logo-without-bg.png';
import 'animate.css';
import './SideBar.css';
import ChartOption from '../ChartOption/ChartOption';
import { useState } from 'react';

const SideBar = (props) => {

    const [showSelect, setShowSelect] = useState("bar");

    const selectChange = (value) => {
        switch (value) {
            case "line":
                setShowSelect("line");
                props.myFunc("line");
                break;
            case "bar":
                setShowSelect("bar");
                props.myFunc("bar");
                break;
            case "radar":
                setShowSelect("radar");
                props.myFunc("radar");
                break;
            case "map":
                setShowSelect("map");
                props.myFunc("map");
                break;
            default:
                return;
        }
    };

    return (
        <div className='side-bar'>
            <div className='logo-wrapper'>
                <img src={logo} alt=''></img>
            </div>
            <div className='side-bar-items'>
                <div className='side-bar-items-bar-selection'>
                    <div className='side-bar-items-bar-selection-elements'>
                        <ChartOption onClick={() => selectChange("bar")} class={showSelect === "bar" ? "chart-option-active" : "chart-option"} image="charts/bar-chart.png" desc="Bar" />
                        <ChartOption onClick={() => selectChange("line")} class={showSelect === "line" ? "chart-option-active" : "chart-option"} image="charts/line-chart.png" desc="Line" />
                    </div>
                    <div className='side-bar-items-bar-selection-elements' style={{ marginBottom: '1.5rem' }}>
                        <ChartOption onClick={() => selectChange("radar")} class={showSelect === "radar" ? "chart-option-active" : "chart-option"} image="charts/radar-chart.png" desc="Radar" />
                        <ChartOption onClick={() => selectChange("map")} class={showSelect === "map" ? "chart-option-active" : "chart-option"} image="charts/mundo.png" desc="Map" />
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