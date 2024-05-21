import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import ChurnPreventionModal from "@/components/ChurnPreventionModal.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: ChurnPreventionModal
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;