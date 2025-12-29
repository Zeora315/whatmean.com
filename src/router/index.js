import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Entry from '../views/Entry.vue'
import About from '../views/About.vue'
import Friends from '../views/Friends.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/entries',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router