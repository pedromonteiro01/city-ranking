import { Dropdown } from "@nextui-org/react";
import { useState } from "react";
import Radar from 'react-d3-radar';
import './RadarChart.css';

const RadarChart = (props) => {
    const menuItems = [
        { key: "lisbon", name: "Lisbon" },
        { key: "madrid", name: "Madrid" },
        { key: "paris", name: "Paris" },
    ];

    const [data, setData] = useState(props.data);
    const [city1, setCity1] = useState(data[0]);
    const [city2, setCity2] = useState(data[1]);

    return (
        <div className="radar-chart animate__animated animate__fadeInDown">
            <div className='radar-chart-header'>
                <h3>Cities Comparison</h3>
                <div className="radar-dropdown-items">
                <Dropdown>
                    <Dropdown.Button flat>{city1!==null ? city1.city : "Trigger"}</Dropdown.Button>
                    <Dropdown.Menu aria-label="Dynamic Actions" items={data} onAction={(key) => {
                        for (let index in data) {
                            if (data[index].city === key){
                                setCity1(data[index]);
                                //DrawChart(sample, dimensions);
                                break;
                            }
                        }
                    }}>
                        {(item) => (
                            <Dropdown.Item
                                key={item.city}
                                color={item.city === "delete" ? "error" : "default"}
                            >
                                {item.city}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown >
                    <Dropdown.Button flat css={{
                  borderRadius: '$xs', // radii.xs
                  border: '$space$1 solid transparent',
                  background: '#FCC195', // colors.pink800
                  color: '#EB751D',
                  textAlign: "center",
                  padding: 5,
                  width: "100%",
                  borderRadius: '12px',
                  boxShadow: '$md', // shadows.md
                  '&:hover': {
                    background: '#FBA76A',
                  },
                }}>{city2!==null ? city2.city : "Trigger"}</Dropdown.Button>
                    <Dropdown.Menu aria-label="Dynamic Actions" items={data} onAction={(key) => {
                        for (let index in data) {
                            if (data[index].city === key){
                                setCity2(data[index]);
                                //DrawChart(sample, dimensions);
                                break;
                            }
                        }
                    }}>
                        {(item) => (
                            <Dropdown.Item
                                key={item.city}
                                color={item.city === "delete" ? "error" : "default"}
                            >
                                {item.city}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
            <div className="radar-chart-item">
                <Radar
                    width={600}
                    height={600}
                    padding={70}
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