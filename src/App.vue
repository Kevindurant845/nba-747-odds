<template>
  <NavBar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script setup> import NavBar from './components/NavBar.vue'
</script>

<style scoped>
.container {
  background-color: #1e1e1e;
  color: whitesmoke;
  border-radius: 25px;
  padding: 1cqmax;
}
</style>