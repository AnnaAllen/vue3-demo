<template>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home |</router-link>
    <router-link to="/login">Go to Login |</router-link>
    <router-link to="/about">Go to About |</router-link>
    <router-link to="/test">Go to test |</router-link>
    <router-link to="/use-vue">use-vue |</router-link>
    <router-link to="/keep-alive">keep-alive |</router-link>
    <!-- 组件间传值 -->
    <router-link to="/provide-inject">provide-inject |</router-link>
    <!-- 自定义指令 -->
    <router-link to="/custom-directives">custom-directives |</router-link>
    <!-- 自定义hooks -->
    <router-link to="/use-hook">use-hook |</router-link>
    <!-- 手动滚动 -->
    <router-link to="/scroll-bar">scroll-bar |</router-link>
    <!-- 简单状态管理 -->
    <router-link to="/simple-state">simple-state |</router-link>
    <!-- 主题切换 -->
    <router-link to="/theme-change">theme-change |</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>
