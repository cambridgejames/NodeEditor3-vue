<template>
  <div ref="nePanel" class="ne-panel" @resize="(a, b, c, d) => {console.log(a, b, c, d); console.log(123);}">
    <svg ref="neSvgPanel" class="ne-svg-panel" :width="nePanelConf.width" :height="nePanelConf.height"
       :viewBox="`${formatScale(nePanelConf.x)} ${formatScale(nePanelConf.y)} ${formatScale(nePanelConf.width)} ${formatScale(nePanelConf.height)}`">
      <!--网格和坐标系-->
      <g ref="grid-group" class="grid-group">
        <defs ref="grid-defs" class="grid-defs">
          <pattern id="sm-grid" :width="nePanelConf.def.smallGridSize" :height="nePanelConf.def.smallGridSize" patternUnits="userSpaceOnUse">
            <path :d="`M ${nePanelConf.def.smallGridSize} 0 L 0 0 0 ${nePanelConf.def.smallGridSize}`" :stroke-width="formatScale(0.5)"/>
          </pattern>
          <pattern id="lg-grid" :width="nePanelConf.def.largeGridSize" :height="nePanelConf.def.largeGridSize" patternUnits="userSpaceOnUse">
            <rect :width="nePanelConf.def.largeGridSize" :height="nePanelConf.def.largeGridSize" fill="url(#sm-grid)"/>
            <path :d="`M ${nePanelConf.def.largeGridSize} 0 L 0 0 0 ${nePanelConf.def.largeGridSize}`" :stroke-width="formatScale(1)"/>
          </pattern>
        </defs>
        <rect :x="formatScale(nePanelConf.x)" :y="formatScale(nePanelConf.y)" :width="formatScale(nePanelConf.width)" :height="formatScale(nePanelConf.height)"
              :fill="`url(#lg-grid)`"/>
        <line x1="0" :y1="formatScale(nePanelConf.y)" x2="0" :y2="formatScale(nePanelConf.y + nePanelConf.height)"
              :stroke-width="formatScale(1)" class="coordinate-axis"/>
        <line y1="0" :x1="formatScale(nePanelConf.x)" y2="0" :x2="formatScale(nePanelConf.x + nePanelConf.width)"
              :stroke-width="formatScale(1)" class="coordinate-axis"/>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import NePanelIndex from "./js/index";
export default NePanelIndex;
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
