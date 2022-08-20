import { NeInputPanelIntf } from "../interface/neInputPanelIntf";
import { Ref, SetupContext } from "vue";
import { Point } from "@/js/interface/2d/Point";
import Format from "@/NePanel/src/js/format";
import { EventCallback, onMouseDown } from "@/js/event/eventProcesssor";

/**
 * 根据节点获取整个面板
 *
 * @param nodeElement
 */
const getPanelElement = (nodeElement: HTMLElement | undefined): HTMLElement | undefined | null => {
  let parentElement = nodeElement as HTMLElement | undefined | null;
  while (parentElement !== undefined && parentElement !== null && parentElement.tagName !== "svg") {
    parentElement = parentElement.parentElement;
  }
  return parentElement;
};

export const getMouseEventProcessor = (nodePanel: Ref<HTMLElement | undefined>, nodePanelConf: Ref<NeInputPanelIntf>,
  panelConf: Ref, context: SetupContext) => {
  /**
   * 右键点击事件响应方法
   *
   * @param event 鼠标事件
   */
  const onRightDown = (event: MouseEvent): void => {
    const nodeElement = nodePanel.value;
    const onClickFunc: EventCallback = (): void => {
      context.emit("neRightClick");
    };
    onMouseDown(event, nodeElement, null, null, onClickFunc, null);
  };

  /**
   * 移动节点事件响应方法
   *
   * @param event 鼠标事件
   */
  const onMoveNodeDown = (event: MouseEvent): void => {
    const panelElement = getPanelElement(nodePanel.value);
    const onDragFunc: EventCallback = (event: MouseEvent, startPoint: Point): void => {
      nodePanelConf.value.x += Format.formatScale(event.clientX - startPoint.x, panelConf.value.scale);
      nodePanelConf.value.y += Format.formatScale(event.clientY - startPoint.y, panelConf.value.scale);
      startPoint.x = event.clientX;
      startPoint.y = event.clientY;
    };
    const onClickFunc: EventCallback = (): void => {
      context.emit("neLeftClick");
    };
    onMouseDown(event, panelElement, null, onDragFunc, onClickFunc, null);
  };

  /**
   * 节点大小改变事件响应方法
   *
   * @param event 鼠标事件
   */
  const onResizeDown = (event: MouseEvent): void => {
    const panelElement = getPanelElement(nodePanel.value);
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const resizeFunc = (event: Event): void => {
      if (event instanceof MouseEvent) {
        const mouseEvent = event as MouseEvent;
        if (nodePanelConf.value.width + mouseEvent.clientX - starting.x >= nodePanelConf.value.minWidth) {
          nodePanelConf.value.width += Format.formatScale(mouseEvent.clientX - starting.x, panelConf.value.scale);
          starting.x = mouseEvent.clientX;
        }
        if (nodePanelConf.value.height + mouseEvent.clientY - starting.y >= nodePanelConf.value.minHeight) {
          nodePanelConf.value.height += Format.formatScale(mouseEvent.clientY - starting.y, panelConf.value.scale);
          starting.y = mouseEvent.clientY;
        }
      }
    };
    const mouseUpFunc = (event: Event): void => {
      if (event instanceof MouseEvent) {
        panelElement?.removeEventListener("mousemove", resizeFunc);
        panelElement?.removeEventListener("mouseup", mouseUpFunc);
      }
    };
    panelElement?.addEventListener("mousemove", resizeFunc);
    panelElement?.addEventListener("mouseup", mouseUpFunc);
  };

  return {
    onRightDown,
    onMoveNodeDown,
    onResizeDown
  };
};
