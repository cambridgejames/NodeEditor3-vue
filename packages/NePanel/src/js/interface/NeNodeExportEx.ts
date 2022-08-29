import { NeNodeExport } from "@/js/interface/node/NeNodeExport";
import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { Point } from "@/js/interface/2d/Point";
import COMPONENT_MAP from "@/nodes";
import { NeData } from "@/js/interface/node/NeData";

export interface NeNodeExportStatus {
  id: string
  selected: boolean
  transform: Point
}

export interface NeNodeExportData {
  data: NeData | null
  solution: string
}

export interface NeNodeExportEx extends NeNodeExport {
  status: NeNodeExportStatus
  data: NeNodeExportData
}

/**
 * 节点初始化方法
 *
 * @param initConf 节点初始化对象
 */
export const neNodeExportEx = (initConf: NePanelInitIntf): NeNodeExportEx => {
  const solution = { ...COMPONENT_MAP.get(initConf.name) } as NeNodeExportEx;
  solution.status = {
    id: initConf.nid,
    selected: false,
    transform: initConf.transform
  } as NeNodeExportStatus;
  solution.data = {
    data: getNeData(initConf),
    solution: ""
  } as NeNodeExportData;
  return solution;
};

const getNeData = <T extends NeData> (initConf: NePanelInitIntf): T | NeData | null => {
  if (initConf.data === undefined || initConf.data === null) {
    return null;
  }
  return JSON.parse(initConf.data) as T;
};
