

<template>

<div>
    <appHeader></appHeader>
    <div class="content">

      <!-- View Mode -->
      <div class="profile__container" v-if="!isEditing">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{player.name}}</h1>
                  <div class="profile__left__image">
                      <img src="http://via.placeholder.com/200x200" />
                  </div>
              </div>
              <div class="profile__right">
                  <div class="profile__right__links">
                      <a href="" v-on:click="menuToggle" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                      <ul class="profile__right__links__menu js-profile-options">
                          <li class="profile__right__links__menu__item">
                              <a href="" v-on:click="editToggle" class="profile__right__links__menu__item__link">Edit Player</a>
                          </li>
                      </ul>
                  </div>
                  <dl class="profile__right__list">
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Player Name</dt>
                          <dd class="profile__right__list__item__data">{{player.name}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Position</dt>
                          <dd class="profile__right__list__item__data">{{player.position}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Created</dt>
                          <dd class="profile__right__list__item__data">Today</dd>
                      </div>
                  </dl>
              </div>
          </div>
      </div>

      <!-- Edit Mode -->
      <div class="profile__container" v-if="isEditing">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{player.name}}</h1>
                  <div class="profile__left__image">
                      <img src="http://via.placeholder.com/200x200" />
                  </div>
              </div>
              <div class="profile__right">
                  <div class="profile__right__links">
                      <a href="" v-on:click="menuToggle" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                      <ul class="profile__right__links__menu js-profile-options">
                        <li class="profile__right__links__menu__item">
                          <a href="" v-on:click="saveChange" class="profile__right__links__menu__item__link">Save</a>
                        </li>
                        <li class="profile__right__links__menu__item">
                          <a href="" v-on:click="cancelChange" class="profile__right__links__menu__item__link">Cancel</a>
                        </li>
                        <li class="profile__right__links__menu__item">
                          <a href="" v-on:click="deletePlayer" class="profile__right__links__menu__item__link">Delete Player</a>
                        </li>
                      </ul>
                  </div>
                  <dl class="profile__right__list">
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Player Name</dt>
                          <dd class="profile__right__list__item__data">
                            <input id="player-name" class="profile__right__list__item__data__field" v-model="player.name" />
                          </dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Position</dt>
                          <dd class="profile__right__list__item__data">{{player.position}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Created</dt>
                          <dd class="profile__right__list__item__data">
                            <input id="player-created-date" class="profile__right__list__item__data__field" v-model="player.createdDate" />
                          </dd>
                      </div>
                  </dl>
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
import $ from 'jquery';

export default {
    name: 'PlayerProfile',
    components: {
        AppHeader
    },
    data: function() {
      let leagues = rosteredData.leagues;
      let leagueId;
      let teamId;
      let playerId;
      let currentPlayer;
      let teams;
      let players;

      leagues.map((league, i) => {
        leagueId = i;
        teams = leagues[leagueId].teams;
        league.teams.map((team, i) => {
          teamId = i;
          players = teams[teamId].players;
          team.players.map((player, i) => {
            if (player.name.replace(/\s/g, '') === this.$route.params.name) {
              playerId = i;
              currentPlayer = leagues[leagueId].teams[teamId].players[playerId];
              console.log(currentPlayer);
            }
          });
        });
      });
        return {
            player: currentPlayer,
            players: players,
            teams: teams,
            isEditing: false,
            leagueId: leagueId,
            teamId: teamId,
            playerId: playerId,
        }
    },
    methods: {
      menuToggle: function(e) {
        e.preventDefault();
        $(".js-profile-options").slideToggle();
      },
      editToggle: function(e) {
        e.preventDefault();
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      mounted() {
        this.cachedPlayer = Object.assign({}, this.player);
      },
      saveChange: function(e) {
        e.preventDefault();
        this.cachedPlayer = Object.assign({}, this.player);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      cancelChange: function(e) {
        e.preventDefault();
        this.player = Object.assign({},this.cachedPlayer);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      deletePlayer: function(e) {
        e.preventDefault();
        this.leagues[this.leagueId].teams[this.teamId].players.splice(this.playerId, 1);
        this.$router.push("/players");
      },
    },
}

</script>
