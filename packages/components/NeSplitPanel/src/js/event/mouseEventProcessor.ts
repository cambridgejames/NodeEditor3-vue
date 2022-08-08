import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";

export const getMouseEventProcessor = (preConf: Ref, neSplitPanel: Ref<HTMLElement | undefined>,
  rightPanel: Ref<HTMLElement | undefined>) => {
  /**
   * 修改右边栏宽度事件响应方法
   *
   * @param event 鼠标事件
   */
  const onRightResize = (event: MouseEvent): void => {
    const neSplitPanelElement = neSplitPanel.value;
    const rightPanelElement = rightPanel.value;
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const moveFunc = (subEvent: Event): void => {
      if (subEvent instanceof MouseEvent) {
        const mouseEvent = subEvent as MouseEvent;
        preConf.value.right -= mouseEvent.clientX - starting.x;
        starting.x = mouseEvent.clientX;
      }
    };
    const mouseUpFunc = (): void => {
      preConf.value.right = rightPanelElement?.offsetWidth;
      neSplitPanelElement?.removeEventListener("mousemove", moveFunc);
      neSplitPanelElement?.removeEventListener("mouseup", mouseUpFunc);
    };
    neSplitPanelElement?.addEventListener("mousemove", moveFunc);
    neSplitPanelElement?.addEventListener("mouseup", mouseUpFunc);
  };

  return {
    onRightResize
  };
};