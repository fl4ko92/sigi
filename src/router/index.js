// Imports
import Vue from 'vue'
import Router from 'vue-router'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/home/Login.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/login/Login.vue'),
        },
      ],
    },
    {
      path: '',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: 'home',
          name: 'Control',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'centers',
          name: 'Centros',
          component: () => import('@/views/about/Index.vue'),
        },
        {
          path: 'patients',
          name: 'Pacientes',
          component: () => import('@/views/contact-us/Index.vue'),
        },
        {
          path: 'pro',
          name: 'Directores',
          component: () => import('@/views/pro/Index.vue'),
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        },
      ],
    },
  ],
})

export default router
