import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Test from '../pages/test/Test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'test',
    component: Test
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})