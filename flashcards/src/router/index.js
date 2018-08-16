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

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainDashboard',
      component: MainDashboard,
    },
    {
      path: '/leagues',
      name: 'LeagueDashboard',
      component: LeagueDashboard,
    },
    {
      path: '/leagues/profile/:name',
      component: LeagueProfile,
    },
    {
      path: '/teams',
      name: 'TeamDashboard',
      component: TeamDashboard,
    },
    {
      path: '/teams/profile/:name',
      component: TeamProfile,
    },
    {
      path: '/players',
      name: 'PlayerDashboard',
      component: PlayerDashboard,
    },
    {
      path: '/players/profile/:name',
      component: PlayerProfile,
    },
  ],
  mode: 'history'
});
