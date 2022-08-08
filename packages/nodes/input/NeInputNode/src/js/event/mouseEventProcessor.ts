import { NeInputPanelIntf } from "@/nodes/input/NeInputNode/src/js/interface/neInputPanelIntf";
import { Ref, SetupContext } from "vue";
import { Point } from "@/js/interface/2d/Point";

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
  context: SetupContext) => {
  /**
   * 左键点击事件响应方法
   *
   * @param event 鼠标事件
   */
  const onLeftDown = (event: MouseEvent): void => {
    const nodeElement = nodePanel.value;
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const mouseUpFunc = (subEvent: Event): void => {
      if (subEvent instanceof MouseEvent) {
        const mouseEvent = subEvent as MouseEvent;
        if (mouseEvent.clientX === starting.x && mouseEvent.clientY === starting.y) {
          context.emit("neleftlick", event);
        }
      }
      nodeElement?.removeEventListener("mouseup", mouseUpFunc);
    };
    nodeElement?.addEventListener("mouseup", mouseUpFunc);
  };

  /**
   * 右键点击事件响应方法
   *
   * @param event 鼠标事件
   */
  const onRightDown = (event: MouseEvent): void => {
    const nodeElement = nodePanel.value;
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const mouseUpFunc = (subEvent: Event): void => {
      if (subEvent instanceof MouseEvent) {
        const mouseEvent = subEvent as MouseEvent;
        if (mouseEvent.clientX === starting.x && mouseEvent.clientY === starting.y) {
          context.emit("nerightclick", event);
        }
      }
      nodeElement?.removeEventListener("mouseup", mouseUpFunc);
    };
    nodeElement?.addEventListener("mouseup", mouseUpFunc);
  };

  /**
   * 移动节点事件响应方法
   *
   * @param event 鼠标事件
   */
  const onMoveNodeDown = (event: MouseEvent): void => {
    const panelElement = getPanelElement(nodePanel.value);
    const starting: Point = {
      x: event.clientX,
      y: event.clientY
    };
    const moveFunc = (event: Event): void => {
      if (event instanceof MouseEvent) {
        const mouseEvent = event as MouseEvent;
        nodePanelConf.value.x += mouseEvent.clientX - starting.x;
        nodePanelConf.value.y += mouseEvent.clientY - starting.y;
        starting.x = mouseEvent.clientX;
        starting.y = mouseEvent.clientY;
      }
    };
    const mouseUpFunc = (event: Event): void => {
      if (event instanceof MouseEvent) {
        panelElement?.removeEventListener("mousemove", moveFunc);
        panelElement?.removeEventListener("mouseup", mouseUpFunc);
      }
    };
    panelElement?.addEventListener("mousemove", moveFunc);
    panelElement?.addEventListener("mouseup", mouseUpFunc);
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
          nodePanelConf.value.width += mouseEvent.clientX - starting.x;
          starting.x = mouseEvent.clientX;
        }
        if (nodePanelConf.value.height + mouseEvent.clientY - starting.y >= nodePanelConf.value.minHeight) {
          nodePanelConf.value.height += mouseEvent.clientY - starting.y;
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
    onLeftDown,
    onRightDown,
    onMoveNodeDown,
    onResizeDown
  };
};