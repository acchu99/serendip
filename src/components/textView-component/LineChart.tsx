import { FC, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

type Datapoint = { date: Date; count: number };
interface LineChartComponentProps {
    data: Datapoint[];
    height: number;
    width: number;
}

const MARGIN = { top: 20, right: 30, bottom: 50, left: 50 };
// const width=200, height = 1000;

const LineChartComponent: FC<LineChartComponentProps> = ({data, height, width}) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const yScale = useMemo(() => {
    return d3.scaleTime().domain(d3.extent(data.map((d:any) => d.date)) as number[]).range([boundsHeight, 0]);
  }, [data, height]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain(d3.extent(data.map((d:any) => d.count)) as number[]).range([0, boundsWidth]);
  }, [data, width]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const lineBuilder = d3
    .line<Datapoint>()
    .x((d) => xScale(d.count))
    .y((d) => yScale(d.date))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const linePath = lineBuilder(data);
  if (!linePath) {
    return null;
  }

  return (
    <div>
      <svg id="lineChartSVG" width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#9a6fb0"
            fill="none"
            strokeWidth={2}
          />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  )
}

export default LineChartComponent;
