import { App } from "vue";
import NeEditBase from "./src/NeEditBase.vue";

NeEditBase.install = (app: App): void => {
  app.component(NeEditBase.name, NeEditBase);
};

export default NeEditBase;
