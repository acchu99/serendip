import React, { FC, useEffect, useState } from 'react';
import { RadarViewComponentWrapper } from './radarView-component.styled';
import RadarViewDTO, { FlairTopicLikelihood } from "../../interfaces/RadarViewDTO";
import { Box, Grid, Paper, Stack, Autocomplete, TextField } from '@mui/material';
import * as d3 from 'd3';
import { RadarChart } from './radar';

interface RadarViewComponentProps {
  data: RadarViewDTO;
  updateData: (data: RadarViewDTO) => void;

  globalFlair: string;
  globalTopic: string;
}
type Legend = { name: string, color: string };

const RadarViewComponent: FC<RadarViewComponentProps> = ({ data, updateData, globalFlair, globalTopic }) => {
  let [selectedTopics, setSelectedTopics] = useState<string[]>(data.selectedTopics);
  let [selectedFlairs, setSelectedFlairs] = useState<string[]>(data.selectedFlairs);
  let [colors, setColors] = useState<Legend[]>([]);

  type RadarData = { axis: string, value: number };
  useEffect(() => {
    var mycfg = {
      w: 500,
      h: 500,
      maxValue: 1,
      levels: 6,
      ExtraWidthX: 200,
      ExtraWidthY: 100
    }
    let radarData: RadarData[][] = [];
    if (selectedTopics.length === 0 || selectedFlairs.length === 0) {
      d3.select("#radar_div").selectAll("*").remove();
      d3.select("#radar_div")
        .append("svg")
        .attr("width", 500 + 200)
        .attr("height", 500 + 100)
        .append("g")
        .attr("transform", "translate(" + 80 + "," + 30 + ")");
    } else {
      selectedFlairs.forEach((flair) => {
        let y: RadarData[] = data.flairTopicLikelihood
          .filter((flairTopicLikelihood) => flairTopicLikelihood.flair === flair)
          .map((x) => ({
            axis: x.topic,
            value: x.likeliness/100
          }))
          .filter((axis) => selectedTopics?.includes(axis.axis));
        radarData.push(y);
      });
      RadarChart.draw("#radar_div", radarData, mycfg);
      data.selectedTopics = selectedTopics
      data.selectedFlairs = selectedFlairs
      updateData(data);
    }
    const tempColors = selectedFlairs.map((flair, index) => {
      return {
        name: flair,
        color: d3.schemeCategory10[index]
      };
    });
    setColors(tempColors);
  }, [selectedFlairs, selectedTopics]);

  const ColorLegend = (props: { legend: Legend[] }) => {
    return (
      <div>
        {props.legend.map((c: Legend, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: c.color, marginRight: '5px' }}></div>
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <RadarViewComponentWrapper style={{ padding: "10px" }}>
      <Box sx={{ m: 1 }}>
        <Grid container spacing={1} justifyContent="space-between" >

          <Grid item xs={3} sx={{ margin: 0, padding: 1, paddingBottom: 0 }}>
            <div style={{ border: "1px solid black", height: "100%" }}>
              <Stack>
                <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                  Filters
                </Paper>
              </Stack>
              <Stack>
                <Autocomplete
                  multiple
                  id="selected-topics"
                  options={data.allTopics}
                  value={selectedTopics}
                  getOptionLabel={(option) => option}
                  defaultValue={selectedTopics}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selected Topics"
                    />
                  )}
                  style={{ margin: '10px' }}
                  onChange={(_, value) => {
                    setSelectedTopics(value);
                  }}
                />
                <Autocomplete
                  multiple
                  id="selected-flairs"
                  options={data.allFlairs}
                  value={selectedFlairs}
                  getOptionLabel={(option) => option}
                  defaultValue={selectedFlairs}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selected Flairs"
                    />
                  )}
                  style={{ margin: '10px' }}
                  onChange={(_, value) => {
                    setSelectedFlairs(value);
                  }}
                />
              </Stack>
            </div>
          </Grid>

          <Grid item xs={6} sx={{ border: 1, padding: 1 }}>
            <Stack>
              <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                Radar View
              </Paper>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <div id="radar_div" style={{ overflow: 'auto', maxWidth: '100%', maxHeight: '100%', margin: "10px" }}>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={3} sx={{ margin: 0, padding: 1, paddingBottom: 0 }}>
            <div style={{ border: "1px solid black", height: "100%" }}>
              <Stack>
                <Paper elevation={0} variant="outlined" sx={{ borderRadius: 0, bgcolor: 'info.main', color: 'white', paddingY: 2 }}>
                  Legend
                </Paper>
              </Stack>
              <Stack justifyContent="center" alignItems="center">
                <div id="legend_div" style={{ overflow: 'auto', maxWidth: '100%', maxHeight: '100%', margin: "10px" }}>
                  <ColorLegend legend={colors} />
                </div>
              </Stack>
            </div>
          </Grid>
        </Grid>

      </Box>


    </RadarViewComponentWrapper>
  );
}

export default RadarViewComponent;
