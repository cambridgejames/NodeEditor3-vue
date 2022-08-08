import { Ref } from "vue";
import { NePanelConf, PanelInfo } from "@/NePanel/src/js/interface/nePanelIntf";

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
}
