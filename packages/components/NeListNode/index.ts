import { App } from "vue";
import NeListNode from "./src/NeListNode.vue";

NeListNode.install = (app: App): void => {
  app.component(NeListNode.name, NeListNode);
};

export default NeListNode;
