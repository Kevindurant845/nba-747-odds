<template>
  <div class="quiz-view">
    <!-- Background Image -->
    <div class="quiz-background" :style="{ backgroundImage: 'url(' + quizbg + ')' }"></div>


    <div class="container position-relative" style="z-index: 1">
      <h2 class="mb-4 text-warning">NBA Finals Trivia Quiz</h2>

      <div v-if="!quizCompleted">
        <div class="card mb-4 bg-dark text-white shadow-sm" v-for="(question, index) in questions" :key="index">
          <div class="card-body">
            <h5 class="card-title">Question {{ index + 1 }}: {{ question.text }}</h5>
            <div class="list-group">
              <label 
                v-for="(option, i) in question.options" 
                :key="i" 
                class="list-group-item bg-secondary text-white"
              >
                <input 
                  type="radio" 
                  :name="'question' + index" 
                  :value="option" 
                  v-model="userAnswers[index]"
                >
                {{ option }}
              </label>
            </div>
          </div>
        </div>

        <button @click="submitQuiz" class="btn btn-primary w-100 mb-4">Submit Answers</button>
      </div>

      <!-- Final Score -->
      <div v-else class="text-center p-4 bg-secondary rounded shadow">
        <h3 class="text-warning">You scored {{ score }} out of {{ questions.length }}!</h3>
        <p>{{ getFinalMessage() }}</p>
        <router-link to="/trivia" class="btn btn-outline-light">Back to Trivia</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import quizbg from '../assets/quizbg.png'
import { ref } from 'vue'

const questions = [
  {
    text: "Which team won Game 6 of the 2025 NBA Finals?",
    options: ["Thunder", "Pacers", "Lakers", "Warriors"],
    answer: "Pacers"
  },
  {
    text: "What team Kobe Bryant did not beat in the Finals?",
    options: ["Boston Celtics", "Detroit Pistons", "New Jersey Nets", "Indiana Pacers"],
    answer: "Detroit Pistons"
  },
  {
    text: "Who is the only player that has won 3 straight MVPs?",
    options: ["Lebron James", "Nikola Jokic", "Larry Bird", "Michael Jordan"],
    answer: "Larry Bird"
  },
  {
    text: "What was the final series score of the 2025 NBA Finals?",
    options: ["4-2", "4-3", "4-1", "4-0"],
    answer: "4-3"
  },
  {
    text: "Who coached the winning team in the 2025 NBA Finals?",
    options: ["Jason Kidd", "Joe Mazzulla", "Michael Malone" , "Mark Daigneault"],
    answer: "Mark Daigneault"
  },
  {
    text: "The 2025 NBA Finals featured a rematch of the 2024 Finals.",
    options: ["True" , "False"],
    answer: "False"
  },
  {
    text: "Which city hosted the final (championship-clinching) game of the series?",
    options: ["Boston", "Indiana", "Denver", "Oklahoma City"],
    answer: "Oklahoma City"
  },
  {
    text: "The 2025 NBA Finals included at least one overtime game.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    text: "Which of the following players made their first NBA Finals appearance in 2025?",
    options: ["Shai Gilgeous-Alexander", "Zian Tabor", "Anthony Edwards", "Jayson Tatum"],
    answer: "Shai Gilgeous-Alexander"
  },
  {
    text: "Who Did a Game Winner on Game 1 of the NBA Finals 2025?",
    options: ["Shai Gilgeous-Alexander", "Saturnino Perlas", "Andrew Nembhard", "Tyrese Haliburton"],
    answer: "Saturnino Perlas"
  },

]

const userAnswers = ref(Array(questions.length).fill(null))
const quizCompleted = ref(false)
const score = ref(0)

function submitQuiz() {
  let correct = 0
  questions.forEach((q, i) => {
    if (userAnswers.value[i] === q.answer) correct++
  })
  score.value = correct
  quizCompleted.value = true
}

function getFinalMessage() {
  if (score.value === questions.length) return "Perfect! I am confident you can hit your parlay!"
  if (score.value >= (questions.length)*0.7) return "Nice job! You know your stuff."
  if (score.value >= (questions.length)*0.5) return "Good!"
  return "You're missing out!"
}
</script>

<style scoped>
.quiz-view {
  min-height: 100vh;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

.quiz-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.50;
  z-index: 0;
}

.list-group-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #333;
}
</style>