<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { home } from '@/apis'

home.lllll().then(() => {

})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
