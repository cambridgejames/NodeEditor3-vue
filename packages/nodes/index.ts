import { NeNodeExport } from "@/js/interface/node/NeNodeExport";

import NeInputNodeExport from "@/nodes/input/NeInputNode";

/**
 * 节点列表，用于展示可选择的节点
 */
export const componentList = new Array<NeNodeExport>();
componentList.push(NeInputNodeExport);

/**
 * 节点Map，用于根据配置生成节点
 */
const COMPONENT_MAP = new Map<string, NeNodeExport>();
for (const exportElement of componentList) {
  COMPONENT_MAP.set(exportElement.configure.name, exportElement);
}
export default COMPONENT_MAP;
