import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";
import { NeNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";
import { NePanelConfigure } from "@/js/interface/NePanelConfigure";
import { getNodeController } from "@/NePanel/src/js/controller/nodeController";

export const getSubEventProcessor = (rightContent: Ref, nePanelConfigure: NePanelConfigure) => {
  const NodeController = getNodeController(nePanelConfigure);
  const onNeLeftClick = (item: NeNodeExportEx): void => {
    NodeController.resetSelectedStatus();
    const eventStr: Point = {} as Point;
    item.status.selected = true;
    rightContent.value.solutionValue = JSON.stringify(eventStr);
    nePanelConfigure.rightElement.value = item.detail;
  };

  return {
    onNeLeftClick
  };
};
