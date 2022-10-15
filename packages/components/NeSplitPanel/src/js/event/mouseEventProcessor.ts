import { Ref } from "vue";
import { Point } from "@/js/interface/2d/Point";
import { onMouseDown } from "@/js/event/eventProcesssor";

export const getMouseEventProcessor = (preConf: Ref, neSplitPanel: Ref<HTMLElement | undefined>,
  leftPanel: Ref<HTMLElement | undefined>) => {
  /**
   * 修改右边栏宽度事件响应方法
   *
   * @param event 鼠标事件
   */
  const onRightResize = (event: MouseEvent): void => {
    const neSplitPanelElement = neSplitPanel.value;
    const leftPanelElement = leftPanel.value;
    if (neSplitPanelElement === undefined || leftPanelElement === undefined) {
      return;
    }
    const onDragFunc = (event: MouseEvent, startPoint: Point): void => {
      const rightMax = neSplitPanelElement.offsetWidth - leftPanelElement.offsetWidth - preConf.value.center;
      preConf.value.right = Math.max(Math.min(rightMax, preConf.value.right - event.clientX + startPoint.x), 50);
      startPoint.x = event.clientX;
    };
    onMouseDown(event, null, onDragFunc, null, null);
  };

  return {
    onRightResize
  };
};
