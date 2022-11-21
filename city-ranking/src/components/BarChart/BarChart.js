import { Dropdown } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import 'animate.css';
import './BarChart.css';

const BarChart = () => {
    const menuItems = [
        { key: "healthCare", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    const sample = [
        { category: 'Lisbon', pollution: 40, healthCare: 66 },
        { category: 'Madrid', pollution: 151, healthCare: 69 },
        { category: 'Rome', pollution: 89, healthCare: 86 },
        { category: 'Paris', pollution: 124, healthCare: 75 },
        { category: 'Los Angeles', pollution: 12, healthCare: 40 },
        { category: 'Vaticano', pollution: 33, healthCare: 55 },
        { category: 'Berlin', pollution: 139, healthCare: 99 },
        { category: 'Porto', pollution: 57, healthCare: 77 },
        { category: 'Barcelona', pollution: 80, healthCare: 78 },
        { category: 'Malaga', pollution: 106, healthCare: 60 },
        { category: 'Sao Paulo', pollution: 73, healthCare: 57 },
    ]

    const d3Chart = useRef()
    const chartConfig = useRef();
    // Ref for updating dimention 
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const [loading, setLoading] = useState(true);
    const [dropValue, setDropValue] = useState('Health Care');

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
        LoadChart(sample, dimensions);

    }, [dimensions])

    useEffect(()=>{
        if (loading || !chartConfig.current) return;
        DrawChart(sample);

    }, [loading, dropValue])

    const margin = { top: 50, right: 30, bottom: 30, left: 60 }

    const LoadChart = (data, dimensions) => {
        const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
        const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

        // const svg = d3.select(d3Chart.current)
        //     .attr('width', chartwidth + margin.left + margin.right)
        //     .attr('height', chartheight + margin.top + margin.bottom)

        // // x scale
        // const x = d3.scaleBand()
        //     .domain(d3.range(values.length))
        //     .range([margin.left, chartwidth - margin.right])
        //     .padding(0.1)

        // svg.append('g')
        //     .attr('transform', 'translate(0,' + chartheight + ')')
        //     .call(d3.axisBottom(x).tickFormat(i => values[i].category).tickSizeOuter(0))

        // const max = d3.max(values, function (d) { return d.value })

        // // y scale
        // const y = d3.scaleLinear()
        //     .domain([0, max])
        //     .range([chartheight, margin.top])

        // svg.append('g')
        //     .attr('transform', 'translate(' + margin.left + ',0)')
        //     .call(d3.axisLeft(y))

        const svg = d3
            .select(d3Chart.current)
            .attr("width", chartwidth + margin.left + margin.right)
            .attr("height", chartheight + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
      
        // Initialize the X axis
        const x = d3.scaleBand()
            .range([0, chartwidth - margin.right])
            .padding(0.1)
        const xAxis = svg.append("g").attr("transform", `translate(0,${chartheight})`);

        // Initialize the Y axis
        const y = d3.scaleLinear().range([chartheight, margin.top]);
        const yAxis = svg.append("g");

        chartConfig.current = { svg, x, xAxis, y, yAxis};
        setLoading(false);  
    }

    const DrawChart = (data) => {

        let values = [];

        switch(dropValue) {
            case "Health Care":
                for (let i in data){
                    values.push({category: sample[i].category, value: sample[i].healthCare})
                }
                break;
            case "Pollution":
                for (let i in data){
                    values.push({category: sample[i].category, value: sample[i].pollution})
                }
                break;
            default:
                for (let i in data){
                    values.push({category: sample[i].category, value: sample[i].healthCare})
                }
        }

        // console.log(dimensions.width, dimensions.height)

        const { svg, x, xAxis, y, yAxis} = chartConfig.current;

        // Update the X axis
        x.domain(d3.range(values.length));
        xAxis.call(d3.axisBottom(x).tickFormat(i => values[i].category).tickSizeOuter(0));

        const max = d3.max(values, function (d) { return d.value })

        // Update the Y axis
        y.domain([0, max]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // var u = svg.selectAll("rect").data(values);

        // // Draw bars
        // u.join('rect')
        //     .transition()
        //     .duration(1000)
        //     .attr("class", "bar")
        //     .attr("text-anchor", "middle")
        //     .attr('x', (d, i) => x(i))
        //     .attr('y', d => y(d.value))
        //     .attr('height', d => y(0) - y(d.value))
        //     .attr('width', x.bandwidth())
        //     .attr('fill', '#65f0eb');

        // u.exit().remove();

        var bar = svg.selectAll("rect").data(values);

        bar.join('rect')
            .transition()
            .duration(1000)
            .attr("class", "bar")
            .attr("text-anchor", "middle")
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .attr('fill', '#65f0eb');

        bar.exit().remove();

        var label = svg.selectAll("text.label").data(values);
        
        label.enter().append("text").attr("class", "label");

        label
            .transition()
            .duration(1000)
            .text(d => d.value)
            .attr('x', (d, i) => x(i) + x.bandwidth()/2 -10)
            .attr('y', d => y(d.value) - 10)
            .attr("font-family", "sans-serif")
            .attr("font-size", "18px")
            .attr("fill", "#000");
            

        // var j = svg.selectAll('text.bar-label').data(values).enter().append('text');

        // j.join('text.bar-label')
        //     .transition()
        //     .duration(1000)
        //     .attr("class", "yAxis-label")
        //     .attr("text-anchor", "middle")
        //     .attr('x', (d, i) => x(i) + x.bandwidth()/2)
        //     .attr('y', d => y(d.value) - 10)
        //     .attr('height', d => y(0) - y(d.value))
        //     .attr('width', x.bandwidth())
        //     .text(d => d.value);
        
        // j.selectAll('text.bar-label').remove();
    }

    return (
        <div className='bar-chart animate__animated animate__fadeInDown'>
            <div className='bar-chart-header'>
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
            <div className="bar-chart-item">
                <div id='d3demo' >
                    <svg ref={d3Chart}></svg>
                </div>
            </div>
        </div>
    )
}

export default BarChart;