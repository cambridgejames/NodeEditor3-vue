declare type Callback = (error: Error | null, value: number) => void;
interface AnimateElement {
  startValue: number,
  endValue: number,
  startTime: number,
  speed: number,
  callback: Callback,
  type: string
}

const ANIMATE_LIST = [] as AnimateElement[];
const FRAME_INTERVAL = 13;
let animateTimer = -1;

/**
 * 添加动画
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param speed 持续时间（毫秒）
 * @param callback 回调函数，用于用户自定义更新变量的值
 * @param type 动画执行方式
 */
const push = (startValue: number, endValue: number, speed: number, callback: Callback, type: string = "liner"): void => {
  ANIMATE_LIST.push({
    startValue: startValue,
    endValue: endValue,
    startTime: new Date().getTime(),
    speed: speed,
    callback: callback,
    type: type
  });
  execute();
};

/**
 * 执行动画
 */
const execute = (): void => {
  if (animateTimer !== -1) {
    return; // 若定时任务正在执行，则不需要新建定时任务
  }
  animateTimer = setInterval(() => {
    const realTime = new Date().getTime();
    for (let i = ANIMATE_LIST.length - 1; i >= 0; i--) {
      const item = ANIMATE_LIST[i];
      const progress = (realTime - item.startTime) / item.speed;
      if (progress < 0 || progress > 1) {
        item.callback(null, item.endValue);
        ANIMATE_LIST.splice(i, 1);
        continue;
      }
      doAnimate(item.startValue, item.endValue, progress, item.callback, item.type);
    }
    if (ANIMATE_LIST.length === 0) {
      clearInterval(animateTimer);
      animateTimer = -1;
    }
  }, FRAME_INTERVAL); // 每 FRAME_INTERVAL 毫秒执行一帧
};

/**
 * 根据动画种类执行动画方法
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param progress 进度（0~1）
 * @param callback 回调函数，用于用户自定义更新变量的值
 * @param type 动画执行方式
 */
const doAnimate = (startValue: number, endValue: number, progress: number, callback: Callback, type: string = "liner"): void => {
  const realProgress = Math.min(Math.max(progress, 0), 1);
  switch (type) {
  case "liner":
    liner(startValue, endValue, realProgress, callback);
    break;
  case "easyIn":
    easyIn(startValue, endValue, realProgress, callback);
    break;
  case "easyOut":
    easyOut(startValue, endValue, realProgress, callback);
    break;
  case "easyInEasyOut":
    easyInEasyOut(startValue, endValue, realProgress, callback);
    break;
  default:
    liner(startValue, endValue, realProgress, callback);
  }
};

/**
 * 计算线性动画指定进度的值
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param progress 进度（0~1）
 * @param callback 回调函数，用于用户自定义更新变量的值
 */
const liner = (startValue: number, endValue: number, progress: number, callback: Callback): void => {
  callback(null, startValue + (endValue - startValue) * progress);
};

/**
 * 计算缓入动画指定进度的值
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param progress 进度（0~1）
 * @param callback 回调函数，用于用户自定义更新变量的值
 */
const easyIn = (startValue: number, endValue: number, progress: number, callback: Callback): void => {
  callback(null, (endValue - startValue) * progress * progress + startValue);
};

/**
 * 计算缓出动画指定进度的值
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param progress 进度（0~1）
 * @param callback 回调函数，用于用户自定义更新变量的值
 */
const easyOut = (startValue: number, endValue: number, progress: number, callback: Callback): void => {
  callback(null, (startValue - endValue) * (progress - 2) * progress + startValue);
};

/**
 * 计算缓入缓出动画指定进度的值
 *
 * @param startValue 起始值
 * @param endValue 结束值
 * @param progress 进度（0~1）
 * @param callback 回调函数，用于用户自定义更新变量的值
 */
const easyInEasyOut = (startValue: number, endValue: number, progress: number, callback: Callback): void => {
  const half = (startValue + endValue) / 2;
  if (progress < 0.5) {
    easyIn(startValue, half, progress * 2, callback);
  } else {
    easyOut(half, endValue, (progress - 0.5) * 2, callback);
  }
};

export default {
  push
};
