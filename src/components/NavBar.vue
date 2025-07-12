<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">🏀 NBA 747 ODDS</a>
    
    <!-- Hamburger Button -->
    <button 
      class="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navigation Links -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/schedule-betting">Schedule/Betting</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/trivia">Trivia</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/quiz">Quiz</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup></script>

<style scoped>
/* Optional custom styles */
</style>