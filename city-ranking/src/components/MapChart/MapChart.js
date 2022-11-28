import './MapChart.css';
import React, { useRef, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import * as d3 from 'd3';

const MapChart = () => {

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    return (
        <div className="map-chart animate__animated animate__fadeInDown">
            <div className='map-chart-header'>
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
            <div className="map-chart-item">
                <div id='mapchart' >
                    <svg ref={null}></svg>
                </div>
            </div>
        </div>
    )
}

export default MapChart;