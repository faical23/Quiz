import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Teachers from '../views/TeacherPage'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Teachers',
    name: 'Teacher',
    component: Teachers
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
