import { FC, useEffect, RefObject, createRef } from "react";
import * as d3 from "d3";

import { TopicsDTO } from '../../interfaces/constDTO';

const ref: RefObject<HTMLDivElement> = createRef();

const margin = {top: 40, right: 40, bottom: 40, left: 40},
   width = 500 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

type matrixType = {
    flair: string;
    topic: string;
    count: string;
  }

const createSvgFilter = () => {
    // Create the filter element
    const filter = d3.select(ref.current).select('.matrix-plot-svg').append('defs').append("filter")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 1)
      .attr("height", 1)
      .attr("id", "solid");
  
    // Create the feFlood element
    filter.append("feFlood")
      .attr("flood-color", "orange")
      .attr("result", "bg");
  
    // Create the feMerge element
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "bg");
    feMerge
      .append("feMergeNode")
      .attr("in", "SourceGraphic");
  }

const MatrixPlot: FC<{topics: TopicsDTO, flairs: string[], matrixData: matrixType[], topicAction: (event: any) => void, documentAction: (event: any) => void}> = ({ topics, flairs, matrixData, topicAction, documentAction }) => {
    useEffect(() => {
      const svgDiv = d3.select(ref.current);
      svgDiv.selectAll("*").remove();

      const svgOuterDiv = d3.select(ref.current)
        .append("div")
        .style("width", (width + 200) + "px")
        .style('height', height + "px")
        .style('overflow', 'scroll')
        .attr('class', 'svg-outer-div')
 
      const svgMatrix = svgOuterDiv
              .append("svg")
              .attr("class", "matrix-plot-svg")
              .attr("width", width + margin.left + margin.right + 600)
              .attr("height", height + margin.top + margin.bottom + 200)
              .append("g")
              .attr("class", "matrix-plot-group")
              .attr("transform", `translate(${margin.left + 75}, ${margin.top + 25})`);

      createSvgFilter();

       //X axis
       const x = d3
                .scaleBand()
                .domain(Array.from(new Set(Object.keys(topics))))
                .range([0, width + 500]);
 
      svgMatrix.append("g")
             .call(d3.axisTop(x))
             .call(g => g.selectAll(".domain").remove())
             .call(g => g.selectAll(".tick>line").remove())
             .selectAll("text")
             .attr("transform", "translate(5, 10)rotate(-90)")
             .style("text-anchor", "start")
             .attr("id", d => "id-" + d)
             .attr("class", "topic-labels")
             .style('cursor', 'pointer')
             .on("click", (event) => { topicAction(event)});
            
       // Y axis
       const y = d3
                .scaleBand()
                .range([0, height])
                .domain(flairs)
                .padding(1);

      svgMatrix
          .append("g")
          .call(d3.axisLeft(y))
          .call(g => g.selectAll(".domain").remove())
          .call(g => g.selectAll(".tick>line").remove())
          .selectAll("text")
          .attr("id", d => "id-" + d)
          .attr("class", "document-labels")
          .style('cursor', 'pointer')
          .on("click", (event) => { documentAction(event)});

    const sizeExtent: number[] = d3.extent(matrixData.map((d) => +d.count as number)) as number[];
    const minRadius = 2
    const maxRadius = 12
    
    const sizeScale =  d3.scaleSqrt() // d3.scaleLinear()
      .domain(sizeExtent)
      .range([minRadius, maxRadius]);

    const uniqueTopics = Array.from(new Set(Object.keys(topics)));

    uniqueTopics.forEach((d) =>{
        svgMatrix
          .append("line")
            .attr("x1", x(d) as number + 15)
            .attr("x2", x(d) as number + 15)
            .attr("y1", 25)
            .attr("y2", height - 25)
            .attr("stroke", "gray")
            .attr("stroke-opacity", 0.6)
            .attr("id", "id-" + d + "-line")
            .attr("class", "topic-line");
      })

    flairs.forEach((d) => {
      svgMatrix
      .append("line")
        .attr("x1", 0)
        .attr("x2", width + 500)
        .attr("y1", y(d) as number)
        .attr("y2", y(d) as number)
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.6)
        .attr("id", "id-" + d + "-line")
        .attr("class", "document-line");
    });

    matrixData.forEach((d) => {
      svgMatrix
      .append("circle")
        .attr("cx", x(d.topic) as number + 15)
        .attr("cy", y(d.flair) as number)
        .attr("r", sizeScale(+d.count))
        .attr("class", d.flair + " " + d.topic)
        .attr("fill", colorScale(d.topic))
        .attr("stroke", "black");
    })
    }, [matrixData, topics, flairs]);
 
 
    return <div ref={ref} />
 }

 export default MatrixPlot;