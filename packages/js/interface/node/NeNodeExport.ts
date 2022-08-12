import { Component } from "vue";

export interface NeNodeExport {
  /**
   * 节点名称
   */
  name: string

  /**
   * 节点组件
   */
  node: Component

  /**
   * 节点信息组件
   */
  detail: Component
}
