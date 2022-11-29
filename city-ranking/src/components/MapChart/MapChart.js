import './MapChart.css';
import React, { useRef, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import * as d3 from 'd3';
import * as d3geoProjection from 'd3-geo-projection';
import * as d3geo from "d3-geo";

const MapChart = () => {

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    const d3MapChart = useRef();
    // Ref for updating dimention 
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const margin = { top: 30, right: 30, bottom: 10, left: 60 }

    // Ref for resize event update
    const update = useRef(false)

    useEffect(() => {

        // Listen for any resize event update
        window.addEventListener('resize', () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })

            // If resize, remove the previous chart
            if (update.current) {
                d3.selectAll('g').remove()
            } else { update.current = true }
        }, [])

        // Draw chart using the data and updated dimensions
        SetupChart();

    }, [dimensions])

    const SetupChart = () => {

        const chartwidth = parseInt(d3.select('#mapchart').style('width'))
        const chartheight = parseInt(d3.select('#mapchart').style('height'))

        // The svg
        const svg = d3.select(d3MapChart.current)
            .attr("width", chartwidth)
            .attr("height", chartheight)
            .append("g");

        // Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
        var projection = d3geoProjection.geoNaturalEarth2()
        .scale(chartwidth / 2 / Math.PI)
        .translate([chartwidth / 2, chartheight / 2])

        // Load external data and boot
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

        // Draw the map
        svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3geo.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
        })
    }

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
                <div id='mapchart'>
                    <svg ref={d3MapChart}></svg>
                </div>
            </div>
        </div>
    )
}

export default MapChart;