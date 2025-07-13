<template>
  <div class="schedule-betting-view">
    <!-- Search Bar -->
    <input 
      v-model="searchQuery" 
      placeholder="Search team..." 
      class="form-control mb-4" 
    />

    <!-- NBA Section -->
    <h2 class="mb-4 text-warning">🏀 NBA Summer League</h2>

    <div v-if="filteredGames(games).length > 0" class="d-grid gap-4">
      <div 
        v-for="game in filteredGames(games)" 
        :key="game.id" 
        class="card bg-dark text-white shadow-sm p-3"
      >
        <h5>{{ game.teamA }} vs {{ game.teamB }}</h5>
        <p class="text-white-50">
          {{ formatDate(game.date) }} | {{ game.time }} ({{ timeUntilGame(game.date, game.time) }})
        </p>

        <div class="d-flex justify-content-between flex-wrap">
          <div>
            <strong>Betting Odds:</strong>
            <ul class="list-unstyled">
              <li class="odds-item">{{ game.teamA }}: {{ game.odds.teamA }}</li>
              <li class="odds-item">{{ game.teamB }}: {{ game.odds.teamB }}</li>
            </ul>
          </div>

          <div>
            <strong>Select Team:</strong>
            <div class="form-check text-warning">
              <input 
                class="form-check-input" 
                type="radio" 
                :name="game.id" 
                :value="game.teamA" 
                v-model="selectedTeams[game.id]" 
                @change="addToBetSlip(game, game.teamA)"
              />
              <label class="form-check-label">{{ game.teamA }}</label>
            </div>
            <div class="form-check text-warning">
              <input 
                class="form-check-input" 
                type="radio" 
                :name="game.id" 
                :value="game.teamB" 
                v-model="selectedTeams[game.id]" 
                @change="addToBetSlip(game, game.teamB)"
              />
              <label class="form-check-label">{{ game.teamB }}</label>
            </div>
            <small v-if="selectedTeams[game.id]" class="text-success mt-1 d-block">
              ✅ Selected {{ selectedTeams[game.id] }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center my-5">
      <p class="text-white-50">No matching NBA games found.</p>
    </div>

    <!-- PBA Section -->
    <h2 class="mt-5 mb-4 text-danger">🔴 PBA League</h2>

    <div v-if="filteredGames(pbaGames).length > 0" class="d-grid gap-4">
      <div 
        v-for="game in filteredGames(pbaGames)" 
        :key="game.id" 
        class="card bg-dark text-white shadow-sm p-3 border border-danger"
      >
        <h5>{{ game.teamA }} vs {{ game.teamB }}</h5>
        <p class="text-white-50">
          {{ formatDate(game.date) }} | {{ game.time }} ({{ timeUntilGame(game.date, game.time) }})
        </p>

        <div class="d-flex justify-content-between flex-wrap">
          <div>
            <strong>Betting Odds:</strong>
            <ul class="list-unstyled">
              <li class="odds-item">{{ game.teamA }}: {{ game.odds.teamA }}</li>
              <li class="odds-item">{{ game.teamB }}: {{ game.odds.teamB }}</li>
            </ul>
          </div>

          <div>
            <strong>Select Team:</strong>
            <div class="form-check text-warning">
              <input 
                class="form-check-input" 
                type="radio" 
                :name="game.id" 
                :value="game.teamA" 
                v-model="selectedTeams[game.id]" 
                @change="addToBetSlip(game, game.teamA)"
              />
              <label class="form-check-label">{{ game.teamA }}</label>
            </div>
            <div class="form-check text-warning">
              <input 
                class="form-check-input" 
                type="radio" 
                :name="game.id" 
                :value="game.teamB" 
                v-model="selectedTeams[game.id]" 
                @change="addToBetSlip(game, game.teamB)"
              />
              <label class="form-check-label">{{ game.teamB }}</label>
            </div>
            <small v-if="selectedTeams[game.id]" class="text-success mt-1 d-block">
              ✅ Selected {{ selectedTeams[game.id] }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- View Bet Slip Button -->
    <div class="text-center mt-5">
      <router-link to="/betslip" class="btn btn-lg btn-success">
        View Bet Slip ({{ totalBets }})
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const searchQuery = ref('')
const selectedTeams = reactive({})
const totalBets = ref(0)

// --- NBA Games ---
const games = ref([
  {
    id: 'nba1',
    teamA: "Miami Heat",
    teamB: "Boston Celtics",
    date: "2025-07-15",
    time: "8:00 AM",
    odds: { teamA: "3.08", teamB: "1.39" }
  },
  {
    id: 'nba2',
    teamA: "Utah Jazz",
    teamB: "San Antonio Spurs",
    date: "2025-07-15",
    time: "8:30 AM",
    odds: { teamA: "4.67", teamB: "1.45" }
  },
  {
    id: 'nba3',
    teamA: "Phoenix Suns",
    teamB: "Sacramento Kings",
    date: "2025-07-15",
    time: "10:00 AM",
    odds: { teamA: "1.79", teamB: "2.08" }
  },
  {
    id: 'nba4',
    teamA: "Los Angeles Clippers",
    teamB: "Los Angeles Lakers",
    date: "2025-07-15",
    time: "10:30 AM",
    odds: { teamA: "1.87", teamB: "2.13" }
  }
])

// --- PBA Games ---
const pbaGames = ref([
  {
    id: 'pba1',
    teamA: "San Miguel Beermen",
    teamB: "TNT Tropang 5G",
    date: "2025-07-16",
    time: "7:30 PM",
    odds: { teamA: "2.50", teamB: "1.47" }
  }
])

onMounted(() => {
  syncBetsFromStorage()
})

function syncBetsFromStorage() {
  const stored = localStorage.getItem('bets')
  const bets = stored ? JSON.parse(stored) : []
  totalBets.value = bets.length
  bets.forEach(bet => {
    const id = findGameId(bet.teamA, bet.teamB)
    if (id) selectedTeams[id] = bet.selectedTeam
  })
}

function findGameId(teamA, teamB) {
  const allGames = [...games.value, ...pbaGames.value]
  const found = allGames.find(g => g.teamA === teamA && g.teamB === teamB)
  return found?.id || null
}

function addToBetSlip(game, team) {
  const stored = localStorage.getItem('bets')
  let bets = stored ? JSON.parse(stored) : []

  const newBet = {
    teamA: game.teamA,
    teamB: game.teamB,
    date: game.date,
    time: game.time,
    selectedTeam: team,
    odds: game.odds[team === game.teamA ? 'teamA' : 'teamB']
  }

  const index = bets.findIndex(b => b.teamA === game.teamA && b.teamB === game.teamB)
  if (index !== -1) {
    bets[index] = newBet
  } else {
    bets.push(newBet)
  }

  localStorage.setItem('bets', JSON.stringify(bets))
  syncBetsFromStorage()
}

function filteredGames(list) {
  const query = searchQuery.value.toLowerCase()
  return !query ? list : list.filter(g =>
    g.teamA.toLowerCase().includes(query) || g.teamB.toLowerCase().includes(query)
  )
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function timeUntilGame(date, time) {
  const target = new Date(`${date} ${time}`)
  const now = new Date()
  const hours = Math.floor((target - now) / (1000 * 60 * 60))
  return hours < 0 ? 'Live Now!' : `${hours} hour(s) remaining`
}
</script>

<style scoped>
.schedule-betting-view {
  max-width: 900px;
  margin: auto;
  padding-top: 2rem;
}

/* Custom Odds Style */
.odds-item {
  font-weight: bold;
  color: #f0ad4e; /* Bootstrap warning color */
}

/* Optional: Customize more */
.form-check-input:checked + .form-check-label {
  font-weight: bold;
  color: #ffc107; /* Bootstrap warning yellow */
}

.btn-success {
  background-color: #28a745;
  border: none;
}
.btn-success:hover {
  background-color: #218838;
}
</style>
