<template>
  <div ref="nePanel" class="ne-panel" v-resize="reCalcPanelSize">
    <svg ref="neSvgPanel" class="ne-svg-panel" :width="nePanelConf.width" :height="nePanelConf.height"
         :viewBox="`${formatScale(nePanelConf.x)} ${formatScale(nePanelConf.y)} ${formatScale(nePanelConf.width)} ${formatScale(nePanelConf.height)}`"
         @wheel.prevent="MouseEventProcessor.onMouseScroll"
         @mousemove.prevent="MouseEventProcessor.onMouseMove"
         @mousedown.left.prevent="MouseEventProcessor.onMouseLeftDown"
         @mousedown.right.prevent="MouseEventProcessor.onMouseRightDown"
         @click.left.prevent @click.right.prevent>
      <!--网格和坐标系-->
      <g ref="grid-group" class="grid-group">
        <defs ref="grid-defs" class="grid-defs">
          <pattern id="sm-grid" :width="nePanelConf.gridDef.smallGridSize" :height="nePanelConf.gridDef.smallGridSize" patternUnits="userSpaceOnUse">
            <path :d="`M ${nePanelConf.gridDef.smallGridSize} 0 L 0 0 0 ${nePanelConf.gridDef.smallGridSize}`" :stroke-width="formatScale(0.5)"/>
          </pattern>
          <pattern id="lg-grid" :width="nePanelConf.gridDef.largeGridSize" :height="nePanelConf.gridDef.largeGridSize" patternUnits="userSpaceOnUse">
            <rect :width="nePanelConf.gridDef.largeGridSize" :height="nePanelConf.gridDef.largeGridSize" fill="url(#sm-grid)"/>
            <path :d="`M ${nePanelConf.gridDef.largeGridSize} 0 L 0 0 0 ${nePanelConf.gridDef.largeGridSize}`" :stroke-width="formatScale(1)"/>
          </pattern>
        </defs>
        <rect :x="formatScale(nePanelConf.x)" :y="formatScale(nePanelConf.y)" :width="formatScale(nePanelConf.width)" :height="formatScale(nePanelConf.height)"
              :fill="`url(#lg-grid)`"/>
        <line x1="0" :y1="formatScale(nePanelConf.y)" x2="0" :y2="formatScale(nePanelConf.y + nePanelConf.height)"
              :stroke-width="formatScale(1)" class="coordinate-axis"/>
        <line y1="0" :x1="formatScale(nePanelConf.x)" y2="0" :x2="formatScale(nePanelConf.x + nePanelConf.width)"
              :stroke-width="formatScale(1)" class="coordinate-axis"/>
      </g>
      <g>
        <component v-for="(item, index) in components" :key="index" :is="COMPONENTS.get(item.name)"
                   :class="{'selected':true}" :x="item.transform.x" :y="item.transform.y"
                   @neleftclick.stop.prevent=""
                   @nerightclick.stop.prevent=""/>
      </g>
    </svg>
    <div ref="ne-panel-reset" :class="{'ne-panel-reset':true, 'show':!isInitialState()}" @click="resetScale">
      <ne-comp-svg type="reset" :width="20" :height="20"></ne-comp-svg>
    </div>
    <div ref="ne-panel-info" :class="{'ne-panel-info':true, 'show':panelInfo.show}">
      <p>缩放倍率：{{ Math.ceil(nePanelConf.scale * 100) }}%</p>
      <p>指针坐标：({{ panelInfo.mouse.realX.toFixed(1) }}, {{ panelInfo.mouse.realY.toFixed(1) }})</p>
      <p>画布大小：{{ formatScale(nePanelConf.width).toFixed(0) }} * {{ formatScale(nePanelConf.height).toFixed(0) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import NePanelIndex from "./js/index";
export default NePanelIndex;
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
