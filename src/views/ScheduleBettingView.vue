<template>
  <div class="schedule-betting-view">
    <!-- Search Bar -->
    <input 
      v-model="searchQuery" 
      placeholder="Search team..." 
      class="form-control mb-3" 
    />

    <!-- NBA Games Section -->
    <h2 class="mb-4 text-warning">NBA Summer League Schedule & Betting Odds</h2>

    <div v-if="filteredGames(games).length > 0" class="d-grid gap-4">
      <div 
        v-for="(game, index) in filteredGames(games)" 
        :key="index" 
        class="card bg-dark text-white shadow-sm"
      >
        <div class="card-body">
          <!-- Badge -->
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
                <li :class="getOddsClass(game.odds.teamA)">
                  {{ game.teamA }}: {{ game.odds.teamA }}
                </li>
                <li :class="getOddsClass(game.odds.teamB)">
                  {{ game.teamB }}: {{ game.odds.teamB }}
                </li>
              </ul>
            </div>
            <!-- Bet Controls -->
            <!-- Inside each game card -->
            <div class="mt-3 d-flex">
              <select v-model="selectedTeam[index]" class="form-select form-select-sm me-2">
                <option value="" disabled selected>Select Team</option>
                <option :value="game.teamA">{{ game.teamA }}</option>
                <option :value="game.teamB">{{ game.teamB }}</option>
              </select>
              <button 
              @click="addToBetSlip(game, selectedTeam[index])" 
              class="btn btn-outline-warning btn-sm" 
              :disabled="!selectedTeam[index]"
              >
              Add to Bet Slip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No NBA Games Found -->
    <div v-if="filteredGames(games).length === 0" class="text-center my-5">
      <p class="text-white-50">No matching NBA games found.</p>
    </div>

    <!-- PBA Games Section -->
    <div v-if="pbaGames.length > 0" class="mt-5">
      <h2 class="mb-4 text-danger">PBA Schedule & Betting Odds</h2>

      <div class="d-grid gap-4">
        <div 
          v-for="(game, index) in filteredGames(pbaGames)" 
          :key="index" 
          class="card bg-secondary text-white shadow-sm border border-danger"
        >
          <div class="card-body">
            <!-- Badge -->
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
                  <li :class="getOddsClass1(game.odds.teamA)">
                    {{ game.teamA }}: {{ game.odds.teamA }}
                  </li>
                  <li :class="getOddsClass1(game.odds.teamB)">
                    {{ game.teamB }}: {{ game.odds.teamB }}
                  </li>
                </ul>
              </div>
              <!-- Bet Controls -->
              <!-- Inside each game card -->
              <div class="mt-3 d-flex">
                  <select v-model="selectedTeam[index]" class="form-select form-select-sm me-2">
                    <option value="" disabled selected>Select Team</option>
                    <option :value="game.teamA">{{ game.teamA }}</option>
                    <option :value="game.teamB">{{ game.teamB }}</option>
                  </select>
                  <button 
                  @click="addToBetSlip(game, selectedTeam[index])" 
                  class="btn btn-outline-warning btn-sm" 
                  :disabled="!selectedTeam[index]"
                 >
                   Add to Bet Slip
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No PBA Games Found -->
    <div v-if="filteredGames(pbaGames).length === 0 && pbaGames.length > 0" class="text-center my-5">
      <p class="text-white-50">No matching PBA games found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- DATA ---
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

// --- SEARCH FILTER ---
const searchQuery = ref('')

function filteredGames(gameList){
  if (!searchQuery.value) return gameList
  const query = searchQuery.value.toLowerCase()
  return gameList.filter(game =>
    game.teamA.toLowerCase().includes(query) ||
    game.teamB.toLowerCase().includes(query)
  )
}

// --- BET SLIP LOGIC ---
const selectedTeam = ref({})
const selectedTeamPBA = ref({})

function addToBetSlip(game, team) {
  if (!team) return

  let bets = JSON.parse(localStorage.getItem('bets') || '[]')
  bets.push({
    teamA: game.teamA,
    teamB: game.teamB,
    date: game.date,
    time: game.time,
    selectedTeam: team,
    odds: game.odds[team === game.teamA ? 'teamA' : 'teamB']
  })
  localStorage.setItem('bets', JSON.stringify(bets))
  router.push('/betslip')
}

// --- UTILITIES ---
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

function timeUntilGame(dateString, gameTime){
  const gameDateTime = new Date(`${dateString} ${gameTime}`)
  const now = new Date()
  const diffMs = gameDateTime - now
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 0) return 'Live Now!'
  return `${diffHours} hour(s) remaining`
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