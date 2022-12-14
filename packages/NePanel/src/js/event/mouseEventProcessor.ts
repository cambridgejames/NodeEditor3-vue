import { NePanelConf, PanelInfo } from "../interface/nePanelIntf";
import { getPanelInfoController } from "@/NePanel/src/js/controller/panelInfoController";
import Format from "@/NePanel/src/js/format";

import { NePanelConfigure } from "@/js/interface/NePanelConfigure";
import { Point } from "@/js/interface/2d/Point";
import { getNodeController } from "@/NePanel/src/js/controller/nodeController";
import { ConfigCallback, EventCallback, onMouseDown } from "@/js/event/eventProcesssor";

const scaleConfigure = {
  minValue: 0.01,
  maxValue: 50,
  speed: 0.1
};

/**
 * 鼠标滚轮响应方法，对画布进行缩放
 *
 * @param event 鼠标事件
 * @param nePanelConf 面板属性
 */
const onMouseScrollFunc = (event: WheelEvent, nePanelConf: NePanelConf): void => {
  if (!(event.deltaY > 0 && nePanelConf.scale > scaleConfigure.minValue)
    && !(event.deltaY < 0 && nePanelConf.scale < scaleConfigure.maxValue)) {
    return;
  }
  const goalScale = Format.formatScaleNumber(nePanelConf.scale, event.deltaY > 0);
  const realX = Format.formatScale(nePanelConf.x + event.offsetX, nePanelConf.scale);
  const realY = Format.formatScale(nePanelConf.y + event.offsetY, nePanelConf.scale);
  nePanelConf.x += realX * (goalScale - nePanelConf.scale);
  nePanelConf.y += realY * (goalScale - nePanelConf.scale);
  nePanelConf.scale = goalScale;
  // 重新计算Grid网格
  nePanelConf.gridDef = Format.formatGrid(nePanelConf.scale);
};

/**
 * 鼠标左键拖拽事件响应方法
 *
 * @param event 鼠标事件
 * @param starting 拖拽的起始坐标
 * @param nePanelConf 面板属性
 */
const onMouseLeftDrag = (event: MouseEvent, starting: Point, nePanelConf: NePanelConf): void => {
  console.log("onMouseLeftFrag", event); // TODO: 鼠标左键拖拽事件
};

/**
 * 鼠标右键单击事件响应方法
 *
 * @param event 鼠标事件
 */
const onMouseRightClick = (event: MouseEvent): void => {
  console.log("onMouseRightClick", event); // TODO: 鼠标右键单击事件
};

/**
 * 鼠标右键拖拽事件响应方法
 *
 * @param event 鼠标事件
 * @param starting 拖拽的起始坐标
 * @param nePanelConf 面板属性
 */
const onMouseRightDrag = (event: MouseEvent, starting: Point, nePanelConf: NePanelConf): void => {
  nePanelConf.x -= event.clientX - starting.x;
  nePanelConf.y -= event.clientY - starting.y;
  starting.x = event.clientX;
  starting.y = event.clientY;
};

/**
 * 鼠标移动响应方法，当鼠标在面板上移动时触发，显示鼠标当前的世界坐标
 *
 * @param event 鼠标事件
 * @param nePanelConf 面板属性
 * @param panelInfo 面板信息
 */
const onMouseMoveFunc = (event: MouseEvent, nePanelConf: NePanelConf, panelInfo: PanelInfo): void => {
  panelInfo.mouse.realX = Format.formatScale(nePanelConf.x + event.offsetX, nePanelConf.scale);
  panelInfo.mouse.realY = Format.formatScale(nePanelConf.y + event.offsetY, nePanelConf.scale);
};

/*********************
 ** Getter Function **
 *********************/

/**
 * 鼠标事件响应方法
 *
 * @param nePanelConfigure 面板的全部信息
 */
export const getMouseEventProcessor = (nePanelConfigure: NePanelConfigure) => {
  const PanelInfoController = getPanelInfoController(nePanelConfigure.panelInfo);
  const NodeController = getNodeController(nePanelConfigure);

  /**
   * 鼠标滚轮响应方法，对画布进行缩放
   *
   * @param event 鼠标事件
   */
  const onMouseScroll = (event: WheelEvent): void => {
    onMouseScrollFunc(event, nePanelConfigure.nePanelConf.value);
    PanelInfoController.showPanelInfo(); // 显示鼠标坐标
  };

  /**
   * 鼠标左键事件响应方法
   *
   * @param event
   */
  const onMouseLeftDown = (event: MouseEvent): void => {
    const onDragFunc: EventCallback = (event: MouseEvent, startPoint: Point): void =>
      onMouseLeftDrag(event, startPoint, nePanelConfigure.nePanelConf.value);
    const onClickFunc: EventCallback = (): void => NodeController.resetSelectedStatus();
    onMouseDown(event, null, onDragFunc, onClickFunc, null);
  };

  /**
   * 鼠标右键事件响应方法
   *
   * @param event
   */
  const onMouseRightDown = (event: MouseEvent): void => {
    const panelElement = nePanelConfigure.nePanel.value;
    const onDragFunc: EventCallback = (event: MouseEvent, startPoint: Point): void => {
      panelElement.style.cursor = "grab";
      onMouseRightDrag(event, startPoint, nePanelConfigure.nePanelConf.value);
    };
    const onClickFunc: EventCallback = (event: MouseEvent): void => onMouseRightClick(event);
    const onClearFunc: ConfigCallback = (): void => {
      panelElement.style.cursor = "inherit";
    };
    onMouseDown(event, null, onDragFunc, onClickFunc, onClearFunc);
  };

  /**
   * 鼠标移动响应方法，当鼠标在面板上移动时触发，显示鼠标当前的世界坐标
   *
   * @param event 鼠标事件
   */
  const onMouseMove = (event: MouseEvent): void => {
    onMouseMoveFunc(event, nePanelConfigure.nePanelConf.value, nePanelConfigure.panelInfo.value);
    PanelInfoController.showPanelInfo(); // 显示鼠标坐标
  };

  return {
    onMouseScroll,
    onMouseLeftDown,
    onMouseRightDown,
    onMouseMove
  };
};
