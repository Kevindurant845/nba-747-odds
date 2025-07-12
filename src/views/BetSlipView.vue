<template>
  <div class="bet-slip-view">
    <router-link to="/schedule-betting" class="text-warning d-block mb-3">&larr; Back to Schedule</router-link>
    <h2 class="mb-4 text-warning">Your Bet Slips</h2>

    <div v-if="bets.length === 0" class="text-center py-5">
      <p class="text-white-50">No bets added yet.</p>
      <router-link to="/schedule-betting" class="btn btn-outline-warning">Go to Odds</router-link>
    </div>

    <div v-else>
      <div class="card bg-dark text-white mb-3" v-for="(bet, index) in bets" :key="index">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ bet.teamA }} vs {{ bet.teamB }}</h5>
            <p class="text-white-50 mb-0">{{ formatDate(bet.date) }} | {{ bet.time }}</p>
            <small>Bet on: <strong>{{ bet.selectedTeam }}</strong> @ {{ bet.odds }}</small>
          </div>
          <button @click="removeBet(index)" class="btn btn-sm btn-danger">Remove</button>
        </div>
      </div>

      <div class="d-grid gap-2 mt-4">
        <button @click="generateReceipt" class="btn btn-success">Proceed & Generate Receipt</button>
        <button @click="clearBets" class="btn btn-danger">Reset All Bets</button>
      </div>
    </div>

    <div v-if="receiptVisible" class="modal-overlay" @click.self="closeReceipt">
      <div class="modal-content bg-dark text-white p-4 rounded shadow">
        <h4 class="text-warning">Receipt</h4>
        <ul class="list-group list-group-flush mb-3">
          <li v-for="(bet, i) in receiptBets" :key="i" class="list-group-item bg-dark text-white">
            {{ bet.teamA }} vs {{ bet.teamB }} - {{ bet.selectedTeam }} @ {{ bet.odds }}
          </li>
        </ul>
        <p>Total Bets: {{ receiptBets.length }}</p>
        <p>Timestamp: {{ receiptTime }}</p>
        <button @click="closeReceipt" class="btn btn-secondary mt-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bets = ref([])
const receiptBets = ref([])
const receiptTime = ref('')
const receiptVisible = ref(false)

onMounted(() => {
  bets.value = JSON.parse(localStorage.getItem('bets') || '[]')
})

function removeBet(index) {
  bets.value.splice(index, 1)
  saveBets()
}

function saveBets() {
  localStorage.setItem('bets', JSON.stringify(bets.value))
}

function generateReceipt() {
  receiptBets.value = [...bets.value]
  receiptTime.value = new Date().toLocaleString()
  clearBets()
  receiptVisible.value = true
}

function clearBets() {
  bets.value = []
  localStorage.removeItem('bets')
}

function closeReceipt() {
  receiptVisible.value = false
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
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
  max-width: 500px;
  width: 100%;
}
</style>
