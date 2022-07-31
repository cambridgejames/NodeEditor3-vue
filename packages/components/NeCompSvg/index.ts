import { App } from "vue";
import NePanel from "./src/NeCompSvg.vue";

NePanel.install = (app: App): void => {
  app.component(NePanel.name, NePanel);
};

export default NePanel;
