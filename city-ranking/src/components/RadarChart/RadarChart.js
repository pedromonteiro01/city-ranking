import { Dropdown } from "@nextui-org/react";
import Radar from 'react-d3-radar';
import './RadarChart.css';

const RadarChart = () => {
    const menuItems = [
        { key: "lisbon", name: "Lisbon" },
        { key: "madrid", name: "Madrid" },
        { key: "paris", name: "Paris" },
    ];
    return (
        <div className="radar-chart animate__animated animate__fadeInDown">
            <div className='radar-chart-header'>
                <h3>Cities Comparison</h3>
                <div className="radar-dropdown-items">
                <Dropdown>
                    <Dropdown.Button flat>Trigger</Dropdown.Button>
                    <Dropdown.Menu aria-label="Dynamic Actions" items={menuItems}>
                        {(item) => (
                            <Dropdown.Item
                                key={item.key}
                                color={item.key === "delete" ? "error" : "default"}
                            >
                                {item.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Button flat>Trigger</Dropdown.Button>
                    <Dropdown.Menu aria-label="Dynamic Actions" items={menuItems}>
                        {(item) => (
                            <Dropdown.Item
                                key={item.key}
                                color={item.key === "delete" ? "error" : "default"}
                            >
                                {item.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
            <div className="radar-chart-item">
                <Radar
                    width={500}
                    height={500}
                    padding={70}
                    domainMax={10}
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
                                key: 'me',
                                label: 'My Scores',
                                values: {
                                    criminal: 4,
                                    health: 6,
                                    purchase: 7,
                                    pollution: 2,
                                    rating: 8,
                                    quality: 4,
                                },
                            },
                            {
                                key: 'everyone',
                                label: 'Everyone',
                                values: {
                                    criminal: 10,
                                    health: 8,
                                    purchase: 6,
                                    pollution: 4,
                                    rating: 2,
                                    quality: 0,
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