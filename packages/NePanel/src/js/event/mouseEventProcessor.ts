import { NePanelConf, PanelInfo } from "../interface/nePanelIntf";
import { BaseFormatter } from "@/js/browserFormat/baseFormatter";
import { getPanelInfoController } from "@/NePanel/src/js/controller/panelInfoController";
import Format from "@/NePanel/src/js/format";

import { Ref } from "vue";

export const getMouseEventProcessor = (nePanelConf: Ref<NePanelConf>, panelInfo: Ref<PanelInfo>) => {
  const PanelInfoController = getPanelInfoController(panelInfo);
  const scaleConfigure = {
    minValue: 0.01,
    maxValue: 50,
    speed: 0.1
  };

  /**
   * 鼠标滚轮响应方法，对画布进行缩放
   *
   * @param event 鼠标事件
   */
  const onMouseScroll = (event: WheelEvent): void => {
    if (!(event.deltaY > 0 && nePanelConf.value.scale > scaleConfigure.minValue)
      && !(event.deltaY < 0 && nePanelConf.value.scale < scaleConfigure.maxValue)) {
      return;
    }
    const goalScale = Format.formatScaleNumber(nePanelConf.value.scale, event.deltaY > 0);
    const realX = Format.formatScale(nePanelConf.value.x + event.offsetX, nePanelConf.value.scale);
    const realY = Format.formatScale(nePanelConf.value.y + event.offsetY, nePanelConf.value.scale);
    nePanelConf.value.x += realX * (goalScale - nePanelConf.value.scale);
    nePanelConf.value.y += realY * (goalScale - nePanelConf.value.scale);
    nePanelConf.value.scale = goalScale;
    // 重新计算Grid网格
    nePanelConf.value.gridDef = Format.formatGrid(nePanelConf.value.scale);
    // 显示鼠标坐标
    PanelInfoController.showPanelInfo();
  };

  /**
   * 鼠标移动响应方法，当鼠标在面板上移动时触发，显示鼠标当前的世界坐标
   *
   * @param event 鼠标事件
   */
  const onMouseMove = (event: MouseEvent): void => {
    const realEvent = BaseFormatter.formatMouseEvent(event);
    panelInfo.value.mouse.realX = formatScale(nePanelConf.value.x + realEvent.offsetX);
    panelInfo.value.mouse.realY = formatScale(nePanelConf.value.y + realEvent.offsetY);
    // 显示鼠标坐标
    PanelInfoController.showPanelInfo();
  };

  /**
   * 数值转换方法，在缩放坐标的同时保证保证线宽、尺寸等值不变
   *
   * @param number 期望显示出来的尺寸数值
   * @return 元素在svg画布中的宽度
   */
  const formatScale = (number: number): number => {
    return Format.formatScale(number, nePanelConf.value.scale);
  };

  return {
    onMouseScroll,
    onMouseMove
  };
};
