export interface NePanelConf {
  x: number,
  y: number,
  width: number,
  height: number,
  gridDef: {
    largeGridSize: number,
    smallGridSize: number
  },
  scale: {
    value: number,
    minValue: number,
    maxValue: number,
    speed: number
  }
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
