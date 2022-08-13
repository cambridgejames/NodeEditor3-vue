import { defineComponent, ref, SetupContext } from "vue";
import { NeInputPanelIntf } from "@/nodes/input/NeInputNode/src/js/interface/neInputPanelIntf";
import NeBaseNode from "@/nodes/base/NeBaseNode";
import Configure from "../configure";

export default defineComponent({
  name: Configure.name,
  components: {
    NeBaseNode
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
  emits: {
    neLeftClick: null,
    neRightClick: null
  },
  setup(propsData, context: SetupContext) {
    const nodePanel = ref<HTMLElement>();
    const nodePanelConf = ref({
      x: propsData.x,
      y: propsData.y,
      title: Configure.title,
      color: Configure.color
    } as NeInputPanelIntf);

    const onNeLeftClick = (event: MouseEvent): void => {
      context.emit("neLeftClick", event);
    };
    const onNeRightClick = (event: MouseEvent): void => {
      context.emit("neRightClick", event);
    };

    return {
      nodePanel,
      nodePanelConf,
      onNeLeftClick,
      onNeRightClick
    };
  }
});
