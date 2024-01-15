<template>
  <div id="box" ref="domRef">
    <h1>Box</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getAllInfo } from '@/api/index';
export default defineComponent({
  setup() {
    const domRef = ref(null);
    // 在这里获取不到dom
    const dom1 = document.querySelector('#box');

    // 在setup里面写就要使用钩子
    onMounted(async () => {
      const dom = document.querySelector('#box');
      // 下面两种方式都可以获取dom
      console.log('domRef.value', domRef.value);
      console.log('dom', dom);
      console.log('dom1', dom1);

      const res = await getAllInfo();
      console.log('res', res);
    });

    return {
      domRef,
    };
  },
  // 这两种写法都是一样的
  // 在setup外面写就是和vue2一样
  mounted() {},
});
</script>

<!-- <script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {});
</script> -->
