import Format from "./format";
import Animate from "@/js/animate/animate";
import { AnimateType, AnimateElement } from "@/js/animate/animateIntf";

import { getBrowser } from "@/js/browser";
import { getMouseEventProcessor } from "@/NePanel/src/js/event/mouseEventProcessor";
import { getPanelInfoController } from "@/NePanel/src/js/controller/panelInfoController";
import { NePanelInitIntf } from "@/js/interface/NePanelInitIntf";

import { defineComponent, onMounted, PropType, ref } from "vue";

import NeCompSvg from "@/components/NeCompSvg";

import COMPONENTS from "@/nodes";

export default defineComponent({
  name: "ne-panel",
  components: {
    NeCompSvg
  },
  props: {
    init: {
      type: Array as PropType<NePanelInitIntf[]>,
      required: false,
      default: [] as NePanelInitIntf[]
    }
  },
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
  setup: (propsData) => {
    onMounted(() => {
      console.log(getBrowser());
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
      scale: 1
    });
    const panelInfo = ref({
      ready: false,
      show: false,
      delay: 1000,
      timer: -1,
      mouse: {
        realX: 0,
        realY: 0
      }
    });
    const components = ref<NePanelInitIntf[]>(propsData.init);
    const SCALE_ANIMATE_SPEED = 300;

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
      return nePanelConf.value.scale === 1
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
      PanelInfoController.showPanelInfo();
    };

    /**
     * 重置缩放倍率
     */
    const resetScale = (): void => {
      const timeNow = new Date().getTime();
      Animate.push({
        startValue: nePanelConf.value.scale,
        endValue: 1,
        startTime: timeNow,
        speed: SCALE_ANIMATE_SPEED,
        type: AnimateType.EASY_IN_EASY_OUT,
        onValueChange: (value) => { nePanelConf.value.scale = value; reCalcGrid(); },
        callback: null
      } as AnimateElement);

      Animate.push({
        startValue: nePanelConf.value.x,
        endValue: nePanelConf.value.width / -2,
        startTime: timeNow,
        speed: SCALE_ANIMATE_SPEED,
        type: AnimateType.EASY_IN_EASY_OUT,
        onValueChange: (value) => { nePanelConf.value.x = value; },
        callback: null
      } as AnimateElement);

      Animate.push({
        startValue: nePanelConf.value.y,
        endValue: nePanelConf.value.height / -2,
        startTime: timeNow,
        speed: SCALE_ANIMATE_SPEED,
        type: AnimateType.EASY_IN_EASY_OUT,
        onValueChange: (value) => { nePanelConf.value.y = value; },
        callback: null
      } as AnimateElement);
    };

    /**
     * 重新计算网格参数
     */
    const reCalcGrid = (): void => {
      nePanelConf.value.gridDef = Format.formatGrid(nePanelConf.value.scale);
    };

    /**
     * 数值转换方法，在缩放坐标的同时保证保证线宽、尺寸等值不变
     *
     * @param number 期望显示出来的尺寸数值
     * @return 元素在svg画布中的宽度
     */
    const formatScale = (number: number): number => {
      return Format.formatScale(number, nePanelConf.value.scale);
    };

    /************************
     *  Imported Functions  *
     ************************/

    const PanelInfoController = getPanelInfoController(panelInfo);
    const MouseEventProcessor = getMouseEventProcessor(nePanelConf, panelInfo);

    return {
      nePanel,
      nePanelConf,
      panelInfo,
      components,
      COMPONENTS,
      isInitialState,
      reCalcPanelSize,
      resetScale,
      formatScale,
      MouseEventProcessor
    };
  }
});
