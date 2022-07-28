import { Component, defineAsyncComponent } from "vue";

const COMPONENTS = new Map<string, Component>();

COMPONENTS.set("NeInputNode", defineAsyncComponent(() => import("./input/NeInputNode/index")));

export default COMPONENTS;
