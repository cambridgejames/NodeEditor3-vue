import { defineComponent, ref, SetupContext } from "vue";
import NeCompSvg from "@/components/NeCompSvg";
import { NeInputPanelIntf } from "@/nodes/input/NeInputNode/src/js/interface/neInputPanelIntf";
import { getMouseEventProcessor } from "@/nodes/input/NeInputNode/src/js/event/mouseEventProcessor";

export default defineComponent({
  name: "NeInputNode",
  components: {
    NeCompSvg
  },
  props: {
    x: {
      type: Number,
      default: 0,
      required: true
    },
    y: {
      type: Number,
      default: 0,
      required: true
    }
  },
  setup(propsData, context: SetupContext) {
    const nodePanel = ref<HTMLElement>();
    const nodePanelConf = ref({
      x: propsData.x,
      y: propsData.y,
      width: 120,
      height: 40,
      minWidth: 120,
      minHeight: 40,
      title: "输入"
    } as NeInputPanelIntf);

    /************************
     *  Imported Functions  *
     ************************/

    const MouseEventProcessor = getMouseEventProcessor(nodePanel, nodePanelConf, context);

    return {
      nodePanel,
      nodePanelConf,
      MouseEventProcessor
    };
  }
});
