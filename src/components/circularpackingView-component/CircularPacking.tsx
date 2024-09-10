import * as d3 from "d3";
import { Tree, data } from "./data";
import { log } from "console";

type CircularPackingProps = {
  width: number;
  height: number;
  // data: Tree;
  colorScale: any;
};

const MARGIN = 3;

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

export const CircularPacking = ({
  width,
  height,
  // data,
  colorScale
}: CircularPackingProps) => {
  // console.log("d__",data);
  
  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => (b.value as number) - (a.value as number));

  console.log("heirarchy: ", hierarchy);

  const packGenerator = d3.pack<Tree>().size([width, height]).padding(4);
  const root = packGenerator(hierarchy);
  console.log("root: ",root);
  
  // List of item of level 1 (just under root) & related color scale
  const firstLevelGroups = hierarchy?.children?.map((child) => child.data.name);

  // Circles for level 1 of the hierarchy
  const allLevel1Circles = root
    .descendants()
    .filter((node) => node.depth === 1)
    .map((node) => {
      const parentName = node.data.name;
      // console.log("p__",node);
      
      return (
        <g key={node.data.name}>
          <circle
            cx={+node.x}
            cy={node.y}
            r={node.r}
            stroke={colorScale(parentName)}
            strokeWidth={1}
            strokeOpacity={0.3}
            fill={colorScale(parentName)}
            fillOpacity={0.1}
          />
        </g>
      );
    });

  // Circles for level 2 = leaves
  const allLeafCircles = root.leaves().map((leaf) => {
    const parentName = leaf.parent?.data.name;
    // console.log("__",leaf)

    if (!parentName) {
      return null;
    }

    return (
      <g key={`${parentName}-${leaf.data.name}`}>
        <circle
          cx={+leaf.x}
          cy={leaf.y}
          r={leaf.r}
          stroke={colorScale(parentName)}
          strokeWidth={2}
          fill={colorScale(parentName)}
          fillOpacity={0.2}
        />

        <text
          key={leaf.data.name}
          x={leaf.x}
          y={leaf.y}
          fontSize={10}
          fontWeight={0.4}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {leaf.r-10>0?`T${leaf.data.name.split('-')[1]}`:null}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      {allLevel1Circles}
      {allLeafCircles}
    </svg>
  );
};
