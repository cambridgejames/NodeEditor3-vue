import { Component } from "vue";
import { Configure } from "@/js/interface/node/Configure";
import { NeData } from "@/js/interface/node/NeData";

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

  /**
   * 计算方法
   *
   * @param data 入参
   */
  function: <T extends NeData> (data: T | null) => string
}
