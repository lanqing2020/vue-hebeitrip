<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Index from "@/views/Index.vue";

</script>

<template>
  <header>

  </header>
  <main class="wrapper">
<!--    <Index />-->
  </main>
  <footer>
    <nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/order">我的订单</RouterLink>
      <RouterLink to="/user">个人中心</RouterLink>
    </nav>
  </footer>
  <RouterView />
</template>

<style scoped lang="less">
header {
  font-size: 20px;
  line-height: 1.5;
  max-height: 100vh;
}
.main {

}
.footer {
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
}
</style>
