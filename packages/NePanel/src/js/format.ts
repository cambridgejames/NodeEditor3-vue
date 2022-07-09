/**
 * 数值转换方法，在缩放坐标的同时保证保证线宽、尺寸等值不变
 *
 * @param number 期望显示出来的尺寸数值
 * @param scale 转换后的在画布上的实际尺寸
 */
const formatScale = (number: number, scale: number = 1.0): number => {
  return number / scale;
};

export default {
  formatScale
};
