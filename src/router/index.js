import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleBettingView from '../views/ScheduleBettingView.vue'
import Trivia from '../views/Trivia.vue'
import QuizView from '../views/QuizView.vue'
import AboutViewVue from '../views/AboutView.Vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/schedule-betting', component: ScheduleBettingView },
  { path: '/trivia', component: Trivia },
  {path: '/quiz', component: QuizView},
  { path: '/about', component: AboutViewVue }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router