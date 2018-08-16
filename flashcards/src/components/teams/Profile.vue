

<template>

<div>
    <appHeader></appHeader>
    <div class="content">
      <div class="profile__container">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{team.name}}</h1>
                  <div class="profile__left__image">
                      <img src="http://via.placeholder.com/200x200" />
                  </div>
              </div>
              <div class="profile__right">
                  <div class="profile__right__links">
                      <a href="" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                      <ul class="profile__right__links__menu js-profile-options">
                          <li class="profile__right__links__menu__item">
                              <a href="" class="profile__right__links__menu__item__link">Edit Team</a>
                          </li>
                      </ul>
                  </div>
                  <dl class="profile__right__list">
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Team Name</dt>
                          <dd class="profile__right__list__item__data">{{team.name}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Number of Players</dt>
                          <dd class="profile__right__list__item__data">{{team.players.length}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Created</dt>
                          <dd class="profile__right__list__item__data">Today</dd>
                      </div>
                  </dl>
              </div>
          </div>
          <div class="panel panel__full-width profile__panel">
              <div class="panel__header">
                  <h1 class="panel__title">Standings</h1>
              </div>
              <div class="panel__body">
                  <ul class="panel__list">
                      <li class="panel__list__item" v-for="player in team.players">
                          <router-link :to="'/players/profile/' + player.name.replace(/\s/g, '')" class="panel__list__item__title"><i class="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>
                            {{player.name}}
                              <span class="right hidden js-delete-team">
                                <i class="fa fa-times red"></i>
                              </span>
                          </router-link>
                      </li>
                      <li id="addForm" class="panel__list__item hidden">
                          <form class="panel__list__item__title">
                              <input id="newTeam" class="panel__list__item__title__input" type="text" placeholder="Team Name" />
                              <span class="right">
                    <i class="fa fa-check green margin-right-20"></i>
                    <i class="fa fa-times red"></i>
                  </span>
                          </form>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>

</template>

<script>

import AppHeader from '../Header';
import rosteredData from '../../datasample.js';
import Router from 'vue-router';

export default {
    name: 'TeamProfile',
    components: {
        AppHeader
    },
    data: function() {
      let leagues = rosteredData.leagues;
      let leagueId;
      let teamId;
      let currentTeam;

      leagues.map((league, i) => {
        leagueId = i;
        league.teams.map((team, i) => {
          if (team.name.replace(/\s/g, '') === this.$route.params.name) {
            teamId = i;
            currentTeam = leagues[leagueId].teams[teamId];
            console.log(currentTeam);
          }
        });
      });
        return {
            team: currentTeam,
        }
    }
}

</script>
