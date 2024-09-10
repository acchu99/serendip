import React, { FC, useEffect, useRef,useMemo, useState, RefObject } from 'react';
import { RankViewComponentWrapper } from './rankView-component.styled';
import * as d3 from  'd3';

import RankViewData, { dummyRankViewData } from "../../interfaces/rankViewDTO";

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';

var margin = {top: 20, right: 30, bottom: 40, left: 90};
  

interface RankViewComponentProps {
   data: RankViewData[];
   updateData: () => void;
};

interface TopicBarchartProps {
  words_dict: { [key: string]: number };
}



const RankViewComponent: FC<RankViewComponentProps> = ({ data, updateData }) => {

  const TopicWordchart: FC<{wordName: string, rankViewData: RankViewData[]}> = ({ wordName, rankViewData }) => {

  
    var width = 770 - margin.left - margin.right,
       height = 600 - margin.top - margin.bottom;
 
    let topic_dict: {[key: string]: number} = {};
    let topicsData: { [key: string]: { [key: string]: number } } = {};
    let topic_word: {[key: string]: number} = {};
 
    for (let i = 0; i < rankViewData.length; i++) {
       let topic = rankViewData[i].topic;
       let word = rankViewData[i].word;
       let c = parseInt(rankViewData[i].count);
       
       if (!topicsData[topic]) {
           topicsData[topic] = {};
       }
       
       topicsData[topic][word] = c;
   }
 
   
   for (let i = 0; i < rankViewData.length; i++) {
     let topic = rankViewData[i].topic;
     let word = rankViewData[i].word;
     let c = parseInt(rankViewData[i].count);
     
     if (!topic_word[topic]) {
         topic_word[topic] = 0;
        
     }
     if (word=== wordName){
       topic_word[topic] = c
     }
     
   }  
   //console.log(topic_word);
   //console.log(topicsData);
   for (let topic in topicsData) {
    let topicData = topicsData[topic];
    //console.log(topicData);
    if (wordName in topicData){
    let topicArray: [string, number][] = Object.entries(topicData);
    topicArray.sort((a, b) => b[1] - a[1]); 
    let rankFrequencySum =  0;
    //console.log(topicArray);
    for (let [word, frequency] of topicArray) {
        if (frequency > topicData[wordName]) { 
            rankFrequencySum += frequency;
            //console.log(rankFrequencySum);
        } else {
            break;
        }
    }
    topic_dict[topic] = rankFrequencySum;
  }
  }
 
 //console.log(topic_dict);
 
    let topic_length :{[key: string]: number} = {};
    rankViewData.forEach(element => {
       let t = element.topic;
       let ct = parseInt(element.count);
       if (t in topic_length){
          topic_length[t] += ct;
       }
       else{
          topic_length[t] = ct;
 
       }
    });
   //  console.log(topic_dict);
   //  console.log(topic_length);
 
 type StackGroup = { [key: string]: any };
   const axesRef = useRef(null);
 //   console.log("td");
 //   console.log(topic_dict);
   
   const stack_groups: StackGroup[] = Object.keys(topic_length).map(topic => ({
    topic: topic,
    wordC: topic_word[topic],
    baseC: (topic_dict[topic] || 0),
    totalwC:topic_length[topic] - topic_word[topic] - (topic_dict[topic] || 0)
 })).sort((a, b) => b.wordC - a.wordC);
 console.log(stack_groups);
 
 const xLabels: string[] = [];
 
 stack_groups.forEach((d) => {
    xLabels.push(d.topic);
 })
 
  //console.log(stack_groups);
   const stacks = d3.stack().keys(["baseC", "wordC","totalwC"]).order(d3.stackOrderNone);
   //console.log(stacks)
   const series = stacks(stack_groups)
   //console.log(series);
 
  // Y axis
  const max = Math.max(...Object.values(topic_length)); 
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([width-margin.right - 200 , 10]);
  }, [stack_groups, height]);
 
  // X axis
  const xScale = useMemo(() => {
    return d3
      .scaleBand<string>()
      .domain(xLabels)
      .range([-80,width-margin.right - margin.left - 15])
      .padding(0.15);
  }, [stack_groups, width]);
 
  // Color Scale
  var colorScale = d3
    .scaleOrdinal<string>()
    .domain([])
    .range(["#9d174d","#002D62", "#9d174d"]);
 
  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(40," + (height - margin.top - margin.bottom - 60)+ ")")
      .call(xAxisGenerator)
      .selectAll("text")
       .attr("transform", "translate(-15,25)rotate(-90)")
 
    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator)
    .attr("transform", "translate(-40, 0)")
  }, [xScale, yScale, (height - margin.top - margin.bottom)]);
 
  const rectangles = series.map((subgroup, i) => {
    return (
      <g key={i}>
        {subgroup.map((group, j) => {
         //console.log(group)
          return (
            <rect
              key={j}
              x={xScale(String(group.data.topic)) as number + 40}
              y={yScale(group[1])}
              height={yScale(group[0]) - yScale(group[1])}
              width={xScale.bandwidth()}
              fill={colorScale(subgroup.key)}
              opacity={0.9}
              
              fillOpacity = {0.5}
              onClick = {(event) => {
               let words_dict: { [key: string]: number } = {};
               const topicData = rankViewData.filter(item => item.topic === (String(group.data.topic)))
               topicData.sort((a,b) => parseInt(b.count) - parseInt(a.count))
               const len = Math.min(12, topicData.length);
 
             for(let i = 0; i < len ; i++){
                   let w = topicData[i].word
                   words_dict[w] = parseInt(topicData[i].count)
               }
               settopicChartData(words_dict)
               settopic(String(group.data.topic))
 
 
              }}
            
            ></rect>
          );
        })}
      </g>
    );
  });
 
  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={width}
          height={height}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        >
          {rectangles}
        </g>
        <g
          width={width}
          height={height}
          ref={axesRef}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        />
      </svg>
    </div>
  );
 }
 const TopicBarchart: FC<TopicBarchartProps> = ({ words_dict }) => {
   
   
 
    var width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
 
    const ref: RefObject<HTMLDivElement> = React.createRef();
 
    useEffect(() => {
       //d3.select(ref.current).selectAll("svg").remove();
       const svg = d3.select(ref.current);
 
     // Remove existing child elements (bars and axis)
     svg.selectAll("*").remove();
 
       const Ssvg = d3.select(ref.current)
                   .append("svg")
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);
       
       //X axis
       const x = d3
                .scaleLinear()
                .domain([0,Math.max(...Object.values(words_dict))])
                .range([0,width]);
 
        Ssvg.append("g")
             .attr("transform", "translate(0," + height + ")")
             .attr("opacity",0)
             .call(d3.axisBottom(x))
             .selectAll("text")
             .attr("transform", "translate(-10,0)rotate(-45)") 
             .style("text-anchor", "end");
            
       // Y axis
       const y = d3
                .scaleBand()
                .range([0, height])
                .domain(Object.keys(words_dict))
                .padding(0.2);
 
      // console.log(Object.entries(words_dict));
       Ssvg
          .append("g")
          .attr("opacity",0)
          .call(d3.axisLeft(y))
          
      const bar = Ssvg.selectAll(".bars")
          .data(Object.entries(words_dict))
          .enter();
 
         bar.append("rect")
          .attr("class", "bars")
          .attr("x", (d) => {
             //console.log(d);
             return -35;
          })
          .attr("y", (d) => y(d[0]) as number)
          .attr("width", (d) => x(d[1]))
          .attr("height", y.bandwidth())
          .attr("opacity",0.7)
          .attr("stroke","#9d174d")
          .attr("fill", "#9d174d")
          .attr("fill-opacity", 0.3)
          .attr("strokeWidth", 1);
       bar.append("text")
          .attr("fill", "black")
          .attr("x",d => x(d[1])-33)
          .attr("y", (d) => y(d[0]) as number + y.bandwidth() * (0.5))
          .attr("dy", "0.35em")
          .text(d => d[0]);
    
      
    }, [words_dict, topic]);
 
 
    return <div ref={ref} />
 }

  const [currWord, setCurrWord] = useState <string>("")
  const [topicChartData, settopicChartData] = React.useState<{ [key: string]: number }>({}) 
  const [topic, settopic] = React.useState<string>('')
  
  const handleSearchQueryChange = (event: any): void => {
   setCurrWord(event.target.value);
  }

   return (
      <RankViewComponentWrapper>
        <Box sx={{ m: 1, height: 100 }}>
           <Grid container spacing={3} direction={"column"}>
              <Grid item>
                 <Stack spacing={2} sx={{ width: '60%' }} direction={'row'}>
                 <TextField
                sx={{ width: 600 }}
                id="outlined-basic"
                label="Search Word"
                variant="outlined"
                autoComplete='off'
                value={currWord}
                onChange={handleSearchQueryChange}
              />
                 
                    
                 </Stack>
              </Grid>
              <Grid item>
                 <Grid container sx={{ height: 700 }} spacing={2}>
                    <Grid item xs={7}>
                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Rank View 
                  </Paper>
                       <Paper sx={{ height: '100%', border: 1, borderRadius: 0 }} >
                       {<TopicWordchart wordName={currWord} rankViewData={data} />}
                       </Paper>
                    </Grid>
                    <Grid item xs={5}>
                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Words frequency in {topic} topic
                  </Paper>
                       <Paper sx={{ height: '100%', border: 1, borderRadius: 0 }} >
                       <TopicBarchart words_dict={topicChartData as {[key: string]: number}} />
                          
                       </Paper>
                    </Grid>
                 </Grid>
              </Grid>
           </Grid>
        </Box>
      </RankViewComponentWrapper>
     );
}

export default RankViewComponent;
