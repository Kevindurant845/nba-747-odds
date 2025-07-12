<template>
  <div class="homepage">

    <!-- Hero Section -->
    <section class="hero-section d-flex align-items-center justify-content-center text-white text-center">
      <div class="overlay"></div>
      <div class="content position-relative z-1">
        <h1 class="display-4 fw-bold">Welcome to NBA747</h1>
        <p class="lead mb-4">Your one-stop shop for NBA odds, schedules, trivia, and more!</p>
        <router-link to="/schedule-betting" class="btn btn-warning btn-lg">Check Today's Odds</router-link>
      </div>

      <!-- Video Background -->
      <video autoplay muted loop playsinline class="background-video">
        <source src="../assets/home.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </section>

    <!-- Quick Access Buttons -->
    <section class="quick-access py-5 bg-dark text-white">
      <div class="container text-center">
        <h2 class="mb-4">Explore NBA747</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-md-3">
            <div class="card bg-secondary p-4 shadow-sm h-100">
              <i class="bi bi-calendar-event display-4 mb-3"></i>
              <h5>Game Schedule</h5>
              <p>See upcoming NBA games and summer league matchups.</p>
              <router-link to="/schedule" class="btn btn-outline-light mt-auto">View Schedule</router-link>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-secondary p-4 shadow-sm h-100">
              <i class="bi bi-currency-dollar display-4 mb-3"></i>
              <h5>Betting Odds</h5>
              <p>Check today’s latest NBA odds and make your bets.</p>
              <router-link to="/schedule-betting" class="btn btn-outline-light mt-auto">View Odds</router-link>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-secondary p-4 shadow-sm h-100">
              <i class="bi bi-question-circle display-4 mb-3"></i>
              <h5>NBA Trivia</h5>
              <p>Test your NBA knowledge with fun quizzes and facts.</p>
              <router-link to="/trivia" class="btn btn-outline-light mt-auto">Play Quiz</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News/Updates Section -->
    <section class="news-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Latest NBA Highlights</h2>
        <div class="row g-4">
          <div class="col-md-6" v-for="n in 1" :key="n">
            <div class="card h-100 shadow-sm border-0">
              <img src="../assets/highlight1.webp" class="card-img-top" alt="Highlight Image">
              <div class="card-body">
                <h5 class="card-title">Game Recap: Thunder vs Pacers</h5>
                <p class="card-text">Indiana got whatever it wanted against the Thunder in Game 6 of the 2025 NBA Finals, dominating both ends of the floor in a 108-91 win that was virtually sealed by the time the fourth quarter began.</p>
                <a href="#" class="btn btn-primary">Watch Now</a>
              </div>
            </div>
          </div>
          <div class="col-md-6" v-for="n in 1" :key="n">
            <div class="card h-100 shadow-sm border-0">
              <img src="../assets/highlight2.webp" class="card-img-top" alt="Highlight Image">
              <div class="card-body">
                <h5 class="card-title">Rockets confirm arrival of Durant</h5>
                <p class="card-text">Superstar Kevin Durant is headed from the Phoenix Suns to Houston as part of an NBA-record seven-team deal, the Rockets confirmed on Sunday (Monday in Manila).</p>
                <a href="#" class="btn btn-primary">Read now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-4">
      <p class="mb-0">&copy; {{ new Date().getFullYear() }} NBA747 | Group Dictech</p>
    </footer>

  </div>
</template>

<script setup></script>

<style scoped>
.homepage {
  font-family: 'Poppins', sans-serif;
}

.hero-section {
  height: 80vh;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  max-width: 800px;
}

.background-video {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quick-access .card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease-in-out;
}

.card i {
  color: #ffc107;
}

footer {
  margin-top: 4rem;
}
</style>