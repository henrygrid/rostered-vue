

<template>

<div>
    <appHeader></appHeader>
    <div class="content">

      <!-- View Mode -->
      <div class="profile__container" v-if="!isEditing">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{team.name}}</h1>
                  <div class="profile__left__image">
                      <img src="http://via.placeholder.com/200x200" />
                  </div>
              </div>
              <div class="profile__right">
                  <div class="profile__right__links">
                      <a href="" v-on:click="menuToggle" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                      <ul class="profile__right__links__menu js-profile-options">
                        <li class="profile__right__links__menu__item">
                            <a href="" v-on:click="editToggle" class="profile__right__links__menu__item__link">Edit Team</a>
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

      <!-- Edit Mode -->
      <div class="profile__container" v-if="isEditing">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{team.name}}</h1>
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
                            <a href="" v-on:click="deleteTeam" class="profile__right__links__menu__item__link">Delete Team</a>
                          </li>
                      </ul>
                  </div>
                  <dl class="profile__right__list">
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Team Name</dt>
                          <dd class="profile__right__list__item__data">
                            <input id="team-name" class="profile__right__list__item__data__field" v-model="team.name" />
                          </dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Number of Players</dt>
                          <dd class="profile__right__list__item__data">{{team.players.length}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Created</dt>
                          <dd class="profile__right__list__item__data">
                            <input id="team-created-date" class="profile__right__list__item__data__field" v-model="team.createdDate" />
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
          <div class="panel panel__full-width profile__panel">
              <div class="panel__header">
                  <h1 class="panel__title">Standings</h1>
                  <i class="fa fa-plus panel__header__add" v-on:click="revealAdd"></i>
              </div>
              <div class="panel__body">
                  <ul class="panel__list">
                      <li class="panel__list__item" v-for="player in team.players">
                          <div class="panel__list__item__title"><i class="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>
                            {{player.name}}
                              <span class="right js-delete-team">
                                <i class="fa fa-times red" :id="player.name" v-on:click="deleteTeam"></i>
                              </span>
                          </div>
                      </li>
                      <li id="addForm" class="panel__list__item hidden">
                          <form class="panel__list__item__title">
                              <input id="newPlayer" class="panel__list__item__title__input" type="text" placeholder="Player Name" />
                              <span class="right">
                                <i class="fa fa-check green margin-right-20" v-on:click="addPlayer"></i>
                                <i class="fa fa-times red" v-on:click="hideAdd"></i>
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
import $ from 'jquery';

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
      let teams;

      leagues.map((league, i) => {
        leagueId = i;
        teams = leagues[leagueId].teams;
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
            teams: teams,
            leagueId: leagueId,
            teamId: teamId,
            isEditing: false,
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
        this.cachedTeam = Object.assign({}, this.team);
      },
      saveChange: function(e) {
        e.preventDefault();
        this.cachedTeam = Object.assign({}, this.team);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      cancelChange: function(e) {
        e.preventDefault();
        this.team = Object.assign({},this.cachedTeam);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      deleteTeam: function(e) {
        e.preventDefault();
        this.leagues[this.leagueId].teams.splice(this.teamId, 1);
        this.$router.push("/teams");
      },
      revealAdd: function(e) {
        e.preventDefault();
        $("#addForm").slideDown();
      },
      addPlayer: function(e) {
        e.preventDefault();
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        let newPlayerName = $("#newPlayer").val();
        if(newPlayerName !== "" && newPlayerName !== null) {
          let newPlayer = {
            name: newPlayerName,
            id: "",
            createdDate: today,
          };
          this.team.players.push(newPlayer);
        }
        $("#newPlayer").val("");
      },
      hideAdd: function(e) {
        e.preventDefault();
        $("#addForm").slideUp();
      },
      deleteTeam: function(e) {
        this.team.players.map((player, i) => {
          if (e.target.getAttribute("id") === player.name) {
            this.team.players.splice(i, 1);
          }
        });
      }
    }
}

</script>
