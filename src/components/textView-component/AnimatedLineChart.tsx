import { FC, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { useSpring, animated } from "@react-spring/web";
import { topicColors } from "./topicColor";

type Datapoint = { 
    date: Date; 
    "type-1": number;
    "type-2": number;
    "type-3": number;
    "type-4": number;
    "type-5": number;
    "type-6": number;
    "type-7": number;
    "type-8": number;
    "type-9": number;
    "type-10": number;
    "type-11": number;
    "type-12": number;
    "type-13": number;
    "type-14": number;
    "type-15": number;
    "type-16": number;
    "type-17": number;
    "type-18": number;
    "type-19": number;
    "type-20": number;
    "type-21": number;
    "type-22": number;
    "type-23": number;
    "type-24": number;
    "type-25": number;
};

interface LineChartComponentProps {
    data: Datapoint[];
    height: number;
    width: number;
    selectedGroup: "topic-1" | "topic-2" | "topic-3" | "topic-4" | "topic-5" | "topic-6" | "topic-7" | "topic-8" | "topic-9" | "topic-10" | "topic-11" | "topic-12" | "topic-13" | "topic-14" | "topic-15" | "topic-16" | "topic-17" | "topic-18" | "topic-19" | "topic-20" | "topic-21" | "topic-22" | "topic-23" | "topic-24" | "topic-25"
}

const MARGIN = { top: 20, right: 30, bottom: 50, left: 50 };
// const width=200, height = 1000;

const AnimatedLineChartComponent: FC<LineChartComponentProps> = ({ data, height, width, selectedGroup }) => {
    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const yScale = useMemo(() => {
        return d3.scaleTime().domain(d3.extent(data.map((d: any) => d.date)) as number[]).range([boundsHeight, 0]);
    }, [data, height]);

    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([0,1]).range([0, boundsWidth]);
    }, [data, width]);

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();

        const xAxisGenerator = d3.axisBottom(xScale).ticks(boundsWidth/100);
        svgElement
        .append("g")
        .attr("transform", "translate(0," + boundsHeight + ")")
        .call(xAxisGenerator)
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll(".tick>line").remove())
        .call(g => g.selectAll(".tick>text").remove())

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [xScale, yScale, boundsHeight]);

    const lineBuilder = d3.line<Datapoint>().x((d) => xScale(d[selectedGroup as keyof Datapoint])).y((d) => yScale(d.date)).curve(d3.curveCatmullRom.alpha(0.5));
    const linePath = lineBuilder(data);
    if (!linePath) {
        return null;
    }
    const topicColor = topicColors[selectedGroup].background

    return (
        <div>
            <svg id="lineChartSVG" width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <LineItem 
                        path={linePath} 
                        // color={"#9a6fb0"} 
                        color={topicColor}
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

type LineItemProps = {
    path: string;
    color: string;
};

const LineItem = ({ path, color }: LineItemProps) => {
    const springProps = useSpring({
        to: { path, color },
        config: { friction: 100 }
    });

    return (
        <animated.path
            d={springProps.path}
            fill={"none"}
            stroke={color}
            strokeWidth={2}
        />
    );
};

export default AnimatedLineChartComponent;
