import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { neNodeExportEx, NeNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";

/**
 * 初始化节点列表
 *
 * @param nodeInitList
 */
const initComponentList = (nodeInitList: NePanelInitIntf[]): NeNodeExportEx[] => {
  const solutionList = new Array<NeNodeExportEx>();
  for (const nodeInitElement of nodeInitList) {
    solutionList.push(neNodeExportEx(nodeInitElement));
  }
  return solutionList;
};

export const getNodeController = () => {
  return {
    initComponentList
  };
};
