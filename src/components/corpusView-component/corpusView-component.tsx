import React, { FC, useEffect, RefObject, useState } from 'react';
import { CorpusViewComponentWrapper } from './corpusView-component.styled';
import CSS from 'csstype';

import { Box, FormControl, Grid, Divider, Paper, MenuItem, Select, Stack, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { TopicsDTO } from '../../interfaces/constDTO';

import { Flairs } from '../../constants/flairs';
import { Topics } from '../../constants/topics';

import DataParserService from "../../services/data-parser.service";

import BarChartComponent from "./BarChart";
import MatrixPlot from "./MatrixPlot";

import * as d3 from  'd3';

interface CorpusViewComponentProps {
  data: RankViewData[];
  matrixData: matrixType[];
  globalFlair: string;
  globalTopic: string;
  updateData: () => void;
  setFlair: (flair: string) => void;
  setTopic: (topic: string) => void;
}

type matrixType = {
  flair: string;
  topic: string;
  count: string;
}

type topicMetadataType = {
  avg: string;
  small: string;
  big: string;
}

type BarChartType = {
  x: number;
  y: string;
};

type RankViewData = {
  topic: string;
  word: string;
  count: string;
}

const selectedValues: any = {
  border: "solid",
  "background-color": 'orange',
  "font-style": 'bold'
}

var sortingType : string = "", sortingType2: string = "";

const margin = {top: 40, right: 40, bottom: 40, left: 40},
   width = 500 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const ref: RefObject<HTMLDivElement> = React.createRef();

const CorpusViewComponent: FC<CorpusViewComponentProps> = ({ matrixData, data, updateData, globalFlair, globalTopic, setFlair, setTopic }) => {
  console.log(globalFlair, globalTopic);

  const [documentTabSelected, setDocumentTabSelected] = React.useState('documents-tab');
  const [topicStatsSelected, setTopicStatsSelected] = React.useState('distribution-tab');
  const [documentContent, setDocumentContent] = React.useState("Document");
  const [flairsOrder, setFlairsOrder] = React.useState(Flairs);
  const [topicsOrder, setTopicsOrder] = React.useState(Topics);

  const [sDocument, setSDocument] = React.useState("Selected Document");
  const [sTopic, setSTopic] = React.useState("Selected Topic");

  const [topicAvg, setTopicAvg] = React.useState("No topic selected");
  const [topicBig, setTopicBig] = React.useState("No topic selected");
  const [topicSmall, setTopicSmall] = React.useState("No topic selected");

  const [barChartData, setBarChartData] = React.useState<matrixType[]>([]);

  const [documentBarChartData, setDocumentBarChartData] = React.useState<BarChartType[]>([]);
  const [topicBarChartData, setTopicBarChartData] = React.useState<BarChartType[]>([]);

  const [topicWordData, setTopicWorcData] = React.useState<RankViewData[]>([]);

  useEffect(() => {
    setBarChartData(matrixData);
    console.log(matrixData);

  }, [matrixData]);

  const generateDynamicClass = (className: string, styles: CSS.Properties) => {
    const cssText = Object.entries(styles)
      .map(([property, value]) => `${property}: ${value};`)
      .join('\n');
  
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${className} { ${cssText} }`;
    document.head.appendChild(styleElement);
  };
  
  generateDynamicClass('selectedValues', selectedValues);

  const resetCurrentTopic = () => {
    console.log("1");
    d3.selectAll(".topic-line").attr('stroke', "gray").attr('stroke-width', "1px").attr('stroke-opacity', "0.6");
    d3.selectAll(".topic-labels").attr('filter', null);
  }

  const resetCurrentDocument = () => {
    d3.selectAll(".document-line").attr('stroke', "gray").attr('stroke-width', "1px").attr('stroke-opacity', "0.6");
    d3.selectAll(".document-labels").attr('filter', null);
  }
  
  const selectedTopic = (event: any) => {
    resetCurrentTopic();
    const topic: string = event.target.textContent as string;
    const labelElement = d3.select('#id-' + topic);
    const labelElementLine = d3.select('#id-' + topic + '-line');
    console.log(labelElementLine);

    setSTopic(topic);

    const topicMetaData: topicMetadataType = getTopicMetaData(topic) as topicMetadataType;
    console.log(topicMetaData);

    setTopicAvg(topicMetaData.avg);
    setTopicSmall(topicMetaData.small);
    setTopicBig(topicMetaData.big);

    const convertToBCTopicData = () => {
      const BCTopicData: BarChartType[] = [];
      console.log(data.filter((d) => d.topic === topic));
      data.filter((d) => d.topic === topic).forEach((d) => {
        BCTopicData.push({x: +d.count, y: d.word});
      });
      console.log(BCTopicData);

      return BCTopicData;
    };

    const BCTopicData: BarChartType[] = convertToBCTopicData();
    // console.log(BCTopicData);
    setTopicBarChartData(BCTopicData);
  
    labelElement.attr('filter', null);
    labelElement.attr('filter', 'url(#solid)');
  
    labelElement.classed('selectedValues', true);

    labelElementLine.attr('stroke', "orange");
    labelElementLine.attr('stroke-width', "2px");
    labelElementLine.attr('stroke-opacity', "1");
    console.log("2");

    setTopic(topic);
  }

  const getTopicMetaData = (topic: string) => {
    const topicCounts = matrixData.filter((d) => d.topic === topic);

    const countArray: number[] = [];

    topicCounts.forEach((d) => {
      countArray.push(+d.count);
    });

    return {avg: d3.mean(countArray)?.toString(), small: d3.min(countArray)?.toString(), big: d3.max(countArray)?.toString()};
  }
  
  const selectedDocument = (event: any) => {
    resetCurrentDocument();
    const flair: string = event.target.textContent as string;
    const labelElement = d3.select('#id-' + flair);
    const labelElementLine = d3.select('#id-' + flair + '-line');

    setSDocument(flair);
    setDocumentData(flair);

    const convertToBCDocumentData = () => {
      const BCDocumentData: BarChartType[] = [];
      matrixData.filter((d) => d.flair === flair).forEach((d) => {
        BCDocumentData.push({x: +d.count, y: d.topic});
      });

      return BCDocumentData;
    };

    const BCDocumentData: BarChartType[] = convertToBCDocumentData();
    setDocumentBarChartData(BCDocumentData);

    setFlair(flair);
    labelElement.attr('filter', null);
    labelElement.attr('filter', 'url(#solid)');
  
    labelElement.classed('selectedValues', true);

    labelElementLine.attr('stroke', "orange");
    labelElementLine.attr('stroke-width', "2px");
    labelElementLine.attr('stroke-opacity', "1");
  }

  const setDocumentData = (flair: string) => {
    let content: Promise<string> = DataParserService.getFlairTextData(flair);
    console.log("Got Document")
    content.then((data: string) => {
      const truncatedData: string = data.slice(0, 3500) + "...";
      setDocumentContent(truncatedData);
    });
  }

  useEffect(() => {
  }, [matrixData])

  const handleDatasetChange = () => {

  }
  
  const handleSortingChange = (event: any) => {
    sortingType = event.target.value;
    var multiplier:number = 1;
    if(sortingType == "desc") multiplier = -1
    var sortorder = barChartData.filter((a)=> a.topic == sTopic).sort((a,b)=> {
      if((+a.count) < (+b.count)) return multiplier*-1;
      else if((+a.count) == (+b.count)) return 0;
      else return 1*multiplier;
    })
    var newFlairOrder = sortorder.map(a => a.flair)
    // setBarChartData(barChartData)
    // matrixData = barChartData
    setFlairsOrder(newFlairOrder);
    // console.log("________",sortorder,newFlairOrder);
  }
  const handleSortingChange2 = (event: any) => {
    sortingType2 = event.target.value;
    var multiplier:number = 1;
    if(sortingType2 == "desc") multiplier = -1
    var sortorder = barChartData.filter((a)=> a.flair == sDocument).sort((a,b)=> {
      if((+a.count) < (+b.count)) return multiplier*-1;
      else if((+a.count) == (+b.count)) return 0;
      else return 1*multiplier;
    })
    var newTopicOrder: TopicsDTO = {} as TopicsDTO;
    sortorder.forEach(a => newTopicOrder[a.topic] = Topics[a.topic])
    // setBarChartData(barChartData)
    // matrixData = barChartData
    setTopicsOrder(newTopicOrder);
    // console.log("________",sortorder,newTopicOrder);
  }
  
  const handleDocumentsChange = (event: React.SyntheticEvent, newValue: string) => {
    setDocumentTabSelected(newValue);
  }

  const handleTopicStatsChange = (event: React.SyntheticEvent, newValue: string) => {
    setTopicStatsSelected(newValue);
  }

   return (
    <CorpusViewComponentWrapper>
      <Box sx={{ m: 1 }}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={3} sx={{ padding: 0 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                {/* <FormControl variant="standard" sx={{width: '98%'}}>
                  <InputLabel id="dataset-label">Dataset</InputLabel>
                  <Select
                    value={''}
                    labelId="dataset-label"
                    label="Age"
                    onChange={handleDatasetChange}
                  >
                    <MenuItem value="Dummy1">Dummuy 1</MenuItem>
                    <MenuItem value="Dummy2">Dummuy 2</MenuItem>
                  </Select>
                </FormControl> */}
              </Grid>
              <Grid item sx={{ width: '98%' }}>
                <Stack spacing={0} sx={{ border: 1, height: '40%'}}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Topic
                  </Paper>
                  <Accordion disableGutters>
                    <AccordionSummary
                      aria-controls="panel-sorting"
                      id="panel-sorting"
                      sx={{ bgcolor: "gray" }}
                    >
                      <Typography>Sorting</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl sx={{width: '98%'}}>
                        <Select
                          onChange={handleSortingChange}
                          displayEmpty
                          value={sortingType}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value="asc">Ascending</MenuItem>
                          <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Paper sx={{ textAlign: 'left', paddingLeft: 2, paddingY: 2, borderTop: 1, borderBottom: 1, borderRadius: 0}} component={Stack} direction="column" justifyContent="center" elevation={0}>
                    Selection
                  </Paper>
                  <Paper sx={{ height: 200 }}>
                    {sTopic}
                  </Paper>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={0} sx={{ border: 1, height: '40%', width: '98%'}}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Document
                  </Paper>
                  <Accordion disableGutters>
                    <AccordionSummary
                      aria-controls="panel-sorting"
                      id="panel-sorting2"
                      sx={{ bgcolor: "gray" }}
                    >
                      <Typography>Sorting</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl sx={{width: '98%'}}>
                        <Select
                          onChange={handleSortingChange2}
                          displayEmpty
                          value={sortingType2}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value="asc">Ascending</MenuItem>
                          <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Paper sx={{ textAlign: 'left', paddingLeft: 2, paddingY: 2, borderTop: 1, borderBottom: 1, borderRadius: 0}} component={Stack} direction="column" justifyContent="center" elevation={0}>
                    Selection
                  </Paper>
                  <Paper sx={{ height: 200 }}>
                    {sDocument}
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ border: 1, padding: 1 }}>
            <Stack>
              <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                Corpus View
              </Paper>
              <Paper sx={{ paddingLeft: 2, paddingY: 2, borderTop: 1, borderRadius: 0, height: '100%'}} elevation={0}>
                <MatrixPlot topics={topicsOrder} flairs={flairsOrder} matrixData={matrixData} topicAction={selectedTopic} documentAction={selectedDocument}/>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={3} sx={{ margin: 0 }}>
          <Grid container direction="column" spacing={2}>
              <Grid item>
                <Stack spacing={0} sx={{ border: 1, marginLeft: 1, height: '40%'}}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Topic
                  </Paper>
                  <TabContext value={topicStatsSelected}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTopicStatsChange} aria-label="Topic tabs">
                        <Tab label="Distribution" value="distribution-tab" />
                        <Tab label="Metadata" value="metadata-tab" />
                      </TabList>
                    </Box>
                    <TabPanel value="metadata-tab" sx={{ p: 0 }}>
                      <Stack>
                        <Paper sx={{ height: 250 }}>
                          <Stack spacing={1} divider={<Divider flexItem />} justifyContent="space-evenly">
                            <Paper elevation={0} sx={{ padding: 2 }}>
                              Topic AVG: {topicAvg}
                            </Paper>
                            <Paper elevation={0} sx={{ padding: 2 }}>
                              Topic Big: {topicBig}
                            </Paper>
                            <Paper elevation={0} sx={{ padding: 2 }}>
                              Topic Small: {topicSmall}
                            </Paper>
                          </Stack>
                        </Paper>
                      </Stack>
                    </TabPanel>
                    <TabPanel value="distribution-tab" sx={{ p: 0 }}>
                      <Stack>
                        <Paper sx={{ height: 250 }}>
                          <BarChartComponent data={topicBarChartData} height={650} width={350} />
                        </Paper>
                      </Stack>
                    </TabPanel>
                  </TabContext>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={0} sx={{ border: 1, marginLeft: 1, height: '40%'}}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Documents
                  </Paper>
                  <Stack>
                    <TabContext value={documentTabSelected}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleDocumentsChange} aria-label="Documents tab">
                          <Tab label="Document" value="documents-tab" />
                          <Tab label="Topics" value="topics-tab" />
                        </TabList>
                      </Box>
                      <TabPanel value="documents-tab" sx={{ p: 0 }}>
                        <Stack>
                          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 1, textAlign: 'left' }}>
                            {sDocument}
                          </Paper>
                          <Paper sx={{ height: 250, border: 1, borderRadius: 0, overflowY: 'auto' }} >
                            <Typography variant="body1" style={{overflow: "hidden", textOverflow: "ellipsis", padding:'10px', wordBreak: 'break-all'}} gutterBottom>
                              {documentContent}
                            </Typography>
                          </Paper>
                        </Stack>
                      </TabPanel>
                      <TabPanel value="topics-tab" sx={{ p: 0 }}>
                        <Stack>
                          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 1, textAlign: 'left' }}>
                            {sTopic}
                          </Paper>
                          <Paper sx={{ height: 250 }}>
                            <BarChartComponent data={documentBarChartData} height={650} width={350} />
                          </Paper>
                        </Stack>
                      </TabPanel>
                    </TabContext>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CorpusViewComponentWrapper>
    );
   };

export default CorpusViewComponent;
