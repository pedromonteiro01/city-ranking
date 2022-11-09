import { Dropdown } from "@nextui-org/react";
import './BarChart.css';

const BarChart = () => {

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    return (
        <div className='bar-chart'>
            <div className='bar-chart-header'>
                <h3>Stats by City</h3>
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
            <div>
            </div>
        </div>
    )
}

export default BarChart;