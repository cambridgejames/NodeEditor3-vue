import { App, markRaw } from "vue";
import { NeNodeExport } from "@/js/interface/node/NeNodeExport";

import NeInputConfigure from "./src/configure";
import NeInputNode from "./src/NeInputNode.vue";
import NeInputDetail from "./src/NeInputDetail.vue";
import { solution } from "./src/js/solution";

NeInputNode.install = (app: App): void => {
  app.component(NeInputNode.name, NeInputNode);
};
NeInputDetail.install = (app: App): void => {
  app.component(NeInputDetail.name, NeInputDetail);
};

export default {
  configure: NeInputConfigure,
  node: markRaw(NeInputNode),
  detail: markRaw(NeInputDetail),
  function: solution
} as NeNodeExport;
