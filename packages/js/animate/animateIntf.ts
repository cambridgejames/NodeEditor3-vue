export declare type OnChangeCallBask = (value: number) => void;
export declare type FinishCallback = (error: Error | null) => void;

/**
 * 动画类型
 */
export enum AnimateType {
  /**
   * 线性
   */
  LINER,

  /**
   * 缓入
   */
  EASY_IN,

  /**
   * 缓出
   */
  EASY_OUT,

  /**
   * 缓入缓出
   */
  EASY_IN_EASY_OUT
}

/**
 * 动画元素
 */
export interface AnimateElement {
  /**
   * 起始值
   */
  startValue: number,

  /**
   * 结束值
   */
  endValue: number,

  /**
   * 起始时间，用于计算进度
   */
  startTime: number,

  /**
   * 动画执行持续时间（毫秒）
   */
  speed: number,

  /**
   * 回调函数，用于用户自定义更新变量的值
   */
  onValueChange: OnChangeCallBask,

  /**
   * 动画类型
   */
  type: AnimateType,

  /**
   * 动画元素执行完成之后的回调函数
   */
  callback: FinishCallback | null
}
