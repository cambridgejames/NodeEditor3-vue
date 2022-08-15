import { Component, Ref } from "vue";
import { NePanelConf, PanelInfo } from "@/NePanel/src/js/interface/nePanelIntf";
import { NeNodeExportEx } from "@/NePanel/src/js/interface/NeNodeExportEx";

/**
 * 面板相关的变量
 */
export interface NePanelConfigure {
  /**
   * 面板对象
   */
  nePanel: Ref<HTMLElement>

  /**
   * 面板配置信息
   */
  nePanelConf: Ref<NePanelConf>

  /**
   * 实时信息
   */
  panelInfo: Ref<PanelInfo>

  /**
   * 节点列表
   */
  componentList: Ref<NeNodeExportEx[]>

  /**
   * 节点详细信息
   */
  rightElement: Ref<Component | undefined>
}
