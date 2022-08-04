import { App, Component } from "vue";
import NePanel from "@/NePanel";

const components = [
  NePanel
] as Component[];

const install = (app: App): void => {
  components.map(component => app.component(component.name === undefined ? "Undefined" : component.name, component));
};

export {
  NePanel
};

export default {
  install
};
