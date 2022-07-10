/**
 * 数值转换方法，在缩放坐标的同时保证保证线宽、尺寸等值不变
 *
 * @param number 期望显示出来的尺寸数值
 * @param scale 转换后的在画布上的实际尺寸
 * @return 元素在svg画布中的宽度
 */
const formatScale = (number: number, scale: number = 1.0): number => {
  return number / scale;
};

interface PanelGridDef {
  largeGridSize: number,
  smallGridSize: number
}

/**
 * 根据传入的放大倍数返回合适的格子尺寸
 *
 * @param scaleValue 放大倍数
 */
const formatGrid = (scaleValue: number): PanelGridDef => {
  const solutionMap = [
    [80, 0.5], [8, 5], [0.8, 50], [0.08, 500], [0.008, 5000]
  ];
  for (let i = 1; i < solutionMap.length; i++) {
    if (scaleValue >= solutionMap[i][0]) {
      return {
        largeGridSize: solutionMap[i][1],
        smallGridSize: solutionMap[i - 1][1]
      };
    }
  }
  return {
    largeGridSize: 0,
    smallGridSize: 0
  };
};

export default {
  formatScale,
  formatGrid
};
