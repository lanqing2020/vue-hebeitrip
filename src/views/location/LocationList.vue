<script setup>
import { useRoute, useRouter } from "vue-router";
import { useLocationStore } from "@/stores";

const route = useRoute();
const router = useRouter();

console.log("route===>", route.params)
console.log("useLocationStore().locationPartsList===>", useLocationStore().locationPartsList)
</script>

<template>
sadfasf
</template>

<style scoped lang="less">

</style>
