import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";

export const getMouseEventProcessor = (preConf: Ref, neSplitPanel: Ref<HTMLElement | undefined>,
  leftPanel: Ref<HTMLElement | undefined>, rightPanel: Ref<HTMLElement | undefined>) => {
  /**
   * 修改右边栏宽度事件响应方法
   *
   * @param event 鼠标事件
   */
  const onRightResize = (event: MouseEvent): void => {
    const neSplitPanelElement = neSplitPanel.value;
    const leftPanelElement = leftPanel.value;
    const rightPanelElement = rightPanel.value;
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const moveFunc = (subEvent: Event): void => {
      if (subEvent instanceof MouseEvent && neSplitPanelElement !== undefined && leftPanelElement !== undefined) {
        const rightMax = neSplitPanelElement.offsetWidth - leftPanelElement.offsetWidth - preConf.value.center;
        const mouseEvent = subEvent as MouseEvent;
        preConf.value.right = Math.max(Math.min(rightMax, preConf.value.right - mouseEvent.clientX + starting.x), 50);
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
