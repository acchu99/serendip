import { FC, useState, useEffect } from 'react';
import { CircularpackingViewComponentWrapper } from './circularpackingView-component.styled';
import { Box, Grid, Paper, Stack, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {Flairs} from "../../constants/flairs"
import DataParserService from '../../services/data-parser.service';
import { CircularPacking2LevelsDemo } from "./CircularPacking2LevelsDemo";
import * as d3 from 'd3';
import { log } from 'console';
// import { useLocation } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'


const colors = [
   "#e0ac2b", // Golden Yellow
   "#6689c6", // Sky Blue
   "#a4c969", // Lime Green
   "#e85252", // Coral Red
   "#9a6fb0", // Lavender Purple
   "#a53253", // Raspberry Pink
   "#7f7f7f", // Gray
   "#5da493", // Teal
];

const colorScale = d3.scaleOrdinal<string>().domain(Flairs).range(colors);

interface CircularpackingViewComponentProps {
   data: any
}

const controlWidth = 2.5

const ColorLegend = () => {
   return (
     <div>
       {Flairs.map((item) => (
         <div key={`circular-legend-${item}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
           <div style={{ width: '20px', height: '20px', backgroundColor: colorScale(item), marginRight: '5px' }}></div>
           <span>{item}</span>
         </div>
       ))}
     </div>
   );
 };


const CircularpackingViewComponent: FC<CircularpackingViewComponentProps> = (data) => {
   const [dataset, setDataset] = useState<any>(data);

   useEffect(()=>{
      const fetchAllFlairs = () => {
         return DataParserService.getCircularPackingData()
      }
      let tempData = fetchAllFlairs()
      console.log('loaded dataset: cpv', tempData)
      setDataset(tempData)      
   }, [])
   
   useEffect(()=>{
      console.log("Dataset Changed: ", dataset)
   }, [dataset])

   return(
      <CircularpackingViewComponentWrapper>
         <Box sx={{ m: 1, height: 100 }}>
            <Grid container spacing={3} direction={"column"}>
               <Grid item>
                  <Grid container sx={{ height: 700 }} spacing={2}>
                     
                     <Grid item xs={10}>
                        <Stack spacing={0} sx={{ height: '100%' }}>
                           <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                              Circular Packing
                           </Paper>
                           <Paper sx={{ height: '100%', border: 1, borderRadius: 0 }} >
                              {/* add Circular Packing Component Here */}
                              <CircularPacking2LevelsDemo
                                 // data={dataset}
                                 width={1200}
                                 height={600}
                                 colorScale={colorScale}
                              />
                           </Paper>
                        </Stack>
                     </Grid>
                     <Grid item xs={2}>
                        <Stack spacing={0} sx={{ height: '100%' }}>
                           <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                              Legend
                           </Paper>
                           <Paper sx={{ height: '100%', border: 1, borderRadius: 0, padding:2}} >
                              {dataset!==null?<ColorLegend/>:null}
                           </Paper>
                        </Stack>
                     </Grid>

                  </Grid>
               </Grid>
            </Grid>
         </Box>
      </CircularpackingViewComponentWrapper>
   )
};

export default CircularpackingViewComponent;
