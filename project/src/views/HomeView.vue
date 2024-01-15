<template>
  <!-- <Composition /> -->
  <!-- <Demo /> -->
  <!-- <LifeCycle /> -->
  <!-- <Vue2LifeCycle /> -->
  <OptionLiftCycle />
  <!-- <AsyncComponent /> -->
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import Composition from '@/components/Composition.vue';
import Demo from '@/components/Demo.vue';
import LifeCycle from '@/components/LifeCycle.vue';
import Vue2LifeCycle from '@/components/Vue2LifeCycle.vue';
import OptionLiftCycle from '@/components/OptionLiftCycle.vue';

// 定义异步组件
// defineAsyncComponent异步组件在build过后会单独生成一个js文件
// 那为什么会单独对这个文件生成js文件呢
// 因为做的是组件的动态引入,动态引入的意思就是,之后去用/额外去用,而是在需要的时候才引入
// 所以就不会和index-NHz2qNQu.js打包在一起
// 使用场景:例如在ErrorBounding组件中就可以使用两个组件,
// 业务主组件使用异步组件,在主组件还没有加载完成的时候就显示Loading组件
// 和react中lazy,Suspence很像
/**
 * const LazyComponent = React.lazy(()=>import('./LazyComponent.tsx'))
 *
 * App.tsx
 *
 * function App(){
 *  return <div>
 *         <Suspence fallback={<Loading />}>
 *               // 这里面就是业务主组件
 *               <LazyComponent />
 *         </Suspence>
 *  </div>
 * }
 *
 */
const AsyncComponent = defineAsyncComponent(
  () => import('@/components/AsyncComponent.vue')
);
console.log(AsyncComponent);
</script>
