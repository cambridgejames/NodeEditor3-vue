import { createApp } from 'vue'
import App from './App.vue'

import NodeEditor from '../packages';

createApp(App)
    .use(NodeEditor)
    .mount('#app');
