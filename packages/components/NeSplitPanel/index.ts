import { App } from "vue";
import NeSplitPanel from "./src/NeSplitPanel.vue";

NeSplitPanel.install = (app: App): void => {
  app.component(NeSplitPanel.name, NeSplitPanel);
};

export default NeSplitPanel;
