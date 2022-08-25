/**
 * NePanel配置入参
 */
import { Point } from "@/js/interface/2d/Point";

export interface NePanelInitIntf {
  /**
   * 节点Id
   */
  nid: string

  /**
   * 节点类型
   */
  name: string

  /**
   * 节点坐标（左上角）
   */
  transform: Point

  /**
   * 数据原始信息
   */
  data: string
}
