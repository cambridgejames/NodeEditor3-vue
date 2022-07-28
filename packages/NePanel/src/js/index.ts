import Format from "./format";
import { getBrowser } from "@/js/browser";
import { getMouseEventProcessor } from "@/NePanel/src/js/event/mouseEventProcessor";
import { getPanelInfoController } from "@/NePanel/src/js/controller/panelInfoController";
import { NePanelInitIntf } from "@/js/interface/neNodeIntf";

import { defineComponent, onMounted, PropType, ref } from "vue";

import NeInputNode from "../../../nodes/input/NeInputNode";

import COMPONENTS from "@/nodes";

export default defineComponent({
  name: "ne-panel",
  components: {
    NeInputNode
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
      scale: {
        value: 1,
        minValue: 0.02,
        maxValue: 20,
        speed: 0.1
      }
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
      PanelInfoController.showPanelInfo();
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
      formatScale,
      MouseEventProcessor
    };
  }
});
