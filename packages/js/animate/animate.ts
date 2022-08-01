import { FinishCallback, AnimateType, AnimateElement } from "@/js/animate/animateIntf";

/**
 * 计算线性动画指定进度的值
 *
 * @param element 动画元素
 * @param progress 进度（0~1）
 */
const liner = (element: AnimateElement, progress: number): void => {
  element.onValueChange(element.startValue + (element.endValue - element.startValue) * progress);
};

/**
 * 计算缓入动画指定进度的值
 *
 * @param element 动画元素
 * @param progress 进度（0~1）
 */
const easyIn = (element: AnimateElement, progress: number): void => {
  element.onValueChange((element.endValue - element.startValue) * progress * progress + element.startValue);
};

/**
 * 计算缓出动画指定进度的值
 *
 * @param element 动画元素
 * @param progress 进度（0~1）
 */
const easyOut = (element: AnimateElement, progress: number): void => {
  element.onValueChange((element.startValue - element.endValue) * (progress - 2) * progress + element.startValue);
};

/**
 * 计算缓入缓出动画指定进度的值
 *
 * @param element 动画元素
 * @param progress 进度（0~1）
 */
const easyInEasyOut = (element: AnimateElement, progress: number): void => {
  const half = (element.startValue + element.endValue) / 2;
  const newElement = { ...element } as AnimateElement;
  if (progress < 0.5) {
    newElement.endValue = half;
    easyIn(newElement, progress * 2);
  } else {
    newElement.startValue = half;
    easyOut(newElement, (progress - 0.5) * 2);
  }
};

declare type DoAnimateFunction = (element: AnimateElement, progress: number) => void;
const ANIMATE_TYPE_MAP = new Map<AnimateType, DoAnimateFunction>();
ANIMATE_TYPE_MAP.set(AnimateType.LINER, liner);
ANIMATE_TYPE_MAP.set(AnimateType.EASY_IN, easyIn);
ANIMATE_TYPE_MAP.set(AnimateType.EASY_OUT, easyOut);
ANIMATE_TYPE_MAP.set(AnimateType.EASY_IN_EASY_OUT, easyInEasyOut);

const ANIMATE_LIST = [] as AnimateElement[];
const FRAME_INTERVAL = 13 as number;

let animateTimer = -1 as number;

/**
 * 添加动画
 *
 * @param element 动画元素
 */
const push = (element: AnimateElement): void => {
  if (element.startTime <= 0) {
    element.startTime = new Date().getTime();
  }
  ANIMATE_LIST.push(element);
  if (animateTimer !== -1) {
    return; // 若定时任务正在执行，则不需要新建定时任务
  }
  animateTimer = setInterval(() => {
    execute((error) => {
      if (!error) {
        clearInterval(animateTimer);
        animateTimer = -1;
      }
    });
  }, FRAME_INTERVAL); // 每 FRAME_INTERVAL 毫秒执行一帧
};

/**
 * 执行动画
 *
 * @param timerCleaner 所有动画元素全部执行完毕之后的回调
 */
const execute = (timerCleaner: FinishCallback): void => {
  const realTime = new Date().getTime();
  for (let i = ANIMATE_LIST.length - 1; i >= 0; i--) {
    const item = ANIMATE_LIST[i];
    const progress = (realTime - item.startTime) / item.speed;
    if (progress < 0) {
      continue;
    }
    const animateFunction = ANIMATE_TYPE_MAP.get(item.type);
    if (animateFunction !== undefined && animateFunction !== null) {
      animateFunction(item, Math.min(Math.max(progress, 0), 1));
    }
    if (progress >= 1) {
      item.onValueChange(item.endValue);
      if (item.callback !== undefined && item.callback !== null) {
        item.callback(null);
      }
      ANIMATE_LIST.splice(i, 1);
    }
  }
  if (ANIMATE_LIST.length === 0) {
    timerCleaner(null);
  }
};

export default {
  push
};
