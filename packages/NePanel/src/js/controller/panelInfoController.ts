import { PanelInfo } from "@/NePanel/src/js/interface/nePanelIntf";

import { Ref } from "vue";

export const getPanelInfoController = (panelInfo: Ref<PanelInfo>) => {
  /**
   * 显示右上角的组件信息
   */
  const showPanelInfo = (): void => {
    panelInfo.value.show = true;
    if (panelInfo.value.timer !== -1) {
      clearTimeout(panelInfo.value.timer);
      panelInfo.value.timer = -1;
    }
    panelInfo.value.timer = setTimeout(function () {
      panelInfo.value.show = false;
    }, panelInfo.value.delay);
  };

  return {
    showPanelInfo
  };
};
