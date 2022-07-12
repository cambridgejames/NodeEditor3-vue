import { NePanelConf, PanelInfo } from "../interface/nePanelIntf";
import { BaseFormatter } from "@/js/browserFormat/baseFormatter";
import { getPanelInfoController } from "@/NePanel/src/js/controller/panelInfoController";
import Format from "@/NePanel/src/js/format";

import { Ref } from "vue";

export const getMouseEventProcessor = (nePanelConf: Ref<NePanelConf>, panelInfo: Ref<PanelInfo>) => {
  const PanelInfoController = getPanelInfoController(panelInfo);

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
    return Format.formatScale(number, nePanelConf.value.scale.value);
  };

  return {
    onMouseMove
  };
};
