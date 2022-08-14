import { App } from "vue";
import NeBaseNode from "./src/NeBaseNode.vue";

NeBaseNode.install = (app: App): void => {
  app.component(NeBaseNode.name, NeBaseNode);
};

export default NeBaseNode;
