import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const basicRoutes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import(`@/views/home.vue`)
  }
];
export default basicRoutes;
