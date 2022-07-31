import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/creators',
    name: 'creators',
    component: () => import(/* webpackChunkName: "creators" */ '../views/CreatorsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "portfolio" */ '../views/PortfolioView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import(/* webpackChunkName: "editprofile" */ '../views/EditProfileView.vue')
  },
  {
    path: '/editportfolio',
    name: 'editportfolio',
    component: () => import(/* webpackChunkName: "editportfolio" */ '../views/EditPortfolioView.vue')
  },
  {
    path: '/mycollabs',
    name: 'mycollabs',
    component: () => import(/* webpackChunkName: "mycollabs" */ '../views/MyCollabsView.vue')
  },
  {
    path: '/collabdetail',
    name: 'collabdetail',
    component: () => import(/* webpackChunkName: "collabdetail" */ '../views/CollabDetailView.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
