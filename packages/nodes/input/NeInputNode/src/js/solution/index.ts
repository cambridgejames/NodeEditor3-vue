import { NeInputData } from "@/nodes/input/NeInputNode/src/js/interface/NeInputData";

export const solution = (data: NeInputData | null): string => {
  return data === null ? "" : data.input;
};
