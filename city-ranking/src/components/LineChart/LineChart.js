import React, { useRef, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import './LineChart.css';
import {
    select,
    scaleLinear,
    line,
    max,
    curveCardinal,
    axisBottom,
    axisLeft,
    zoom,
    scaleOrdinal,
    scalePoint,
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    var allGroup = ["valueA", "valueB", "valueC"]

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    var ids = []
    var items = []
    var values = []
    data.forEach((el) => {
        items.push(el.key)
        values.push(el.value)
        ids.push(el.id)
    })

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const svgContent = svg.select(".content");
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();
        //console.log("height: ", height)

        // scales + line generator
        var xScale = scalePoint()
            .range([0, width])
            .domain(items);

        const yScale = scaleLinear()
            .domain([0, max(values)+1])
            .range([height - 10, 10]);

        const lineGenerator = line()
            .x(function (d) { return xScale(d.key) })
            .y(function (d) { return yScale(d.value) })
            .curve(curveCardinal);

        // render the line
        svgContent
            .selectAll(".myLine")
            .data([data])
            .join("path")
            .attr("class", "myLine")
            .attr("stroke", "#ccc")
            .attr("stroke-width", "2px")
            .attr("fill", "none")
            .attr("d", lineGenerator);

        svgContent
            .selectAll(".myDot")
            .data(data)
            .join("circle")
            .attr("class", "myDot")
            .attr("r", 5)
            .attr("fill", "#ccc")
            .attr("cx", function (d) { return xScale(d.key) })
            .attr("cy", function (d) { return yScale(d.value) })

        // axes
        const xAxis = axisBottom(xScale);
        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis").call(yAxis);
    }, [data, dimensions]);

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
