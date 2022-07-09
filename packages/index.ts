import { App } from "vue";
import NePanel from "./NePanel";

const components = [
  NePanel
];

const install = (app: App): void => {
  components.map(component => app.component(component.name, component));
};

export {
  NePanel
};

export default {
  install
};
