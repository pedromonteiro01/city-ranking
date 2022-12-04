import './SearchCity.css';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Audio } from 'react-loader-spinner'

const SearchCity = (props) => {
    const [data, setData] = useState(props.data);
    const [city, SetCity] = useState("");
    const [showGraph, setShowGraph] = useState(false)
    const [crime, setCrime] = useState(0);
    const [health, setHealth] = useState(null);
    const [pollution, setPollution] = useState(0);
    const [purchase, setPurchase] = useState(0);
    const [quality, setQuality] = useState(0);
    const [rating, setRating] = useState(0);
    const [results, setResults] = useState(null);
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const variables = [
        {
            "item": "Crime",
            "value": crime,
        },
        {
            "item": "Health",
            "value": health,
        },
        {
            "item": "Pollution",
            "value": pollution,
        },
        {
            "item": "Purchase Power",
            "value": purchase,
        },
        {
            "item": "Quality of Life",
            "value": quality,
        },
        {
            "item": "Rating",
            "value": rating,
        }
    ]

    useEffect(() => {
        let crime2, health2, pollution2, purchase2, quality2, rating2 = 0;
        let valid2 = false;
        let arr = [];
        data.map((el) => {
            const string = el.city.toLowerCase();
            const substring = city.toLowerCase();
            if (el.city.toLowerCase() === city.toLowerCase() && city != "") {
                crime2 = parseInt(el.crimeRating);
                health2 = parseInt(el.healthCare);
                pollution2 = parseInt(el.pollution);
                purchase2 = parseInt(el.purchasePower);
                quality2 = parseInt(el.qualityLife);
                rating2 = parseInt(el.rating);
                valid2 = true;
                setCrime(el.crimeRating);
                setHealth(el.healthCare);
                setPollution(el.pollution);
                setPurchase(el.purchasePower);
                setQuality(el.qualityLife);
                setRating(el.rating);
                setShowGraph(valid2);
            } else {
                setShowGraph(valid2);
            }
            if (string.includes(substring) && city.length > 0 && city !== null) {
                if (el.city.toLowerCase() === city.toLowerCase() && city != "") {
                    setShowAutocomplete(false);
                } else {
                    setShowAutocomplete(true);
                    arr.push(<li onClick={() => {
                        setShowAutocomplete(false);
                        SetCity(string);
                    }}>{string}</li>)
                    setResults(arr)
                }
            }
        })
    }, [city])

    const handleCitySearch = (event) => {
        var str = event.target.value;
        SetCity(str);
    }

    const margin = { top: 10, right: 30, bottom: 40, left: 100 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const drawGraph = () => {
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // Parse the Data

        // Add X axis
        const x = d3.scaleLinear()
            .domain([0, 120])
            .range([0, width + margin.right]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(15))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleBand()
            .range([0, height])
            .domain(variables.map(function (d) {
                return d.item;
            })
            )
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y))


        // Lines
        svg.selectAll("myline")
            .data(variables)
            .enter()
            .append("line")
            .attr("x1", function (d) { return x(d.value); })
            .attr("x2", x(0))
            .attr("y1", function (d) { return y(d.item); })
            .attr("y2", function (d) { return y(d.item); })
            .attr("stroke", "grey")

        // Circles
        svg.selectAll("mycircle")
            .data(variables)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.value); })
            .attr("cy", function (d) { return y(d.item); })
            .attr("r", "5")
            .style("fill", "#69b3a2")
            .attr("stroke", "none")
    }


    useEffect(() => {
        if (showGraph) {
            // write your code here
            drawGraph();
        }
    }, [showGraph])

    return (
        <div className='search-city animate__animated animate__fadeInDown'>
            <input autoComplete="off" className='search-input' onChange={handleCitySearch} value={city} type="search" name="search" placeholder='Search city...' />
            <ul className='autocomplete-list'>
                {
                    showAutocomplete && results
                }
            </ul>
            {
                showGraph ?
                    <div className='search-graph-wrapper animate__animated animate__fadeInUp'>
                        <div id='my_dataviz'></div>
                    </div>

                    :
                    <div className='loading-chart'>
                        <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="gray"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                    </div>
            }
        </div>
    )
}

export default SearchCity;