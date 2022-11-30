import './MapChart.css';
import React, { useRef, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import * as d3 from 'd3';
import * as d3geoProjection from 'd3-geo-projection';
import * as d3geo from "d3-geo";

const MapChart = (props) => {

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
        { key: "purchasePower", name: "Purchase Power" },
        { key: "qualityLife", name: "Quality of Life" },
    ];

    const [data, setData] = useState(props.data);

    const d3MapChart = useRef();
    // Ref for updating dimention 
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const [dropValue, setDropValue] = useState('Health Care');

    // Ref for resize event update
    const update = useRef(false)

    useEffect(() => {

        // Listen for any resize event update
        // window.addEventListener('resize', () => {
        //     setDimensions({
        //         width: window.innerWidth,
        //         height: window.innerHeight
        //     })

        //     // If resize, remove the previous chart
        //     if (update.current) {
        //         d3.selectAll('g').remove()
        //     } else { update.current = true }
        // }, [])

        // Draw chart using the data and updated dimensions
        SetupChart();

    }, [dimensions, dropValue])

    const SetupChart = () => {

        const chartwidth = parseInt(d3.select('#mapchart').style('width'));
        const chartheight = parseInt(d3.select('#mapchart').style('height'));

        // The svg
        const svg = d3.select(d3MapChart.current)
            .attr("width", chartwidth)
            .attr("height", chartheight);

        let centered;

        // Map and projection
        const path = d3geo.geoPath();
        const projection = d3geoProjection.geoNaturalEarth2()
        .scale(230)
        .center([0, 7])
        .translate([chartwidth / 2.3, chartheight / 2]);

        // Data and color scale
        const records = {};
        const colorScale = d3.scaleThreshold()
        .domain([20, 40, 60, 80, 100])
        .range(d3.schemeBlues[5]);

        // Load external data and boot
        data.forEach(value => {
            switch(dropValue) {
                case "Health Care":
                    if(value.country in records){
                        var i = records[value.country]
                        records[value.country] = (i+parseInt(value.healthCare))/2;
                    }
                    else
                        records[value.country] = parseInt(value.healthCare);
                    break;
                case "Pollution":
                    if(value.country in records){
                        var i = records[value.country]
                        records[value.country] = (i+parseInt(value.pollution))/2;
                    }
                    else
                        records[value.country] = parseInt(value.pollution)
                    break;
                case "Criminal Rate":
                    if(value.country in records){
                        var i = records[value.country]
                        records[value.country] = (i+parseInt(value.crimeRating))/2;
                    }
                    else
                        records[value.country] = parseInt(value.crimeRating)
                    break;
                case "Purchase Power":
                    if(value.country in records){
                        var i = records[value.country]
                        records[value.country] = (i+parseInt(value.purchasePower))/2;
                    }
                    else
                        records[value.country] = parseInt(value.purchasePower)
                    break;
                case "Quality of Life":
                    if(value.country in records){
                        var i = records[value.country]
                        records[value.country] = (i+parseInt(value.qualityLife))/2;
                    }
                    else
                        records[value.country] = parseInt(value.qualityLife)
                    break;
                default:
                    records[value.country] = parseInt(value.healthCare)
            }
        })
        Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        ]).then(function(loadData){
            let topo = loadData[0]

            let mouseOver = function(d) {
                d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 0.5)
                d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 1)
                .style("stroke", "black")
            }
        
            let mouseLeave = function(d) {
                d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 1)
                d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "transparent")
            }

            let click = function(d) {
                var x, y, k;
                
                if (d && centered !== d) {
                    var centroid = path.centroid(d);
                    x = -(centroid[0] * 6);
                    y = (centroid[1] * 6);
                    k = 3;
                    centered = d;
                } else {
                    x = 0;
                    y = 0;
                    k = 1;
                    centered = null;
                }
                
                svg.selectAll("path")
                    .classed("active", centered && function(d) { return d === centered; });
                
                svg.transition()
                    .duration(750)
                    //.attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")" );
                }

            // Draw the map
            svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
                // draw each country
                .attr("d", d3geo.geoPath()
                .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    let color_value=0;
                    if (d.id in records)
                        color_value = records[d.id];
                return colorScale(color_value);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                .on("mouseover", mouseOver )
                .on("mouseleave", mouseLeave )
                .on("click", click)

        })

        // Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
        // var projection = d3geoProjection.geoNaturalEarth2()
        // .scale(chartwidth / 2 / Math.PI)
        // .translate([chartwidth / 2, chartheight / 2])

        // Load external data and boot
        // d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

        // // Draw the map
        // svg.append("g")
        // .selectAll("path")
        // .data(data.features)
        // .join("path")
        //     .attr("fill", "#69b3a2")
        //     .attr("d", d3geo.geoPath()
        //         .projection(projection)
        //     )
        //     .style("stroke", "#fff")
        // })
    }

    return (
        <div className="map-chart animate__animated animate__fadeInDown">
            <div className='map-chart-header'>
                <h3>Stats by City</h3>
                <Dropdown>
                    <Dropdown.Button flat>{dropValue}</Dropdown.Button>
                    <Dropdown.Menu aria-label="Dynamic Actions" items={menuItems} onAction={(key) => {
                        for (let index in menuItems) {
                            if (menuItems[index].key === key){
                                setDropValue(menuItems[index].name);
                                //DrawChart(sample, dimensions);
                                break;
                            }
                        }
                    }}>
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