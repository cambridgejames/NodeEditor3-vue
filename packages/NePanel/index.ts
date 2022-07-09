import { App } from "vue";
import NePanel from "./src/NePanel.vue";

NePanel.install = (app: App): void => {
  app.component(NePanel.name, NePanel);
};

export default NePanel;
