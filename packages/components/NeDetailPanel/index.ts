import { App } from "vue";
import NeDetailPanel from "./src/NeDetailPanel.vue";

NeDetailPanel.install = (app: App): void => {
  app.component(NeDetailPanel.name, NeDetailPanel);
};

export default NeDetailPanel;
