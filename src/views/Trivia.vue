<template>
  <div class="trivia-view">

    <!-- Hero Header -->
    <div class="hero-header text-center py-5 mb-4">
      <h1 class="display-4 fw-bold text-warning">🏀 NBA Fun Facts</h1>
      <p class="lead text-white-50">Explore amazing trivia about the 2025 NBA Playoffs!</p>
    </div>

    <!-- Take Quiz Button -->
    <div class="text-center mt-5 mb-5">
      <router-link 
        to="/quiz" 
        class="btn btn-warning btn-lg px-5 py-3 fs-5 rounded-pill shadow-sm quiz-button"
      >
        🏀 Take a Quiz!
      </router-link>
    </div>

    <!-- Trivia Cards Grid -->
    <div class="container">
      <div class="row g-4 justify-content-center">
        <div 
          v-for="(fact, index) in nbaFacts" 
          :key="index" 
          class="col-md-8"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="card bg-dark text-white shadow-lg rounded-4 overflow-hidden transform-hover">
            <!-- Full-width Image -->
            <img 
              :src="fact.image" 
              class="card-img-top img-fluid" 
              alt="NBA Fact Image" 
              style="height: 300px; object-fit: cover;"
            >
            <!-- Card Body with Bigger Text -->
            <div class="card-body d-flex align-items-center p-4">
              <p class="card-text fs-4 mb-0">{{ fact.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Take Quiz Button -->
    <div class="text-center mt-5 mb-5">
      <router-link 
        to="/quiz" 
        class="btn btn-warning btn-lg px-5 py-3 fs-5 rounded-pill shadow-sm quiz-button"
      >
        🏀 Take a Quiz!
      </router-link>
    </div>

    <!-- Optional NBA Ball Decoration -->
    <div class="nba-decoration d-none d-md-block">
      <svg viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="2">
        <circle cx="50" cy="50" r="45"/>
        <path d="M50 5 L50 95 M5 50 L95 50" stroke="rgba(255,255,255,0.07)"/>
        <circle cx="50" cy="50" r="5" fill="white" opacity="0.1"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import topteam from '../assets/trivia/trivia1.webp'
import sga from '../assets/trivia/sga.jpg'
import okcplayoffs from '../assets/trivia/okcplayoffs.png'
import chet from '../assets/trivia/chet.jpg'
import pacers from '../assets/trivia/pacers.webp'
import oldokc from '../assets/trivia/oldokc.jpg'
import wthelly from '../assets/trivia/wthelly.jpg'
import wthellyburton from '../assets/trivia/wthellyburton.webp'
import pacersplayoffs from '../assets/trivia/pacersplayoffs.png'
import rick from '../assets/trivia/rick.jpg'
import game from '../assets/trivia/game.png'


const nbaFacts = [
  {
    text: "The Oklahoma City Thunder entered the 2025 NBA Playoffs as the #1 seed in the Western Conference.",
    image: topteam
  },
  {
    text: "Tyrese Haliburton emerged as a superstar, leading the team in both points and assists throughout the playoffs.",
    image: wthelly
  },
  {
    text: "Shai Gilgeous-Alexander led the Thunder in scoring throughout the postseason, averaging over 30 points per game.",
    image: sga
  },
  {
    text: "In Game 2 of the Eastern Conference Semi-Finals, Haliburton clutched the game against the Cleveland Cavaliers.",
    image: wthellyburton
  },
  
  {
    text: "OKC swept the Memphis Grizzlies in the first round, had a Game 7 win against the Denver Nuggets, and a 4-1 series against the Minnesota Timberwolves.",
    image: okcplayoffs
  },

  {
    text: " Indiana's playoff journey included victories over the Milwaukee Bucks, New York Knicks, and Cleveland Cavaliers.",
    image: pacersplayoffs
  },
  {
    text: "Chet Holmgren, in his playoff debut, averaged over 3 blocks per game, becoming a defensive anchor for the Thunder.",
    image: chet
  },
  {
    text: "The Indiana Pacers made their first NBA Finals appearance since 2000, breaking a 25-year drought.",
    image: pacers
  },
  {
    text: "The Thunder reached the NBA Finals, their first appearance since 2012.",
    image: oldokc
  },
  {
    text: "Head coach Rick Carlisle led Indiana back to the Finals 13 years after winning his first title with the Dallas Mavericks in 2011.",
    image: rick
  },
  {
    text: "The Pacers lost to the Oklahoma City Thunder in the 2025 NBA Finals in seven games (3–4).",
    image: game
  }
  
]
</script>

<style scoped>
.trivia-view {
  background-color: #121212;
  min-height: 100vh;
  color: whitesmoke;
  font-family: 'Poppins', sans-serif;
}

.hero-header {
  background: linear-gradient(to right, #1e1e1e, #2d2d2d);
  border-radius: 15px;
}

.card {
  transition: all 0.4s ease-in-out;
  border: none;
}

.transform-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(255, 255, 255, 0.1);
}

.quiz-button:hover {
  background-color: #ff8f00 !important;
  transform: scale(1.05);
}

.nba-decoration {
  position: absolute;
  bottom: 30px;
  right: 30px;
  opacity: 0.3;
  pointer-events: none;
}
</style>