<template>
  <div class="mine">
    count:{{ count }}
    <hr />
    <button @click="changReactiveData">personReactive Change</button>
    phone:{{ personReactive.contact.phone }}
    <hr />
    <button @click="changReadonlyData">readonly Change</button>
    phone(readonly):{{ personReadonly.contact.phone }},name:{{
      personReadonlyRefs.name
    }}
    <hr />
    <button @click="changeShallowData">shallow Change</button>
    phone(shallow):{{ personShallowReactive.contact.phone }},name:{{
      personShallowReactive.name
    }},age:{{ personShallowReactive.age }}
    <hr />
    <button @click="changeToRefsData">toRefs Change</button>
    <br />
    phone(toRefs normal):{{ personShallowReactive.contact.phone }},name:{{
      personShallowReactive.name
    }}
    <br />
    phone(toRefs reactive):{{
      personReactiveToRefs.contact.value.phone
    }},name:{{ personReactiveToRefs.name }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  shallowReactive,
  toRef,
  isRef,
  toRefs,
  readonly,
  isReadonly,
  shallowReadonly,
} from 'vue';

import type { Ref } from 'vue';

export default defineComponent({
  // setup相当于beforeCreate,created
  setup() {
    // 可以在setup中创建对应的变量

    // ref就是在vue3中添加响应式的变量
    const count: Ref<number> = ref(2); // ref非常像react中的useRef的用法
    const user = '张三';

    // isRef可以判断这两个变量是不是由ref创建的
    // count是一个RefImpl的一个实例
    console.log('count and user: ', count, user, ref);
    // isRef是通过RefImpl的__v_isRef属性判断的
    console.log('isRef(count)', isRef(count));
    console.log('isRef(user)', isRef(user));
    console.log('-----------');

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
    // 为对象添加响应式的变量
    // reactive包裹的返回的是Proxy返回的实例
    // 就类似于new Proxy()来实现的
    const personReactive = reactive(person);
    console.log('personReactive: ', personReactive);

    // 说明此时想要获取一个属性的话,如果属性值是引用数据类型,那么获取的该属性值依然是一个响应式对象
    // 说明reactive包裹的对象,如果想要访问,不管访问到哪一层,只要是引用数据类型,返回的依然是一个Proxy
    // 如果属性值不是引用类型数据,那么返回的就是基本数据类型
    console.log('personReactive contact: ', personReactive.contact); // 这里输出的也是响应式的对象Proxy(personReactive.contact)
    console.log('personReactive friends: ', personReactive.friends); // 也是proxy
    console.log('personReactive name: ', personReactive.name); // 不是proxy
    console.log('personReactive contact info: ', personReactive.contact.info); // proxy
    const changReactiveData = (e: Event) => {
      personReactive.contact.phone = '456'; // 这里可以修改成功
    };
    console.log('personReactive: ', personReactive);
    console.log('-----------');

    const person1 = {
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
    const personShallowReactive = shallowReactive(person1);
    console.log('Shallow: ', personShallowReactive); // Proxy
    console.log('Shallow contact: ', personShallowReactive.contact); // 不是Proxy
    console.log('Shallow friends: ', personShallowReactive.friends); // 不是Proxy
    console.log('Shallow name: ', personShallowReactive.name); // 不是Proxy
    console.log('Shallow contact info: ', personShallowReactive.contact.info); // 不是Proxy
    const changeShallowData = (e: Event) => {
      //   console.log(e);
      personShallowReactive.name = '李四'; // 触发视图的更新
      //   personShallowReactive.age++;
      //   personShallowReactive.contact.phone = '456'; // 不是响应式的,但是数据已经改变了,如果加上上面两个的任意属性修改,那么这个值就会更新
      console.log(personShallowReactive, person1);
    };
    console.log('-----------');

    const person2 = {
      name: '张三',
      age: 18,
      friends: ['lily', 'mike'],
      contact: {
        phone: '123',
      },
    };
    const personReadonly = readonly(person2);
    console.log('readonly: ', personReadonly);
    // personReadonly.age = 200; // 不能修改,修改了并不会成功
    console.log('change readonly: ', personReadonly);
    const personReadonlyRefs = toRefs(personReadonly);
    console.log('refs: ', personReadonlyRefs);
    const changReadonlyData = () => {
      personReadonlyRefs.name.value = '李四'; // 视图修改不成功,这是一个只读的属性,在数据上也不会修改成功
      console.log('refs: ', personReadonlyRefs);
    };
    console.log('-----------');

    const person3 = {
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
    // 将一个响应式对象转换为一个普通对象，
    // 如果转换一个普通对象也可以转,只不过会提示警告
    // 这个普通对象的每个属性都是指向源对象相应属性的 ref。
    // 每个单独的 ref 都是使用 toRef() 创建的。
    // const personToRefs = toRefs(person3);// 会报警告
    const personNormalToRefs = toRefs(person3);
    console.log('personToRefs', personNormalToRefs);
    console.log('personToRefs contact: ', personNormalToRefs.contact);
    console.log(
      'personToRefs contact info: ',
      personNormalToRefs.contact.value,
      isRef(personNormalToRefs.contact.value.info)
    );
    const personReactiveToRefs = toRefs(personReactive);
    const changeToRefsData = () => {
      personNormalToRefs.name.value = '张三三'; // 不会影响响应式变化
      personReactiveToRefs.name.value = '张三三三'; // 会影响响应式变化

      personNormalToRefs.contact.value.phone = '456';
      personReactiveToRefs.contact.value.phone = '456'; // 可以修改成功
    };

    return {
      count,
      personReactive,
      personShallowReactive,
      personReadonly,
      personReadonlyRefs,
      personNormalToRefs,
      personReactiveToRefs,
      changeShallowData,
      changReactiveData,
      changReadonlyData,
      changeToRefsData,
    };
  },
});
</script>
