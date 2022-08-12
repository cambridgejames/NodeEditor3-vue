import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";
import { NeNodeExport } from "@/js/interface/node/NeNodeExport";

export const getSubEventProcessor = (rightContent: Ref, rightElement: Ref) => {
  const onNeLeftClick = (event: MouseEvent, item: NeNodeExport): void => {
    const eventStr: Point = {
      x: event.clientX,
      y: event.clientY
    };
    rightContent.value.solutionValue = JSON.stringify(eventStr);
    rightElement.value = item.detail;
  };

  return {
    onNeLeftClick
  };
};
