import { App } from "vue";
import NeEditText from "./src/NeEditText.vue";

NeEditText.install = (app: App): void => {
  app.component(NeEditText.name, NeEditText);
};

export default NeEditText;
