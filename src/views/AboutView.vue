<template>
  <div class="about-page">
    <h2 class="mb-4 text-center text-warning">Meet the Team</h2>

    <!-- Member Card -->
    <div class="card mb-3 d-flex flex-row align-items-center hover-card">
      <img src="../assets/Benny.jpg" alt="Profile Picture" class="img-fluid rounded-start" style="width: 100px; height: 100px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title text-white">Benedict Dayao</h5>
        <p class="card-text text-white">Gambler by night, latecomer by day. This legend always SHINE in the moment.</p>
      </div>
    </div>

    <!-- Member Card -->
    <div class="card mb-3 d-flex flex-row align-items-center hover-card">
      <img src="../assets/Jp.jpg" alt="Profile Picture" class="img-fluid rounded-start" style="width: 100px; height: 100px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title text-white">John Paul Balangue</h5>
        <p class="card-text text-white">The mountain-man, allegedly into substances, but a Python certified prodigy.</p>
      </div>
    </div>

    <!-- Member Card -->
    <div class="card mb-3 d-flex flex-row align-items-center hover-card">
      <img src="../assets/Zian.jpg" alt="Profile Picture" class="img-fluid rounded-start" style="width: 100px; height: 100px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title text-white">Zian Tabor</h5>
        <p class="card-text text-white">I want tall woman</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-page {
  max-width: 900px;
  margin: auto;
}

.hover-card {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: #2d2d2d;
  border: none;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
</style>