import { Dropdown } from "@nextui-org/react";
import { useState } from "react";
import Radar from 'react-d3-radar';
import './RadarChart.css';

const RadarChart = (props) => {

    const [data, setData] = useState(props.data);
    const [city1, setCity1] = useState(props.data[0]);
    const [city2, setCity2] = useState(props.data[1]);
    const [city1string, setCity1string] = useState(city1.city);
    const [city2string, setCity2string] = useState(city2.city);
    const [showAutocomplete1, setShowAutocomplete1] = useState(false);
    const [showAutocomplete2, setShowAutocomplete2] = useState(false);
    const [cities, setCities] = useState([]);
    const [results1, setResults1] = useState();
    const [results2, setResults2] = useState();

    const handleCity1Search = (event) => {
        var str = event.target.value;
        setCity1string(str);
        if (str.length===0)
            setShowAutocomplete1(false);
        else{
            str = str.toLowerCase();
            var result = [];
            data.forEach((d) => {
                var lcCity = d.city.toLowerCase();
                if (lcCity.includes(str)) {
                    setShowAutocomplete1(true);
                    result.push(<li key={lcCity+"1"} onClick={() => {setCity1(d); setCity1string(d.city); setShowAutocomplete1(false);}}>{lcCity}</li>)
                }
                setResults1(result);
            })
        }
    }

    const handleCity2Search = (event) => {
        var str = event.target.value;
        setCity2string(str);
        if (str.length===0)
            setShowAutocomplete2(false);
        else{
            str = str.toLowerCase();
            var result = [];
            data.forEach((d) => {
                var lcCity = d.city.toLowerCase();
                if (lcCity.includes(str)) {
                    setShowAutocomplete2(true);
                    result.push(<li key={lcCity+"2"} onClick={() => {setCity2(d); setCity2string(d.city); setShowAutocomplete2(false);}}>{lcCity}</li>)
                }
                setResults2(result);
            })
        }
    }

    return (
        <div className="radar-chart animate__animated animate__fadeInDown">
            <div className='radar-chart-header'>
                <h3>Cities Comparison</h3>
                <div className="radar-dropdown-items">
                    <div>
                        <input className="radar-input-1" placeholder="City..." autoComplete="off" value={city1string} onChange={handleCity1Search} onBlur={()=>{if(city1string.length===0) setShowAutocomplete1(false)}}/>
                        <ul className="autocomplete1">
                            {
                                showAutocomplete1 && results1
                            }
                        </ul>
                    </div>
                    <div>
                        <input className="radar-input-2" placeholder="City..." autoComplete="off" value={city2string} onChange={handleCity2Search} onBlur={()=>{if(city2string.length===0) setShowAutocomplete2(false)}}/>
                        <ul className="autocomplete2">
                            {
                                showAutocomplete2 && results2
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="radar-chart-item">
                <Radar
                    width={600}
                    height={600}
                    padding={60}
                    domainMax={100}
                    highlighted={null}
                    onHover={(point) => {
                        if (point) {
                            console.log('hovered over a data point');
                        } else {
                            console.log('not over anything');
                        }
                    }}
                    data={{
                        variables: [
                            { key: 'criminal', label: 'Criminal Rate' },
                            { key: 'health', label: 'Health Care' },
                            { key: 'purchase', label: 'Purchase Power' },
                            { key: 'pollution', label: 'Pollution' },
                            { key: 'rating', label: 'Rating' },
                            { key: 'quality', label: 'Quality of Life' },
                        ],
                        sets: [
                            {
                                key: city1.city,
                                label: city1.city,
                                values: {
                                    criminal: city1.crimeRating,
                                    health: city1.healthCare,
                                    purchase: city1.purchasePower,
                                    pollution: city1.pollution,
                                    rating: city1.rating,
                                    quality: city1.qualityLife,
                                },
                            },
                            {
                                key: city2.city,
                                label: city2.city,
                                values: {
                                    criminal: city2.crimeRating,
                                    health: city2.healthCare,
                                    purchase: city2.purchasePower,
                                    pollution: city2.pollution,
                                    rating: city2.rating,
                                    quality: city2.qualityLife,
                                },
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default RadarChart;