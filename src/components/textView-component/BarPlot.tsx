import { FC, useMemo } from "react";
import * as d3 from "d3";
import { topicColors } from "./topicColor";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
// const width=200, height = 1000;
const BAR_PADDING = 0.3;

type Datapoint = { flair: string; topic: string; count: number };
interface BarPlotComponentProps {
    data: Datapoint[];
    height: number;
    width: number;
    selectedTopic: null | string;
}

const BarPlotComponent: FC<BarPlotComponentProps> = ({data, height, width, selectedTopic}) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  console.log("selected topic in bar chart: ", selectedTopic)

  // Y axis is for groups since the barplot is horizontal
  const groups = data.sort((a, b) => b.count - a.count).map((d) => d.topic);
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

  // X axis
  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.count));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }, [data, width]);

  const allShapes = data.map((d, i) => {
    const y = yScale(d.topic);
    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={xScale(0)}
          y={yScale(d.topic)}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          // opacity={0.5}
          stroke="#9d174d"
          fill={d.topic===selectedTopic?topicColors[selectedTopic].background:"#9d174d"}
          fillOpacity={0.5}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale(d.count) - 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          fill={d.topic===selectedTopic?topicColors[selectedTopic].text:"#ffffff"}
          opacity={xScale(d.count) > 90 ? 1 : 0} // hide label if bar is not wide enough
        >
          {d.count}
        </text>
        <text
          x={xScale(0) - 30}
          y={y + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {`T${d.topic.split('-').slice(-1)[0]}`}
        </text>
      </g>
    );
  });

  const grid = xScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={xScale(value)}
          x2={xScale(value)}
          y1={0}
          y2={boundsHeight}
          stroke="#808080"
          opacity={0.2}
        />
      </g>
    ));

  return(
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  )
}

export default BarPlotComponent;
