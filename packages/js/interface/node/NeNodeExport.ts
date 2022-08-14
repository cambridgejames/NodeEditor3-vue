import { Component } from "vue";
import { Configure } from "@/js/interface/node/Configure";

export interface NeNodeExport {
  /**
   * 节点配置信息
   */
  configure: Configure

  /**
   * 节点组件
   */
  node: Component

  /**
   * 节点信息组件
   */
  detail: Component
}
