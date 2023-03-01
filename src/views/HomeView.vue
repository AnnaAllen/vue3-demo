<template>
  <div>{{ Man }}</div>
  <div>{{ Man2 }}</div>
  <button @click="change">修改</button>
  <br>
  -------------
  <form>
    <input v-model="form.name" type="text">
    <br>
    <input v-model="form.age" type="number">
    <br>
    <button @click.prevent="submit">提交</button>
  </form>
  <br>
  -------------
  <div>{{ testToRef }}</div>
  <div>toRef:{{ name }}</div>
  <button @click="changeSecond">修改</button>
  <br>
  -------------
  <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>数量</th>
        <th>单价</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(item, index) in tool">
        <td align="center">{{ item.name }}</td>
        <td align="center">
          <button @click="computedNum(item, true)">+</button>
          {{ item.num }}
          <button @click="computedNum(item, false)">-</button>
        </td>
        <td align="center">{{ item.price }}</td>
        <td align="center"><button @click="del(index)">删除</button></td>
      </tr>
    </tbody>
    <tfoot>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>总价：{{ $total }}</td>
    </tfoot>
  </table>
  -------------
  <form>
    <input v-model="msg.foo.bar.name" type="text">
    <br>
    <input v-model="msg.foo.bar.age" type="number">
    <br>
  </form>
  -------------
  <Suspense>
    <HelloWorld :msg="'1'" />
    <template #fallback>
      <skeleton ></skeleton>
    </template>
  </Suspense>
  -------------
  <div class="teleport-test"></div>
  <div class="teleport-test"></div>
  <div class="outer">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <MyModal />
    </div>
  </div>

</template>

<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import  HelloWorld from '@/components/HelloWorld.vue'
import  skeleton from '@/components/skeleton.vue'
import  MyModal from '@/components/MyModal.vue'

import {ref, isRef, shallowRef, triggerRef, reactive, shallowReactive, readonly, toRef, toRefs, toRaw, computed, watch, watchEffect} from 'vue'


/* 
 * ref, isRef, shallowRef, triggerRef
 -----------------------------------
 * 所有被ref包裹的对象才是响应式的
 * isRef() 可以判断一个对象是不是响应式
 * shallowRef 为浅层响应式，只能影响到value层级，无法影响value的值
 * ! ref和shallowRef不能一起使用，否则ref会将整个对象置为响应式，shallowRef将失去浅层响应的含义
 * triggerRef() 用于响应被shallowRef()包裹的值
*/
const Man = ref({name: '小满'})
const Man2 = shallowRef({name: '满2'})

const change = () => {
  Man.value.name = '打满'
  Man2.value.name = '本来是无法被影响的，但是加了triggerRef后变成响应式'
  triggerRef(Man2)
  console.log(Man2);
  console.log(isRef(Man2));
}

/*
 * reactive, shallowReactive, readonly
 ---------------------------------------
 * reactive与ref不同，只支持引用类型（array, object, map, set）, ref支持所有类型
 * ref的取值都需要加上.value前缀，reactive不需要前缀可以直接把值点出来
 * reactive 是一种proxy不能直接赋值，否则会破坏响应式对象
 * 数组可以使用push和解构进行赋值
 * shallowReactive是引用类型的浅层响应（只会对第一层有作用）
 * readonly() 把对象转为只读，但是会受到原始对象的影响。只读对象指向的原始对象修改了，只读对象也会修改
*/

let form = reactive({
  name: 'Anna',
  age: 23
})

const submit = () => {
  console.log(form, 'form-----');
  
}

/* 
 * toRef toRefs toRaw
 ----------------------------
 * toRef可以从对象中结构一个值出来
 * toRef只能影响响应式对象，对非响应式对象无效
 * toRefs() 用于把对象中的每一个值都变成ref类型
 * ! 当使用reactive操作时，使用toRef结构对象，才能时结构的值为响应式，否则无法进行视图更新
 * toRaw用于把响应式*对象*转为普通对象
 */

const testToRef = reactive({
  name: 'Anna',
  age: 23
})

const name = toRef(testToRef, 'name') // "Anna"

const { age } = toRefs(testToRef)

const changeSecond = () => {
  name.value = 'Lili'
  console.log(name, 'name-----');
  console.log(age, 'age-------');
  console.log(toRaw(testToRef), 'toRaw-----');
  
}


/*
 * computed 计算属性
 -----------------------
*/

type Shop = {
  name: string,
  num: number,
  price: number
}

let $total = ref(0)
const tool = reactive<Shop[]>([
  {
    name: '衣服',
    num: 1,
    price: 10
  },
  {
    name: '裤衩',
    num: 2,
    price: 20
  },
  {
    name: '鞋子',
    num: 3,
    price: 30
  }
])
const computedNum = (item:Shop, bool:Boolean):void => {
  if(item.num < 99 && bool) {
    item.num ++
  }
  if(item.num > 0 && !bool) {
    item.num --
  }
}
const del = (index: number):void => {
  tool.splice(index, 1)
}

$total = computed<number>(() => {
  return tool.reduce((prev, next) => {
    return prev + (next.num * next.price)
  }, 0)
})

/*
 * watch
 ---------------
 * 只有响应式数据才能被watch监听到
 * watch( [监听源], (newVal, oldVal) => {}, { option })
 * 监听深度嵌套对象中的一个值时，需要使用函数return来保持其响应式
 * reactive会默认开启深监听, ref不会
*/

let msg = reactive({
  foo: {
    bar: {
      name: 'Anna',
      age: 18
    }
  }
})

watch(() => msg.foo.bar.name, (newVal, oldVal) => {
  console.log(newVal, oldVal);
}, {
  // deep: true ,
  // immediate: true
  // flush: 'pre' // 执行顺序，pre：组件更新前调用；sync：同步执行；post：组件更新后执行
})



</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
