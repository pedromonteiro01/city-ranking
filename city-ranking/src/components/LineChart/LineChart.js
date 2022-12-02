import React, { useRef, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import './LineChart.css';
import * as d3 from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

const ZoomableLineChart = (props) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [data, setData] = useState(props.data);
    const [city1, setCity1] = useState("Lisbon");
    const [city2, setCity2] = useState("Porto");
    const [city3, setCity3] = useState("Braga");

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    var items = ["Cappuccino", "Cinema", "Wine", "Gasoline"]

    // will be called initially and on every data change
    useEffect(() => {
        SetupChart();
    }, [data, dimensions]);

    const SetupChart = () => {
        const svg = d3.select(svgRef.current);
        const svgContent = svg.select(".content");
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();
        //console.log("height: ", height)



        var values = []
        var keys = []
        data.forEach((el) => {
            if (el.city === city1 || el.city === city2 || el.city === city3){
                keys.push({city: el.city, values: el.values})
                for (let i in el.values){
                    values.push(el.values[i].value);
                }
            }
        })

        // scales + line generator
        var xScale = d3.scalePoint()
            .range([0, width])
            .domain(items);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(values) + 1])
            .range([height - 10, 10]);

        const lineGenerator = d3.line()
            .x(function (d) { return xScale(d.key) })
            .y(function (d) { return yScale(d.value) })
            //.curve(curveCardinal);

        // A color scale: one color for each group
        const myColor = d3.scaleOrdinal()
        .domain(d3.range(3))
        .range(d3.schemeSet2);

        // render the line
        svgContent
            .selectAll(".myLine")
            .data(keys)
            .join("path")
            .attr("class", "myLine")
            .attr("stroke", d => myColor(d.city))
            .attr("stroke-width", 4)
            .attr("fill", "none")
            .attr("class", d => d.city)
            .attr("d", d => lineGenerator(d.values));

            svg
            // First we need to enter in a group
            .selectAll("myDots")
            .data(keys)
            .join('g')
              .style("fill", d => myColor(d.city))
              .attr("class", d => d.city)
            // Second we need to enter in the 'values' part of this group
            .selectAll("myPoints")
            .data(d => d.values)
            .join("circle")
              .attr("cx", d => xScale(d.key))
              .attr("cy", d => yScale(d.value))
              .attr("r", 5)
              .attr("stroke", "white")

        svg
            .selectAll("myLabels")
            .data(keys)
            .enter()
            .append('g')
            .append("text")
            .attr("class", d => d.city)
            // use this to append label to last element
            .datum(function (d) { return { key: d.city, value: d.values[d.values.length - 1] }; }) // keep only the last value of each time series
            .attr("transform", function (d) { return "translate(" + xScale(d.value.key) + "," + yScale(d.value.value) + ")"; }) // Put the text at the position of the last point
            .attr("x", 15) // shift the text a bit more right
            .attr("y", 15) // shift the text a bit more right
            .text(d => d.key)
            .attr("fill", d => myColor(d.key))
            .style("font-size", 15)

        svg
            .selectAll("myLegend")
            .data(keys)
            .join('g')
              .append("text")
                .attr('x', (d,i) => 30 + i*60)
                .attr('y', 30)
                .text(d => d.city)
                .style("fill", d => myColor(d.city))
                .style("font-size", 15)
                .style("cursor", "pointer")
              .on("click", function(event,d){
                // is the element currently visible ?
                let currentOpacity = d3.selectAll("." + d.city).style("opacity")
                // Change the opacity: from 0 to 1 or from 1 to 0
                d3.selectAll("." + d.city).transition().style("opacity", currentOpacity == 1 ? 0:1)})


        // axes
        const xAxis = d3.axisBottom(xScale);
        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);
        svg.select(".y-axis").call(yAxis);
    }

    return (
        <div className="line-chart animate__animated animate__fadeInDown">
            <div className='line-chart-header'>
                <h3>Products Price by City</h3>
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
            <div className="line-chart-item">
                <div ref={wrapperRef} style={{ marginBottom: "2rem", height: '30rem' }}>
                    <svg ref={svgRef} className="svg">
                        <defs>
                            <clipPath>
                                <rect x="0" y="0" width="100%" height="100%" />
                            </clipPath>
                        </defs>
                        <g className="content"></g>
                        <g className="x-axis" />
                        <g className="y-axis" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ZoomableLineChart;
