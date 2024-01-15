<template>
  <div id="box" ref="domRef">
    <h1>Box</h1>
    <button @click="changeCount">changeCount</button>
    <div>{{ count }}</div>

    <h2>{{ name }}</h2>
    <h2>{{ normalData }}</h2>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue';

const instance = defineComponent({
  // 在 Vue.js 3 的 setup 函数中，确实没有 this 关键字了，
  // 因为 setup 是在组件初始化阶段运行的，
  // 此时组件实例还没被创建，因此也就不存在 this 对象了。
  // 通过传入的这个对象参数就可以构建这个实例
  setup() {
    const normalData = 18;
    const domRef = ref(null);
    const count = ref(0);
    console.log('setup');

    const changeCount = () => {
      count.value += 1;
    };

    onBeforeMount(() => {
      const dom = document.querySelector('#box');
      console.log('onBeforeMount', dom, domRef.value);
    });
    onRenderTracked(({ target, type, key, newValue, oldValue, oldTarget }) => {
      const dom = document.querySelector('#box');
      console.log('onRenderTracked', dom, domRef);
    }); // 在onMounted之前document不可以用
    onMounted(() => {
      const dom = document.querySelector('#box');
      const instance = getCurrentInstance();
      console.log('onMounted', dom, domRef, instance);
    });

    onBeforeUpdate(() => {});
    onRenderTriggered(
      ({ target, type, key, newValue, oldValue, oldTarget }) => {}
    );
    onUpdated(() => {});

    onBeforeUnmount(() => {});
    onUnmounted(() => {}); // other lifecycle

    onErrorCaptured(() => {});
    onActivated(() => {});
    onDeactivated(() => {});
    onServerPrefetch(() => {});

    return {
      domRef,
      normalData,
      count,
      changeCount,
    };
  },

  data() {
    return {
      name: '张三',
    };
  },
  // 初始化 此时data不可用
  beforeCreate() {
    const dom = document.querySelector('#box');
    console.log('beforeCreate', dom, this.$data); // null,{}
  },
  // data可用,但是DOM不可用
  created() {
    const dom = document.querySelector('#box');
    console.log('created', dom, this.$data); // null,data可以访问
  },

  // data可用,但是DOM不可用
  beforeMount() {
    const dom = document.querySelector('#box');
    console.log('beforeMount', dom, this.$data);
  },

  // data可用,但是DOM不可用
  renderTracked({ target, type, key, newValue, oldValue, oldTarget }) {
    const dom = document.querySelector('#box');
    console.log('renderTracked', dom, this.$data);
  },
  // 和onMounted一样,可以在这里获取到dom,还有data
  mounted() {
    const dom = document.querySelector('#box');
    // 此时this上挂载了所有的setup返回的数据
    console.log('mounted', this, dom, this.$data, this.domRef);
  },

  beforeUpdate() {},
  renderTriggered({ target, type, key, newValue, oldValue, oldTarget }) {},
  updated() {},

  beforeUnmount() {},
  unmounted() {},

  // other life
  errorCaptured() {},
  activated() {},
  deactivated() {},
  serverPrefetch() {},
});

export default instance;
</script>
