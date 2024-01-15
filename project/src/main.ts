import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// 创建组件的实例
const app = createApp(App);

app.use(createPinia());
app.use(router);

// mount挂载到app节点上,不挂在就不会渲染
app.mount('#app');
