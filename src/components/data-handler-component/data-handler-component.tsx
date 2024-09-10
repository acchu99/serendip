import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { Box, Tab, Tabs } from '@mui/material';

import CorpusViewComponent from '../corpusView-component/corpusView-component';
import TextViewComponent from '../textView-component/textView-component';
import RankViewComponent from '../rankView-component/rankView-component';
import RadarViewComponent from '../radarView-component/radarView-component';
import CircularpackingViewComponent from '../circularpackingView-component/circularpackingView-component';

import DataParserService from '../../services/data-parser.service';

import RankViewData, { dummyRankViewData } from "../../interfaces/rankViewDTO";
import RadarViewDTO from "../../interfaces/RadarViewDTO";

interface DataHandlerComponentProps {}

const DataHandlerComponent: FC<DataHandlerComponentProps> = () => {
   const [data, setData] = useState<string>('Initial Data');
   const [rankViewData, setRankViewData] = useState<RankViewData[]>([dummyRankViewData]);
   const [topicWiseData, setTopicWiseData] = useState<any>([]);
   const [matrixData, setMatrixData] = useState<any>([]);
   const [textViewData, setTextViewData] = useState<any>('AskIndia');

   const [selectedTab, setSelectedTab] = useState<string>('/corpus-view');

   const [flair, setFlair] = useState<string>('none');
   const [topic, setTopic] = useState<string>('none');

   const [radarViewData, setRadarViewData] = useState<RadarViewDTO>({
     allTopics: [],
     allFlairs: [],
     selectedTopics: [],
     selectedFlairs: [],
     flairTopicLikelihood: []
  });
  const [circularpackingViewData, setCircularParkingViewData] = useState<any>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const updateState = (flair: string, topic: string) => {
    setFlair(flair);
    setTopic(topic);
  }

  const baseUrl = "http://localhost:3000"

  useEffect(() => {
    const fetchData = async () => {
      try {
        await DataParserService.getMainData();
        const result = await DataParserService.getCorpusViewData("Data");
        const rankViewDataFetched: RankViewData[] = await DataParserService.getRankViewData("Data");
        const matrixDataFetched = await DataParserService.getMatrixData();
        const radarViewDataFetched = await DataParserService.getRadarViewData();
        const fetchAllFlairs = () => {
          return DataParserService.getCircularPackingData()
        }
       let circularParkingViewDataFetched = fetchAllFlairs()
        setRankViewData(rankViewDataFetched);
        setTopicWiseData(result);
        setMatrixData(matrixDataFetched);
        setRadarViewData(radarViewDataFetched);
        setCircularParkingViewData(circularParkingViewDataFetched);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const currentUrl = window.location.href;
    const currentSubUrl = currentUrl.replace(baseUrl, "");
    setSelectedTab(currentSubUrl === "/" ? '/corpus-view' : currentSubUrl);
  }, []);

  // Function to update the data
  const updateData = () => {
    const newData = Math.random().toString(36).substring(7); // Generate random data
    setData(newData);
   };

  const updateRadarViewData = (data: RadarViewDTO) => {
    console.log(data);
    setRadarViewData(data);
    // TODO: need to get the new selected flair and topic and propogate it to other view if necessary
  };

   return (
      <Router>
        <Box sx={{margin: 3}}>
          <h1>Serendip</h1>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Corpus View" value="/corpus-view" component={Link} to="/corpus-view" />
            <Tab label="Text View" value="/tex-view" component={Link} to="/text-view" />
            <Tab label="Rank View" value="/rank-view" component={Link} to="/rank-view" />
            <Tab label="Radar View" value="/radar-view" component={Link} to="/radar-view" />
            <Tab label="Circular packing View" value="/circularpacking-view" component={Link} to="/circularpacking-view" />
          </Tabs>
          <Routes>
            <Route path="/" element={<CorpusViewComponent matrixData={matrixData} data={rankViewData} updateData={updateData} globalFlair={flair} globalTopic={topic} setFlair={setFlair} setTopic={setTopic} />} />
            <Route path="/corpus-view" element={<CorpusViewComponent matrixData={matrixData} data={rankViewData} updateData={updateData} globalFlair={flair} globalTopic={topic} setFlair={setFlair} setTopic={setTopic} />} />
            <Route path="/text-view" element={<TextViewComponent data={textViewData} updateData={updateData} globalFlair={flair} globalTopic={topic} />} />
            <Route path="/rank-view" element={<RankViewComponent data={rankViewData} updateData={updateData} />} />
            <Route path="/radar-view" element={<RadarViewComponent data={radarViewData} updateData={updateRadarViewData} globalFlair={flair} globalTopic={topic} />} />
            <Route path="/circularpacking-view" element={<CircularpackingViewComponent data={circularpackingViewData}/>} />
          </Routes>
        </Box>
      </Router>
   );
}
export default DataHandlerComponent;
