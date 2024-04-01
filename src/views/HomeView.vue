<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import instance from "@/request/index.js";
instance({
  method: "get",
  url: "http://127.0.0.1:8081/api/v1/pub/video/list_banner",
  data: {

  }
})



</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
