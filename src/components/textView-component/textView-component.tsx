import React, { FC, useState, useEffect } from 'react';
import { TextViewComponentWrapper } from './textView-component.styled';
import { TextField, Box, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, Select, MenuItem, FormControl } from '@mui/material';
import BarPlotComponent from "./BarPlot"
import AnimatedLineChartComponent from "./AnimatedLineChart";
import { Topics } from "../../constants/topics";
import DataParserService from '../../services/data-parser.service';
import { Flairs } from '../../constants/flairs';


const svgHeight = 800;
const pageHeight = 600;

interface BarPlotDataInterface {
  count: number;
  flair: string;
  topic: string;
}

interface RenderBarPlotComponentProps {
  barPlotData: BarPlotDataInterface[];
  curTopic: string | null;
}

const RenderBarPlot: FC<RenderBarPlotComponentProps> = ({barPlotData, curTopic}) => {
  // console.log(curTopic)
  if(barPlotData.length>0 && curTopic===null){
    return(<BarPlotComponent data={barPlotData} height={svgHeight} width={350} selectedTopic={null} />)
  }else if(barPlotData.length>0 && curTopic!==null){
    return(<BarPlotComponent data={barPlotData} height={svgHeight} width={350} selectedTopic={curTopic} />)
  }else{
    return null
  }
}

interface TextViewComponentProps {
  globalFlair: string;
  globalTopic: string;
  data: string;
  updateData: () => void;
}

const TextViewComponent: FC<TextViewComponentProps> = ({ data, updateData, globalFlair, globalTopic }) => {
  // console.log(globalFlair, globalTopic);
  const startIndex:number = 0, endIndex:number = 10000;

  const [curFlair, setCurFlair] = useState<string>(data);//globalFlair ? globalFlair:
  const [curTopic, setCurTopic] = useState<any>(null);
  const [curTopics, setCurTopics] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [barPlotData, setBarPlotData] = useState<any>([])
  const [allLineChartData, setAllLineChartData] = useState<any>([])
  const [lineChartData, setLineChartData] = useState<any>([])
  const [curDocument, setCurDocument] = useState<string>("")
  const [curTopicWords, setCurTopicWords] = useState<string[]>([]);
  // toggle button-group state and handler
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = async (event: any, newAlignment: string) => {
    setAlignment(newAlignment);
    setCurTopic(newAlignment)
    setCurTopicWords(Topics[event.target.value]);
    setLineChartData(allLineChartData.map((d:any)=>{return {date:d.date, count:d[event.target.value]}}))
  };

  const handleFlairChange = (event: any) => {
    setCurFlair(event.target.value as string);
    setSearchQuery('');
    setCurTopics([])
    setCurTopic(null)
    setAlignment('web')
    setLineChartData([]);
  };

  const handleSearchQueryChange = (event: any): void => {
    setSearchQuery(event.target.value);
    let topicArray: any = [];
    for (const topic in Topics) {
      if (Topics[topic].includes(event.target.value.toLowerCase())) topicArray.push({ topic })
    }
    setCurTopics(topicArray)
  };

  useEffect(() => {
    let bpData = DataParserService.getTextViewBarPlotData(curFlair)
    let lcData = DataParserService.getTextViewLineChartData(curFlair)
    setBarPlotData(bpData);
    setAllLineChartData(lcData);
  }, [curFlair])

  useEffect(() => {
    const fetchAndSetData = () => {
      let flairDoc = DataParserService.getFlairTextData(curFlair);
      flairDoc.then((docText: any) => {
        setCurDocument(docText);
      })
    }

    fetchAndSetData()
  }, [curFlair])

  const processWord = (word:string):string => {
    return word.replace(/\./g, '').toLowerCase();
  }

  const processAndCheckWord = (word:string) => {
    let cleanedWord: string = processWord(word);
    if(curTopicWords.includes(cleanedWord)===true){
      return true
    }else{
      return false
    }
  }

  return (
    <TextViewComponentWrapper>
      {/* ashwin is editing this view */}
      <Box sx={{ m: 1, height: 100 }}>
        <Grid container spacing={3} direction={"column"}>
          <Grid item>
            <Stack spacing={2} sx={{ width: '100%' }} direction={'row'}>
            <FormControl sx={{width: '30%'}}>
              <Select
                onChange={handleFlairChange}
                displayEmpty
                value={curFlair}>
                {Flairs.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              <TextField
                sx={{ width: 600 }}
                id="outlined-basic"
                label="Search Document"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </Stack>
          </Grid>
          <Grid item>
            {/* <Typography variant="h5" align="left" gutterBottom>
              <b>Flair:</b> {curFlair} ; <b>Current Search Term:</b> {searchQuery} ; <b>Topic:</b> {curTopic}
            </Typography> */}
            {
                curTopics.length > 0 ? <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  {curTopics.map((item: any) => <ToggleButton key={item.topic} value={item.topic}>{item.topic}</ToggleButton>)}
                </ToggleButtonGroup> : searchQuery.length > 0 ? <p style={{color: "red"}}>Word is not in any topic</p>:null
              }
          </Grid>
          <Grid item>
            <Grid container sx={{ height: 700 }} spacing={2}>
              <Grid item xs={3}>
                <Stack spacing={0} sx={{ height: '100%' }}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Bar Chart
                  </Paper>
                  <Paper sx={{ height: '100%', border: 1, borderRadius: 0 }} >
                    {
                      <RenderBarPlot barPlotData={barPlotData} curTopic={curTopic}  />
                    }
                  </Paper>
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Stack spacing={0} sx={{ height: '100%' }}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Document View
                  </Paper>
                  <Paper sx={{ height: `${pageHeight+230}px`, border: 1, borderRadius: 0, overflowY: 'auto' }} >
                    <Typography variant="body1" style={{overflow: "hidden", textOverflow: "ellipsis", padding:'10px'}}gutterBottom>
                      {
                        curDocument.slice(startIndex, endIndex).split(' ').map((item)=> {
                          let truth = processAndCheckWord(item)
                          if(truth==true && curTopic!==null){
                            return <span><span style={{backgroundColor: "#FFFF00"}}>{`${item}`}</span> </span>
                          }else{
                            return <span>{`${item} `}</span>
                          }
                        })
                      }.....
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={0} sx={{ height: '100%' }}>
                  <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                    Line Chart
                  </Paper>
                  <Paper sx={{ height: '100%', border: 1, borderRadius: 0 }} >
                    {
                      curTopic!==null ? 
                      <AnimatedLineChartComponent data={allLineChartData} height={svgHeight} width={250} selectedGroup={curTopic} /> : 
                      <div><svg id="lineChartSVG"></svg></div>
                    }
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </TextViewComponentWrapper>
  );
}

export default TextViewComponent;
