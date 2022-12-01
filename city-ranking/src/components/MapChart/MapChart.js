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
        d3.select("#mapchart").selectAll('svg').remove();
        SetupChart();

    }, [dimensions, dropValue])

    const SetupChart = () => {

        const chartwidth = parseInt(d3.select('#mapchart').style('width'));
        const chartheight = parseInt(d3.select('#mapchart').style('height'));
        
        // The SVG
        const svg = d3.select("#mapchart").append('svg')
        .attr("ref", d3MapChart.current)
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

        d3.select("div.tooltip").selectAll("ul").remove();
        d3.select("div.tooltip").selectAll("li").remove();

        const tooltip = d3.select("div.tooltip")
        .style("opacity", 0);


        // Load external data and boot
        data.forEach(value => {
            switch(dropValue) {
                case "Health Care":
                    if(value.country in records){
                        var i = records[value.country]
                        i[1][value.city] = value.healthCare;
                        records[value.country] = [(i[0]+parseInt(value.healthCare))/2, i[1]];
                    }
                    else{
                        let dic = {};
                        dic[value.city] = value.healthCare;
                        records[value.country] = [parseInt(value.healthCare), dic];
                    }
                    break;
                case "Pollution":
                    if(value.country in records){
                        var i = records[value.country]
                        i[1][value.city] = value.pollution;
                        records[value.country] = [(i[0]+parseInt(value.pollution))/2, i[1]];
                    }
                    else{
                        let dic = {};
                        dic[value.city] = value.pollution;
                        records[value.country] = [parseInt(value.pollution), dic];
                    }
                    break;
                case "Criminal Rate":
                    if(value.country in records){
                        var i = records[value.country]
                        i[1][value.city] = value.crimeRating;
                        records[value.country] = [(i[0]+parseInt(value.crimeRating))/2, i[1]];
                    }
                    else{
                        let dic = {};
                        dic[value.city] = value.crimeRating;
                        records[value.country] = [parseInt(value.crimeRating), dic];
                    }
                    break;
                case "Purchase Power":
                    if(value.country in records){
                        var i = records[value.country]
                        i[1][value.city] = value.purchasePower;
                        records[value.country] = [(i[0]+parseInt(value.purchasePower))/2, i[1]];
                    }
                    else{
                        let dic = {};
                        dic[value.city] = value.purchasePower;
                        records[value.country] = [parseInt(value.purchasePower), dic];
                    }
                    break;
                case "Quality of Life":
                    if(value.country in records){
                        var i = records[value.country]
                        i[1][value.city] = value.qualityLife;
                        records[value.country] = [(i[0]+parseInt(value.qualityLife))/2, i[1]];
                    }
                    else{
                        let dic = {};
                        dic[value.city] = value.qualityLife;
                        records[value.country] = [parseInt(value.qualityLife), dic];
                    }
                    break;
                default:
                    records[value.country] = parseInt(value.healthCare)
            }
        })
        Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        ]).then(function(loadData){
            let topo = loadData[0]

            let mouseOver = function(event,d) {
            
                d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 0.4);
                d3.select(this)
                .transition()
                .duration(0)
                .style("opacity", 1)
                .style("stroke", "black");

            }
        
            let mouseLeave = function(d) {
                d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 1);
                d3.select(this)
                .transition()
                .duration(0)
                .style("stroke", "transparent");
            }

            let click = function(event, d) {

                tooltip.selectAll("li").remove();
                tooltip.selectAll("ul").remove();

                tooltip.append("ul")
                .attr("class", "list")
                .style("font-size", "20px")
                .text(d.properties.name)

                if (records[d.id]!==undefined)
                    for (var key in records[d.id][1]){
                        tooltip.join("ul")
                        .append('li')
                        // .style("border-bottom", "1px solid #fff")
                        // .style("border-right", "1px solid #fff")
                        .style("width", "20%")
                        .style("float", "left")
                        .style("font-size", "16px")
                        .text(key + " - " + records[d.id][1][key])
                    }

                tooltip.style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px")
                .transition().duration(400)
                .style("opacity", 1)

                
            
                // var x, y, k;
                // console.log(d);
                // console.log(d.target.__data__.geometry.coordinates);
                
                // if (d && centered !== d) {
                //     var centroid = path.centroid(d.target.__data__.geometry.coordinates);
                //     console.log(centroid);
                //     x = -(centroid[0] * 6);
                //     y = (centroid[1] * 6);
                //     k = 3;  
                //     centered = d;
                // } else {
                //     x = 0;
                //     y = 0;
                //     k = 1;
                //     centered = null;
                // }
                
                // svg.selectAll("path")
                //     .classed("active", centered && function(d) { return d === centered; });
                
                // svg.transition()
                //     .duration(750)
                //     .attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")" );
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
                        color_value = records[d.id][0];
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
                <div className='map-chart' id='mapchart'>
                    <svg ref={d3MapChart}></svg>
                </div>
                <div className='tooltip'>
                </div>
            </div>
        </div>
    )
}

export default MapChart;