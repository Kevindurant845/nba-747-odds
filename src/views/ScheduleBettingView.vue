<template>
  <div class="schedule-betting-view">
    <input v-model="searchQuery" placeholder="Search team..." class="form-control mb-3" />
    <h2 class="mb-4 text-warning">NBA Summer League Schedule & Betting Odds</h2>

    <!-- Game List -->
    
    <div v-if="games.length > 0" class="d-grid gap-4">
      <div 
        v-for="(game, index) in filteredGames(games)" 
        :key="index" 
        class="card bg-dark text-white shadow-sm"
      >
        <div class="card-body">
          <!-- Summer League Badge -->
          <span v-if="game.isSummerLeague" class="badge bg-info mb-2">🏀 NBA Summer League</span>

          <!-- Game Info -->
          <h5 class="card-title">{{ game.teamA }} vs {{ game.teamB }}</h5>
          <p class="card-text text-white-50">
            {{ formatDate(game.date) }} | {{ game.time }} ({{ timeUntilGame(game.date, game.time) }})
          </p>

          <!-- Betting Odds -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              <strong>Betting Odds:</strong>
              <ul class="list-unstyled mb-0">
                <li :class="getOddsClass(game.odds.teamA)">{{ game.teamA }}: {{ game.odds.teamA }}</li>
                <li :class="getOddsClass(game.odds.teamB)">{{ game.teamB }}: {{ game.odds.teamB }}</li>
              </ul>
            </div>
            <button class="btn btn-outline-warning btn-sm">Place Bet</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PBA Game List -->
<div v-if="pbaGames.length > 0" class="mt-5">
  <h2 class="mb-4 text-danger">PBA Schedule & Betting Odds</h2>

  <div class="d-grid gap-4">
    <div 
      v-for="(game, index) in filteredGames(pbaGames)" 
      :key="index" 
      class="card bg-secondary text-white shadow-sm border border-danger"
    >
      <div class="card-body">
        <!-- PBA Badge -->
        <span v-if="game.isPBA" class="badge bg-danger mb-2">🔴 PBA League</span>

        <!-- Game Info -->
        <h5 class="card-title">{{ game.teamA }} vs {{ game.teamB }}</h5>
        <p class="card-text text-white-50">
          {{ formatDate(game.date) }} | {{ game.time }} ({{ timeUntilGame(game.date, game.time) }})
        </p>

        <!-- Betting Odds -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            <strong>Betting Odds:</strong>
            <ul class="list-unstyled mb-0">
              <li :class="getOddsClass1(game.odds.teamA)">{{ game.teamA }}: {{ game.odds.teamA }}</li>
              <li :class="getOddsClass1(game.odds.teamB)">{{ game.teamB }}: {{ game.odds.teamB }}</li>
            </ul>
          </div>
          <button class="btn btn-outline-light btn-sm">Place Bet</button>
        </div>
      </div>
    </div>
  </div>
</div>

    <!-- No Games Message -->
    <div v-if="games.length === 0" class="text-center my-5">
      <p class="text-white-50">No upcoming games found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

function filteredGames(gameList){
  if (!searchQuery.value) return gameList
  const query = searchQuery.value.toLowerCase()
  return gameList.filter(game =>
    game.teamA.toLowerCase().includes(query) ||
    game.teamB.toLowerCase().includes(query)
  )
}

// Manually defined NBA schedule
const games = ref([
  {
    teamA: "New Orleans Pelicans",
    teamB: "Minnesota Timberwolves",
    date: "2025-07-11",
    time: "3:30 AM",
    isSummerLeague: true,
    odds: {
      teamA: "+110",
      teamB: "-120"
    }
  },
  {
    teamA: "Cleveland Cavaliers",
    teamB: "Indiana Pacers",
    date: "2025-07-11",
    time: "5:00 AM",
    isSummerLeague: true,
    odds: {
      teamA: "-105",
      teamB: "+130"
    }
  },
  {
    teamA: "Oklahoma City Thunder",
    teamB: "Brooklyn Nets",
    date: "2025-07-17",
    time: "5:30 AM",
    isSummerLeague: true,
    odds: {
      teamA: "+150",
      teamB: "-170"
    }
  }
])
const pbaGames = ref([
  {
    teamA: "San Miguel Beermen",
    teamB: "TNT Tropang 5G",
    date: "2025-07-13",
    time: "7:30 PM",
    isPBA: true,
    odds: {
      teamA: "+100",
      teamB: "-110"
    }
  } 
])

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function timeUntilGame(dateString, gameTime){
  const gameDateTime = new Date(`${dateString} ${gameTime}`)
  const now = new Date()
  const diffMs = gameDateTime - now
  const diffHours = Math.floor(diffMs /(1000 * 60 * 60))

  if (diffHours < 0) return 'Live Now!'
  return `${diffHours} hours(s) remaining`
}

function getOddsClass(odds){
  return parseFloat(odds) > 0 ? 'text-success' : 'text-danger'
}

function getOddsClass1(odds){
  return parseFloat(odds) > 0 ? 'text-info' : 'text-warning'
}

</script>

<style scoped>
.schedule-betting-view {
  max-width: 900px;
  margin: auto;
  padding-top: 2rem;
}
</style>