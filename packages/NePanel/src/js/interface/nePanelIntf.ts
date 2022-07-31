export interface NePanelConf {
  x: number,
  y: number,
  width: number,
  height: number,
  gridDef: {
    largeGridSize: number,
    smallGridSize: number
  },
  scale: number
}

export interface PanelInfo {
  ready: boolean,
  show: boolean,
  delay: number,
  timer: number,
  mouse: {
    realX: number,
    realY: number
  }
}
