import { App } from "vue";
import NeInputNode from "./src/NeInputNode.vue";

NeInputNode.install = (app: App): void => {
  app.component(NeInputNode.name, NeInputNode);
};

export default NeInputNode;
