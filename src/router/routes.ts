import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('src/pages/LoginForm.vue') },
      { path: '/register', component: () => import('src/pages/RegisterForm.vue') },
    ],
  },
  {
    path: '/employees',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Overall/OverallPage.vue') },
    ],
    props: { title: 'Employees' },
  },

  {
    path: '/logs',
    component: () => import('layouts/MainLayout.vue'),
    children: [],
    props: { title: 'System Logs' }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
