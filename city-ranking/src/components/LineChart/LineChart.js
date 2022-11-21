import { Dropdown } from "@nextui-org/react";
import * as d3 from 'd3';
import { scaleLinear } from "d3";
import { useEffect, useRef, useState } from "react";
import './LineChart.css';

const LineChart = () => {
    const [data, setData] = useState([35, 90, 205, 159, 94, 120])
    const svgRef = useRef();

    useEffect(() => {
        const margin = { top: 50, right: 30, bottom: 30, left: 60 }
        const w = parseInt(d3.select('#linechart').style('width')) - margin.left - margin.right
        const h = parseInt(d3.select('#linechart').style('height')) - margin.top - margin.bottom
        
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('margin-top', '50')
            .style('overflow', 'visible');

        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w]);
        const yScale = scaleLinear()
            .domain([0, h])
            .range([h, 0])
        const generateScaledLine = d3.line()
            .x((d,i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => i + 1);   
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
        svg.append('g')
            .call(yAxis) 

        svg.selectAll('.line')
            .data([data])
            .join('path')
            .attr('d', d => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'black')
    }, [data])

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];
    return (
        <div className='line-chart animate__animated animate__fadeInDown'>
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
                <div id="linechart">
                <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    )
}

export default LineChart;