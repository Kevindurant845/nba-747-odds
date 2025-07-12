<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">🏀 NBA 747 ODDS</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/schedule-betting">Schedule/Betting</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/trivia">Trivia</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>