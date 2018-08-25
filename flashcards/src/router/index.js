import Vue from 'vue';
import Router from 'vue-router';
import MainDashboard from '@/components/MainDashboard';
import LeagueDashboard from '@/components/leagues/Dashboard';
import TeamDashboard from '@/components/teams/Dashboard';
import PlayerDashboard from '@/components/players/Dashboard';
import rosteredData from '@/datasample.js';
import LeagueProfile from '@/components/leagues/Profile';
import TeamProfile from '@/components/teams/Profile';
import PlayerProfile from '@/components/players/Profile';
import Login from '@/components/login/Login';
import Signup from '@/components/login/Signup';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/home',
      name: 'MainDashboard',
      component: MainDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/leagues',
      name: 'LeagueDashboard',
      component: LeagueDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/leagues/profile/:name',
      component: LeagueProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/teams',
      name: 'TeamDashboard',
      component: TeamDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/teams/profile/:name',
      component: TeamProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/players',
      name: 'PlayerDashboard',
      component: PlayerDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/players/profile/:name',
      component: PlayerProfile,
      meta: {
        requiresAuth: true
      }
    },
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home');
  else next()
});

export default router;
