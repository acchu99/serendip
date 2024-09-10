import { CircularPacking } from "./CircularPacking";
import { Tree } from "./data";
// import { data } from "./data";

type CircularPackingProps = {
  width: number;
  height: number;
  // data: Tree;
  colorScale: any
};

export const CircularPacking2LevelsDemo = ({ width, height, colorScale }: CircularPackingProps) => {
  return <CircularPacking width={width} height={height} colorScale={colorScale} />;
};