import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { neNodeExportEx, NeNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";
import { NePanelConfigure } from "@/js/interface/NePanelConfigure";

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
export default { initComponentList };

export const getNodeController = (nePanelConfigure: NePanelConfigure) => {
  const resetSelectedStatus = (): void => {
    for (const componentElement of nePanelConfigure.componentList.value) {
      componentElement.status.selected = false;
    }
    nePanelConfigure.rightElement.value = undefined;
  };

  return {
    initComponentList,
    resetSelectedStatus
  };
};
