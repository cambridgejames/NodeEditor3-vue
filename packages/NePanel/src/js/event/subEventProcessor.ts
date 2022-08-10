import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";

export const getSubEventProcessor = (rightContent: Ref) => {
  const onNeLeftClick = (event: MouseEvent, item: NePanelInitIntf): void => {
    const eventStr: Point = {
      x: event.clientX,
      y: event.clientY
    };
    rightContent.value.solutionValue = JSON.stringify(eventStr) + "\n" + JSON.stringify(item);
  };

  return {
    onNeLeftClick
  };
};
