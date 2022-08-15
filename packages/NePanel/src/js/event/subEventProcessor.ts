import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";
import { NeNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";

export const getSubEventProcessor = (rightContent: Ref, rightElement: Ref) => {
  const onNeLeftClick = (event: MouseEvent, item: NeNodeExportEx): void => {
    const eventStr: Point = {
      x: event.clientX,
      y: event.clientY
    };
    item.status.selected = true;
    rightContent.value.solutionValue = JSON.stringify(eventStr);
    rightElement.value = item.detail;
  };

  return {
    onNeLeftClick
  };
};
