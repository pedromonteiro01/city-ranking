import { Dropdown } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import 'animate.css';
import './BarChart.css';
import { svg, transition } from "d3";

const BarChart = (props) => {

    const id = 'BarChart';

    const menuItems = [
        { key: "healthCare", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
        { key: "purchasePower", name: "Purchase Power" },
        { key: "qualityLife", name: "Quality of Life" },
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
    const wrapperRef = useRef()
    const chartConfig = useRef();
    // Ref for updating dimention 
    // const dimensions = useResizeObserver(wrapperRef)

    const [data, setData] = useState(props.data);
    const [loading, setLoading] = useState(true);
    const [dropValue, setDropValue] = useState('Health Care');
    const [k, setk] = useState(0);

    const zoomThreshold = 1;
    let lastTransform = d3.zoomIdentity.scale(0.5);

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
        LoadChart();

    }, [])

    useEffect(()=>{
        if (loading || !chartConfig.current) return;
        DrawChart(data);

    }, [loading, dropValue])

    const margin = { top: 50, right: 30, bottom: 30, left: 60 }

    const LoadChart = () => {

        const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
        const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

        console.log(chartheight, chartwidth);

        // const { width, height } =
        //     dimensions || wrapperRef.current.getBoundingClientRect();

        // console.log(width, height);

        // const chartwidth = width;
        // const chartheight = height;

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

        const svg = d3.select(d3Chart.current)
        .attr('width', chartheight + margin.top + margin.bottom)
        .attr('height', chartwidth + margin.left + margin.right);

        const svgContent = svg.select(".content");

        // .attr("viewBox", [0, 0, chartwidth + margin.left + margin.right, chartheight + margin.top + margin.bottom])
        // const svg = d3.select(d3Chart.current)
        // .attr("width", chartwidth + margin.left + margin.right)
        // .attr("height", chartheight + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform", `translate(${margin.left},${margin.top})`);
      
        // Initialize the X axis
        const x = d3.scaleBand()
        .range([0, chartwidth])
        .padding(0.3);
        //const xAxis = svg.select("myXaxis")
        //.attr("transform", `translate(0,${chartheight})`);

        // Initialize the Y axis
        const y = d3.scaleLinear()
        .range([chartheight, 0]);
        //const yAxis = svg.select("myYaxis");

        chartConfig.current = { svg, svgContent, x, y, chartheight, chartwidth};
        setLoading(false);  
    }

    const DrawChart = (data) => {

        let values = [];

        switch(dropValue) {
            case "Health Care":
                for (let i in data){
                    values.push({city: data[i].city, value: data[i].healthCare})
                }
                break;
            case "Pollution":
                for (let i in data){
                    values.push({city: data[i].city, value: data[i].pollution})
                }
                break;
            case "Criminal Rate":
                for (let i in data){
                    values.push({city: data[i].city, value: data[i].crimeRating})
                }
                break;
            case "Quality of Life":
                for (let i in data){
                    values.push({city: data[i].city, value: data[i].qualityLife})
                }
                break;
            case "Purchase Power":
                for (let i in data){
                    values.push({city: data[i].city, value: data[i].purchasePower})
                }
                break;
        }

        // console.log(dimensions.width, dimensions.height)

        const { svg, svgContent, x, y, chartheight, chartwidth} = chartConfig.current;

        svg.select(".myXaxis").remove();
        svg.selectAll(".xLabel").remove();
        svg.selectAll(".xLabelScroll").remove();

        // x
        x.domain(values.map(d => d.city));

        // y
        y.domain([0, d3.max(values, d => +d["value"])]);

        // create tooltip element  
        const tooltip = d3.select(".bar-chart-item")
        .append("div")
        .attr("class","d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "15px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "5px")
        .style("color", "#fff")
        .text("a simple tooltip");

        svgContent.attr("class", "bars")
        .selectAll("rect")
        .data(values)
        .join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d.city))
            .attr("y", d => y(d["value"]))
            .attr("width", x.bandwidth())
            .attr("height", d => chartheight - y(d["value"]))
            .attr("fill", "steelblue")

            // .on("mousemove", function(event){
            //     tooltip
            //       .style("top", (event.pageY-10)+"px")
            //       .style("left",(event.pageX+10)+"px");
            //   })
            // .on("mouseout", function() {
            //     tooltip.html(``).style("visibility", "hidden");
            //     d3.select(this).attr("fill", "steelblue");
            // });
        
        // append text  
        // svgContent.selectAll("g")
        // .data(values)
        // .enter()
        // .append("text")
        // .attr("dominant-baseline", "text-before-edge")
        // .attr("text-anchor", "middle")
        // .attr("fill", "#000000")
        // .attr("x", (d, i) => left_offset + bar_width * i + bar_width/2 - spacing/2)
        // .attr("y", svg_height - bottom_offset + 5)
        // .attr("style", "font-family:Verdana")
        // .text((d, i) => labels[i]);

        // axes
        const xAxis = d3.axisBottom(x);
        svg.append("svg")
            .attr("height", chartheight + margin.top + margin.bottom)
            .attr("width", chartwidth + margin.right + margin.left)
            .append("g")
            .attr("class","myXaxis")
            .attr("transform", `translate(0, ${chartheight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");

        if (k>3.5){
            svg.select(".myXaxis").selectAll("text").style("opacity", "1");
        }
        else
            svg.select(".myXaxis").selectAll("text").style("opacity", "0");

        const yAxis = d3.axisLeft(y);
        svg.select(".myYaxis").transition().duration(1000).call(yAxis);

        svg.append("text")
        .attr("class", "xLabel")
        .attr("text-anchor", "end")
        .style("font-size", "13px")
        .attr("x", chartwidth/2)
        .attr("y", chartheight + 100)
        .style("font-size", "18px")
        .text("Cities");

        svg.append("text")
        .attr("class", "xLabelScroll")
        .attr("text-anchor", "end")
        .style("font-size", "13px")
        .attr("x", chartwidth/2 + 35)
        .attr("y", chartheight + 130)
        .style("font-size", "15px")
        .style("opacity", "0.7")
        .text("Scroll to zoom...");

        // xAxis.transition().duration(1000).call(d3.axisBottom(x).tickSizeOuter(0))
        // .selectAll("text")  
        // .style("text-anchor", "end")
        // .attr("dx", "-.8em")
        // .attr("dy", ".15em")
        // .attr("transform", "rotate(-65)");

        // yAxis.transition().duration(1000).call(d3.axisLeft(y));

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

        const extent = [[0, 0], [chartwidth, chartheight]];

        var zoom = d3.zoom()
        .scaleExtent([1, 10])
        .extent(extent)
        .translateExtent(extent)
        .on('zoom', (event) => {
            var t = event.transform;
            setk(t.k);
            x.range([0, chartwidth].map(d => event.transform.applyX(d)));
            svg.selectAll(".bars rect").attr("x", d => x(d.city)).attr("width", x.bandwidth());
            svg.select(".myXaxis").call(xAxis);
            if (t.k > 3.5){
                svg.select(".myXaxis").transition().duration(100).selectAll("text").style("opacity", "1");
                svg.select(".xLabelScroll").transition().duration(100).style("opacity", "0");
                svg.selectAll("rect")
                .on("mouseover", function(d, i) {
                        tooltip.html(`Value: ${d.target.__data__.value}`).style("visibility", "visible");
                        d3.select(this)
                        .attr("fill", "#B2D6FF");
                })
                .on("mousemove", function(event){
                        tooltip
                        .style("top", (event.pageY)+"px")
                        .style("left",(event.pageX-300)+"px");
                })
                .on("mouseout", function() {
                        tooltip.html(``).style("visibility", "hidden");
                        d3.select(this).attr("fill", "steelblue");
                });
            }
            else{
                svg.select(".myXaxis").transition().duration(100).selectAll("text").style("opacity", "0");
                svg.select(".xLabelScroll").transition().duration(100).style("opacity", "0.7");
                svg.selectAll("rect").attr("fill", "steelblue")
                .on("mouseover", function(d, i) {
                    // do nothing
                })
                .on("mousemove", function(event){
                   // do nothing
                })
                .on("mouseout", function() {
                    // do nothing
                });
                tooltip.html(``).style("visibility", "hidden");
            }
        });

        svg.call(zoom);


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
                <div id="d3demo">
                    <svg ref={d3Chart} className="svg">
                        <defs>
                            <clipPath id={id}>
                                <rect x="0" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <g className="content" clipPath={`url(#${id})`}></g>
                        <g className="myYaxis"></g>
                        <text className="xLabel"></text>
                        <text className="xLabelScroll"></text>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default BarChart;