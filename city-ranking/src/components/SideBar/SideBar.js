import CheckBoxGroup from '../CheckBoxGroup/CheckBoxGroup';
import FiltersBox from '../FiltersBox/FiltersBox';
import Input from '../Input/Input';
import logo from './logo-without-bg.png';
import 'animate.css';
import './SideBar.css';
import ChartOption from '../ChartOption/ChartOption';
import { useState } from 'react';
import question from './question.png';
import close from './cancel.png';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'animate.css';

const SideBar = (props) => {

    const [showSelect, setShowSelect] = useState("about");
    const [showStatsByCityLabel, setShowStatsByCityLabel] = useState(false);
    const [showProductsByCityLabel, setShowProductsByCityLabel] = useState(false);
    const [showCitiesComparison, setShowCitiesComparison] = useState(false);
    const [statsClassName, setStatsClassName] = useState("");
    const [citiesClassName, setCitiesClassName] = useState("");
    const [productsClassName, setProductsClassName] = useState("");
    const [statsActive, setStatsActive] = useState(true);
    const [citiesActive, setCitiesActive] = useState(true);
    const [productsActive, setProductsActive] = useState(true);

    const showStatsLabel = () => {
        setStatsActive(false);
        setStatsClassName("animate__fadeInDown");
        setShowStatsByCityLabel(true);
    }

    const closeStatsLabel = () => {
        setStatsActive(true);
        setShowStatsByCityLabel(false);
    }

    const showCitiesLabel = () => {
        setCitiesActive(false);
        setCitiesClassName("animate__fadeInDown");
        setShowCitiesComparison(true);
    }

    const closeCitiesLabel = () => {
        setCitiesActive(true);
        setShowCitiesComparison(false);
    }

    const showProductsLabel = () => {
        setProductsActive(false);
        setProductsClassName("animate__fadeInDown");
        setShowProductsByCityLabel(true);
    }

    const closeProductsLabel = () => {
        setProductsActive(true);
        setShowProductsByCityLabel(false);
    }

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
            case "pie":
                setShowSelect("pie");
                props.myFunc("pie");
                break;
            case "search":
                setShowSelect("search");
                props.myFunc("search");
                break;
            case "about":
                setShowSelect("about");
                props.myFunc("about");
                break;
            default:
                return;
        }
    };

    return (
        <div className='side-bar'>
            <div style={{
                fontFamily: 'Indie Flower' ,
                fontWeight: 900,
                fontSize: '2.2rem',
                textAlign: 'center',
                margin: '3rem 0',
            }}>
                CityRanking
            </div>
            <div className='side-bar-items'>
                <button onClick={() => selectChange("search")} className='search-button'><FontAwesomeIcon className="icon-search" icon={faSearch}/>Search City</button>
                <div className='side-bar-items-bar-selection'>
                    <div className='side-bar-item'>
                        {showStatsByCityLabel &&
                            <div className={`stats-by-city-label animate__animated ${statsClassName}`}>
                                Here you can find all stats across all different cities.
                            </div>
                        }
                        <div className='side-bar-item-wrapper'>
                            <p className='side-bar-item-desc'>Stats by City</p>
                            <div className='question-wrapper'>
                                {
                                    statsActive ?
                                    <img onClick={showStatsLabel} src={question} />
                                    :
                                    <img onClick={closeStatsLabel} src={close} />
                                }
                            </div>
                        </div>
                        <div className='side-bar-items-bar-selection-elements'>
                            <ChartOption onClick={() => selectChange("bar")} class={showSelect === "bar" ? "chart-option-active" : "chart-option"} image="charts/bar-chart.png" desc="Bar" />
                            <ChartOption onClick={() => selectChange("map")} class={showSelect === "map" ? "chart-option-active" : "chart-option"} image="charts/mundo.png" desc="Map" />
                        </div>
                    </div>
                    <div className='side-bar-item'>
                        {showCitiesComparison &&
                            <div className={`cities-comparison-label animate__animated ${citiesClassName}`}>
                                Here you can compare two different cities.
                            </div>
                        }
                        <div className='side-bar-item-wrapper'>
                            <p className='side-bar-item-desc'>Cities Comparison</p>
                            <div className='question-wrapper'>
                                {
                                    citiesActive ?
                                    <img onClick={showCitiesLabel} src={question} />
                                    :
                                    <img onClick={closeCitiesLabel} src={close} />
                                }
                            </div>
                        </div>
                        <div className='side-bar-items-bar-selection-elements'>
                            <ChartOption onClick={() => selectChange("radar")} class={showSelect === "radar" ? "chart-option-active" : "chart-option"} image="charts/radar-chart.png" desc="Radar" />
                        </div>
                    </div>
                    <div className='side-bar-item'>
                        {showProductsByCityLabel &&
                            <div className={`products-price-label animate__animated ${productsClassName}`}>
                                Here you can find all different products prices across all different cities.
                            </div>
                        }
                        <div className='side-bar-item-wrapper'>
                            <p className='side-bar-item-desc'>Products Prices</p>
                            <div className='question-wrapper'>
                                {
                                    productsActive ?
                                    <img onClick={showProductsLabel} src={question} />
                                    :
                                    <img onClick={closeProductsLabel} src={close} />
                                }
                            </div>
                        </div>
                        <div className='side-bar-items-bar-selection-elements'>
                            <ChartOption onClick={() => selectChange("line")} class={showSelect === "line" ? "chart-option-active" : "chart-option"} image="charts/line-chart.png" desc="Line" />
                        </div>
                    </div>
                </div>
                <button onClick={() => selectChange("about")} className='search-button'>About</button>
            </div>
        </div>
    )
}

export default SideBar;