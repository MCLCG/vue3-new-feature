<template>
  <button @click="changeRefName">修改toRefs的基本数据类型</button>
  <button @click="changeProxyName">修改Proxy的基本数据类型</button>
  <button @click="changeRefContact">修改toRefs的引用数据类型</button>
  <button @click="changeProxyContact">修改Proxy的引用数据类型</button>
  <div>toRefs.name:{{ personToRefs.name }}</div>
  <div>reactive:{{ reactiveReactive.name }}</div>
  <div>toRefs.contact:{{ personToRefs.contact.value.phone }}</div>
  <div>reactive:{{ reactiveReactive.contact.phone }}</div>
</template>

<script setup lang="ts">
import { readonly, isReadonly, reactive, toRefs } from 'vue';

const person = {
  name: '张三',
  age: 18,
  friends: ['lily', 'mike'],
  contact: {
    phone: '123',
    info: {
      name: '李四',
    },
  },
};

const reactiveReactive = reactive(person);
const personToRefs = toRefs(reactiveReactive);

const changeRefName = () => {
  personToRefs.name.value = 'ref张三'; // 会引起数据的双向改变
};
const changeProxyName = () => {
  reactiveReactive.name = 'reactive张三'; // 会引起数据的双向改变
};
const changeRefContact = () => {
  personToRefs.contact.value.phone = 'ref123'; // 会引起数据的双向改变
};
const changeProxyContact = () => {
  reactiveReactive.contact.phone = 'reactive123'; // 会引起数据的双向改变
};
</script>
