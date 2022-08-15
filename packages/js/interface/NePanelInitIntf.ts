/**
 * NePanel配置入参
 */
import { Point } from "@/js/interface/2d/Point";

interface NePanelInitIntf {
  name: string,
  transform: Point
}
const NePanelInit = (): NePanelInitIntf => {
  return {} as NePanelInitIntf;
};

export {
  NePanelInit,
  NePanelInitIntf
};
