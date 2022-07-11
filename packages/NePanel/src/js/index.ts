import { defineComponent, nextTick, onMounted, onUnmounted, ref } from "vue";

import Format from "./format";

export default defineComponent({
  name: "ne-panel",
  setup: function () {
    onMounted(() => {
      reCalcPanelSize();
      reCalcGrid();
      window.addEventListener("resize", reCalcPanelSize); // TODO: 提供resize方法让用户自己刷新size
    });
    onUnmounted(() => {
      window.removeEventListener("resize", reCalcPanelSize);
    });

    /**
     * Parameters
     */
    const nePanel = ref<HTMLElement>();
    const nePanelConf = ref({
      x: -100,
      y: -100,
      width: 200,
      height: 200,
      def: {
        largeGridSize: 0,
        smallGridSize: 0
      },
      scale: {
        value: 1,
        minValue: 0.02,
        maxValue: 20,
        speed: 0.1
      }
    });

    /*********************
     *  Local Functions  *
     *********************/

    /**
     * 重新计算主面板和Svg画布尺寸
     */
    const reCalcPanelSize = (): void => {
      nextTick((): void => {
        const newWidth = nePanel.value;
        if (newWidth === undefined) {
          return;
        }
        nePanelConf.value.x = -newWidth.offsetWidth / 2;
        nePanelConf.value.y = -newWidth.offsetHeight / 2;
        nePanelConf.value.width = newWidth.offsetWidth;
        nePanelConf.value.height = newWidth.offsetHeight;
      });
    };

    /**
     * 重新计算网格参数
     */
    const reCalcGrid = (): void => {
      nextTick((): void => {
        nePanelConf.value.def = Format.formatGrid(nePanelConf.value.scale.value);
      });
    };

    /**
     * 数值转换方法，在缩放坐标的同时保证保证线宽、尺寸等值不变
     *
     * @param number 期望显示出来的尺寸数值
     * @return 元素在svg画布中的宽度
     */
    const formatScale = (number: number): number => {
      return Format.formatScale(number, nePanelConf.value.scale.value);
    };

    return {
      nePanel,
      nePanelConf,
      formatScale
    };
  }
});
