import React, { useRef, useEffect, useState } from "react";
import './LineChart.css';
import * as d3 from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

const ZoomableLineChart = (props) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const configRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [data, setData] = useState(props.data);
    const [city, setCity] = useState("");

    const [cities, setCities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [results, setResults] = useState();
    const [isDisabled, setIsDisabled] = useState(true);

    const menuItems = [
        { key: "health", name: "Health Care" },
        { key: "criminal", name: "Criminal Rate" },
        { key: "pollution", name: "Pollution" },
    ];

    var items = ["Cappuccino", "Cinema", "Wine", "Gasoline"]

    console.log(data);

    // will be called initially and on every data change
    useEffect(() => {
        LoadChart();
    }, [dimensions]);

    useEffect(() => {
        if (loading || !configRef.current) return;
        SetupChart(data, cities);
    }, [loading, cities])

    const LoadChart = () => {
        const svg = d3.select(svgRef.current);
        const svgContent = svg.append("g").attr("class", "content");
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();
        //console.log("height: ", height)

        // scales + line generator
        var xScale = d3.scalePoint()
            .range([0, width])
            .domain(items);

        const yScale = d3.scaleLinear()
            .range([height - 10, 10]);

        configRef.current = { svg, svgContent, xScale, yScale, height, width };
        setLoading(false);
    }

    const SetupChart = (data, cities) => {
        const { svg, svgContent, xScale, yScale, height, width } = configRef.current;

        cities.forEach((city) => {
            svg.selectAll("." + city).remove();
            svg.selectAll("." + city + "legend").remove();
            svg.selectAll(".pluslegend").remove();
        })

        var values = [];
        var keys = [];
        var len = [];
        var j = 0;
        cities.forEach((city) => {
            data.forEach((el) => {
                if (el.city === city) {
                    keys.push({ city: el.city, values: el.values })
                    len.push(j);
                    for (let i in el.values){
                        values.push(parseInt(el.values[i].value));
                    }
                    j++;
                }
            })
        })

        console.log(values);
        console.log(d3.max(values));

        yScale.domain([0, d3.max(values) + 1]);

        const lineGenerator = d3.line()
            .x(function (d) { return xScale(d.key) })
            .y(function (d) { return yScale(d.value) })
        //.curve(curveCardinal);

        // A color scale: one color for each group

        keys.forEach((k) => {
            console.log(k.city, d3.schemeSet2[0])
        })

        // render the line
        svgContent
            .selectAll(".myLine")
            .data(len)
            .join("path")
            .transition()
            .duration(400)
            .attr("class", "myLine")
            .attr("stroke", d => d3.schemeSet2[d])
            .attr("stroke-width", 4)
            .attr("fill", "none")
            .attr("class", d => keys[d].city)
            .attr("d", d => lineGenerator(keys[d].values));

        svg
            // First we need to enter in a group
            .selectAll("myDots")
            .data(len)
            .join('g')
            .style("fill", d => d3.schemeSet2[d])
            .attr("class", d => keys[d].city)
            // Second we need to enter in the 'values' part of this group
            .selectAll("myPoints")
            .data(d => keys[d].values)
            .join("circle")
            .attr("cx", d => xScale(d.key))
            .attr("cy", d => yScale(d.value))
            .attr("r", 5)
            .attr("stroke", "white")

        keys.push({ city: "plus", values: null })
        len.push(len.length);

        svg.selectAll("myLegend")
            .data(len)
            .join('g')
              .append("text")
                .attr('x', (d,i) => {console.log(keys[d].city.length); if (i>0 && keys[i-1].city.length > 10) return 30 + i*60 + 50; else return 30 + i*60;})
                .attr('y', 0)
                .attr("class", d => keys[d].city + "legend")
                .text(d => keys[d].city == "plus" ? "+" : keys[d].city)
                .style("fill", d => keys[d].city == "plus" ? "#000" : d3.schemeSet2[d])
                .style("font-size", "15px")
                .style("cursor", "pointer")
              .on("click", function(event,d){
                    // is the element currently visible ?
                    if (keys[d].city=="plus"){
                        changeModal();
                        //setCities(cities.concat("Paris"));
                    }
                    else {
                        let currentOpacity = d3.selectAll("." + keys[d].city).style("opacity")
                        // Change the opacity: from 0 to 1 or from 1 to 0
                        d3.selectAll("." + keys[d].city).transition().style("opacity", currentOpacity == 1 ? 0:1)
                    }
                })

        // axes
        const xAxis = d3.axisBottom(xScale);
        svg.select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .style("font-size", "13px")
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);
        svg.select(".y-axis").transition().duration(1000).call(yAxis);

        //d3.selectAll("g").remove();
    }

    const changeModal = () => {
        setIsDisabled(!isDisabled);
    }

    const handleCitySearch = (event) => {
        var str = event.target.value;
        setCity(str);
        str = str.toLowerCase();
        var result = [];
        data.forEach((d) => {
            var lcCity = d.city.toLowerCase();
            if (lcCity.includes(str)) {
                setShowAutocomplete(true);
                result.push(<li key={lcCity} onClick={() => { setShowAutocomplete(false); changeModal(); setCity(""); setCities(cities.concat(d.city)); }}>{lcCity}</li>)
            }
            setResults(result);
        })

    }

    return (
        <>
            <div className="line-chart animate__animated animate__fadeInDown">
                <div className='line-chart-header'>
                    <h3>Products Price by City</h3>
                </div>
                <div className="input-line-wrapper">
                    <input className="line-input" type="search" onChange={handleCitySearch} value={city} placeholder="Insert City..." disabled={isDisabled} />
                    <ul className='autocomplete-list'>
                        {
                            showAutocomplete && results
                        }
                    </ul>
                </div>
                <div className="line-chart-item">
                    <div ref={wrapperRef} style={{ height: '28rem' }}>
                        <svg ref={svgRef} className="svg">
                            <g className="x-axis"></g>
                            <g className="y-axis"></g>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ZoomableLineChart;
