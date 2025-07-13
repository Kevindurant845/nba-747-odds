import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleBettingView from '../views/ScheduleBettingView.vue'
import Trivia from '../views/Trivia.vue'
import QuizView from '../views/QuizView.vue'
import AboutViewVue from '../views/AboutView.vue'
import BetSlipView from '../views/BetSlipView.vue' // New import from ginebra's finest benny

const routes = [
  { path: '/', component: HomeView },
  { path: '/schedule-betting', component: ScheduleBettingView },
  { path: '/trivia', component: Trivia },
  { path: '/quiz', component: QuizView },
  { path: '/about', component: AboutViewVue },
  { path: '/betslip', component: BetSlipView } // New route from dayao
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
