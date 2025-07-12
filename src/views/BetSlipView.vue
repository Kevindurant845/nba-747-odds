<template>
  <div class="bet-slip-view">
    <!-- Back Arrow -->
    <router-link to="/schedule-betting" class="back-arrow text-warning mb-3 d-block">
      &larr; Back to Schedule
    </router-link>

    <h2 class="mb-4 text-warning">Your Bet Slips</h2>

    <!-- Empty State -->
    <div v-if="bets.length === 0" class="text-center py-5">
      <p class="text-white-50">No bets added yet.</p>
      <router-link to="/schedule-betting" class="btn btn-outline-warning">Go to Odds</router-link>
    </div>

    <!-- Bet List -->
    <div v-else>
      <div class="card bg-dark text-white mb-3" v-for="(bet, index) in bets" :key="index">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ bet.teamA }} vs {{ bet.teamB }}</h5>
            <p class="mb-0 text-white-50">{{ formatDate(bet.date) }} | {{ bet.time }}</p>
            <small>Bet on: <strong>{{ bet.selectedTeam }}</strong> @ {{ bet.odds }}</small>
          </div>
          <button @click="removeBet(index)" class="btn btn-sm btn-danger">Remove</button>
        </div>
      </div>

      <div class="d-grid gap-2 mt-4">
        <button @click="generateReceipt" class="btn btn-success">Proceed & Generate Receipt</button>
        <button @click="clearBets" v-if="bets.length > 0" class="btn btn-danger">Clear All Bets</button>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div v-if="receiptVisible" class="modal-overlay" @click.self="closeReceipt">
      <div class="modal-content bg-dark p-4 rounded shadow text-white">
        <h4 class="text-warning mb-3">Receipt</h4>
        <ul class="list-group list-group-flush mb-3">
          <li class="list-group-item bg-dark text-white" v-for="(bet, i) in bets" :key="i">
            {{ bet.teamA }} vs {{ bet.teamB }} - {{ bet.selectedTeam }} @ {{ bet.odds }}
          </li>
        </ul>
        <p>Total Bets: {{ bets.length }}</p>
        <p>Timestamp: {{ receiptTime }}</p>
        <button @click="closeReceipt" class="btn btn-secondary mt-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Simulate bet data stored in localStorage
const bets = ref(JSON.parse(localStorage.getItem('bets') || '[]'))

const receiptVisible = ref(false)
const receiptTime = ref('')

function removeBet(index) {
  bets.value.splice(index, 1)
  saveBets()
}

function saveBets() {
  localStorage.setItem('bets', JSON.stringify(bets.value))
}

function generateReceipt() {
  const now = new Date()
  receiptTime.value = now.toLocaleString()
  receiptVisible.value = true
}

function closeReceipt() {
  receiptVisible.value = false
  bets.value = [] // Clear bets after receipt
  saveBets()
}

function clearBets() {
  bets.value = []
  saveBets()
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.bet-slip-view {
  max-width: 800px;
  margin: auto;
  padding-top: 2rem;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}
.back-arrow {
  font-size: 1.2rem;
  text-decoration: none;
}
</style>