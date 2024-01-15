<template>
  <div>
    {{ count }}
  </div>
  <button @click="addCount">+1</button>
  <hr />
  {{ name }}
  <button @click="changeName">changeName</button>
</template>

<script lang="ts">
export default {
  data() {
    return {
      count: 1,
      name: '张三',
    };
  },
  methods: {
    addCount() {
      this.count += 1;
    },
    changeName() {
      this.name = '李四';
    },
  },
  // 1.初始化 此时data不可用
  beforeCreate() {
    console.log('beforeCreate');
  },

  // data可用,但是DOM不可用
  created() {
    console.log('created');
  },

  beforeMount() {
    console.log('beforeMount');
  },
  // 他是用来追踪VDOM,会在VDOM渲染的时候调用,包括初次渲染和更新阶段的时候
  // 初次渲染的时候是在beforeMount和mounted之间去执行的
  // data有两个状态,并且在模版里面两个属性都调用了这个方法就会执行两次,两次的type都是get操作
  // 这个钩子更多的是性能追踪去使用的,就是告诉你此时应该监听什么,像data里面的两个属性都会添加响应式
  // 也就是针对什么变量添加响应式的操作
  renderTracked({ key, target, type }) {
    console.log('renderTracked', key, target, type);
  },
  mounted() {
    console.log('mounted');
  },

  // 2.update
  // 数据变更的时候触发
  // 这个方法就是获取Proxy中的handler触发的一些信息(get,set,has...),告诉我们当前的响应式的操作是什么
  // 如果set的只是一个属性那么下面这个只会执行一次,渲染的时候renderTracked,因为data两个的两个属性都在模版语言里面
  renderTriggered({ key, target, type }) {
    // type是set的操作
    console.log('renderTriggered', key, target, type);
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  // 虚拟DOM修改的时候也会触发
  //   renderTracked({ key, target, type }) {
  //     console.log('renderTracked', key, target, type);
  //   },
  updated() {
    console.log('updated');
  },

  // 3.卸载
  beforeUnmount() {
    console.log('beforeDestroy');
  },
  unmounted() {
    console.log('unmounted');
  },
};
</script>
