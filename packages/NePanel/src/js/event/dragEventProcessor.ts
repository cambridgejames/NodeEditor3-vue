import { Ref } from "vue";
import { Configure } from "@/js/interface/node/Configure";
import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";
import { NePanelConfigure } from "@/js/interface/NePanelConfigure";
import { Point } from "@/js/interface/2d/Point";
import Format from "@/NePanel/src/js/format";
import { neNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";

const CONFIGURE_KEY = "configure";
const OFFSET_KEY = "offset";
const DEFAULT_OFFSET = JSON.stringify({ x: 0, y: 0 } as Point);

/**
 * 获取拖拽事件中的数据
 *
 * @param event 拖拽事件
 * @param key 键
 * @param defaultValue 默认值
 * @return 数据
 */
const getOrDefault = (event: DragEvent, key: string, defaultValue: string): string => {
  const value = event.dataTransfer?.getData(key);
  return value === undefined ? defaultValue : value;
};

export const getDragEventProcessor = (nodeDrag: Ref, nePanelConfigure: NePanelConfigure) => {
  /**
   * 拖拽开始事件监听方法
   *
   * @param event 拖拽事件
   * @param itemConfigure 被拖拽的元素信息
   */
  const onDragStart = (event: DragEvent, itemConfigure: Configure): void => {
    if (event.dataTransfer === null) {
      return;
    }
    event.dataTransfer.setData(CONFIGURE_KEY, itemConfigure.name);
    event.dataTransfer.setData(OFFSET_KEY, JSON.stringify({
      x: event.offsetX,
      y: event.offsetY
    } as Point));
    nodeDrag.value.dragging = true;
  };

  /**
   * 拖拽结束事件监听方法
   */
  const onDragEnd = (): void => {
    nodeDrag.value.dragging = false;
  };

  /**
   * 拖拽放置事件监听方法
   *
   * @param event 拖拽事件
   */
  const onDrop = (event: DragEvent): void => {
    if (event.dataTransfer === null) {
      return;
    }
    const nePanelConf = nePanelConfigure.nePanelConf.value;
    const offset = JSON.parse(getOrDefault(event, OFFSET_KEY, DEFAULT_OFFSET)) as Point;
    nePanelConfigure.componentList.value.push(neNodeExportEx({
      name: event.dataTransfer.getData(CONFIGURE_KEY),
      transform: {
        x: Format.formatScale(nePanelConf.x + event.offsetX - offset.x, nePanelConf.scale),
        y: Format.formatScale(nePanelConf.y + event.offsetY - offset.y, nePanelConf.scale)
      }
    } as NePanelInitIntf));
  };

  return {
    onDragStart,
    onDragEnd,
    onDrop
  };
};
