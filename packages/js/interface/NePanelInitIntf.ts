/**
 * NePanel配置入参
 */
interface NePanelInitIntf {
  name: string,
  transform: {
    x: number,
    y: number
  }
}
const NePanelInit = (): NePanelInitIntf => {
  return {} as NePanelInitIntf;
};

export {
  NePanelInit,
  NePanelInitIntf
};
