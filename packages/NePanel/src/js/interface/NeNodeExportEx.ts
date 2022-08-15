import { NeNodeExport } from "@/js/interface/node/NeNodeExport";
import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { Point } from "@/js/interface/2d/Point";
import COMPONENT_MAP from "@/nodes";

export interface NeNodeExportEx extends NeNodeExport {
  status: {
    selected: boolean,
    transform: Point
  }
}

/**
 * 节点初始化方法
 *
 * @param initConf 节点初始化对象
 */
export const neNodeExportEx = (initConf: NePanelInitIntf): NeNodeExportEx => {
  const solution = COMPONENT_MAP.get(initConf.name) as NeNodeExportEx;
  solution.status = {
    selected: false,
    transform: initConf.transform
  };
  return solution;
};
