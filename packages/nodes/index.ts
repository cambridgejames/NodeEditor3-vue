import { NeNodeExport } from "@/js/interface/node/NeNodeExport";

import NeInputNodeExport from "@/nodes/input/NeInputNode";

const componentList = new Array<NeNodeExport>();
componentList.push(NeInputNodeExport);

const COMPONENT_MAP = new Map<string, NeNodeExport>();
for (const exportElement of componentList) {
  COMPONENT_MAP.set(exportElement.name, exportElement);
}
export default COMPONENT_MAP;
