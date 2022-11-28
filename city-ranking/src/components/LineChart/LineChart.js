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
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data, id = "myZoomableLineChart" }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [currentZoomState, setCurrentZoomState] = useState();

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const svgContent = svg.select(".content");
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();

        // scales + line generator
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([10, width - 10]);

        if (currentZoomState) {
            const newXScale = currentZoomState.rescaleX(xScale);
            xScale.domain(newXScale.domain());
        }

        const yScale = scaleLinear()
            .domain([0, max(data)])
            .range([height - 10, 10]);

        const lineGenerator = line()
            .x((d, index) => xScale(index))
            .y((d) => yScale(d))
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
            .attr("stroke", "black")
            .attr("r", 4)
            .attr("fill", "lightblue")
            .attr("cx", (value, index) => xScale(index))
            .attr("cy", yScale);

        // axes
        const xAxis = axisBottom(xScale);
        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select(".y-axis").call(yAxis);

        // zoom
        const zoomBehavior = zoom()
            .scaleExtent([0.5, 5])
            .translateExtent([
                [0, 0],
                [width, height],
            ])
            .on("zoom", (event) => {
                const zoomState = event.transform;
                setCurrentZoomState(zoomState);
            });

        svg.call(zoomBehavior);
    }, [currentZoomState, data, dimensions]);

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
                <div ref={wrapperRef} style={{ marginBottom: "2rem", height:'30rem' }}>
                    <svg ref={svgRef} className="svg">
                        <defs>
                            <clipPath id={id}>
                                <rect x="0" y="0" width="100%" height="100%" />
                            </clipPath>
                        </defs>
                        <g className="content" clipPath={`url(#${id})`}></g>
                        <g className="x-axis" />
                        <g className="y-axis" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ZoomableLineChart;