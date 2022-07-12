import { defineComponent, onMounted, ref } from "vue";

import Format from "./format";

export default defineComponent({
  name: "ne-panel",
  directives: {
    resize: {
      mounted(el, bindings) {
        const debounce = (callback: Function): ResizeObserverCallback => {
          return () => {
            callback.apply(this, []);
          };
        };
        el._resizer = new window.ResizeObserver(debounce(bindings.value));
        el._resizer.observe(el);
      },
      unmounted(el) {
        el._resizer.disconnect();
      }
    }
  },
  setup: () => {
    onMounted(() => {
      initPanelSize();
      reCalcGrid();
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
      gridDef: {
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
     * 初始化主面板和Svg画布尺寸
     */
    const initPanelSize = () : void => {
      const nePanelElement = nePanel.value;
      if (nePanelElement === undefined) {
        return;
      }
      nePanelConf.value.x = nePanelElement.offsetWidth / -2;
      nePanelConf.value.y = nePanelElement.offsetHeight / -2;
      nePanelConf.value.width = nePanelElement.offsetWidth;
      nePanelConf.value.height = nePanelElement.offsetHeight;
    };

    /**
     * 判断视图是否处于初始状态
     *
     * @returns {Boolean} 视图是否处于初始状态
     */
    const isInitialState = (): boolean => {
      return nePanelConf.value.scale.value === 1
        && nePanelConf.value.x === nePanelConf.value.width / -2
        && nePanelConf.value.y === nePanelConf.value.height / -2;
    };

    /**
     * 重新计算主面板和Svg画布尺寸
     */
    const reCalcPanelSize = (): void => {
      const nePanelElement = nePanel.value;
      if (nePanelElement === undefined) {
        return;
      }
      nePanelConf.value.x -= (nePanelElement.offsetWidth - nePanelConf.value.width) / 2;
      nePanelConf.value.y -= (nePanelElement.offsetHeight - nePanelConf.value.height) / 2;
      nePanelConf.value.width = nePanelElement.offsetWidth;
      nePanelConf.value.height = nePanelElement.offsetHeight;
    };

    /**
     * 重新计算网格参数
     */
    const reCalcGrid = (): void => {
      nePanelConf.value.gridDef = Format.formatGrid(nePanelConf.value.scale.value);
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
      isInitialState,
      reCalcPanelSize,
      formatScale
    };
  }
});
