

<template>

<div>
    <appHeader></appHeader>
    <div class="content">

      <!-- View Mode -->
      <div class="profile__container" v-if="!isEditing">
          <div class="profile">
              <div class="profile__left">
                  <h1 class="profile__left__title">{{league.name}}</h1>
                  <div class="profile__left__image">
                      <img src="http://via.placeholder.com/200x200" />
                  </div>
              </div>
              <div class="profile__right">
                  <div class="profile__right__links">
                      <a href="" v-on:click="menuToggle" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                      <ul class="profile__right__links__menu js-profile-options">
                          <li class="profile__right__links__menu__item">
                              <a href="" v-on:click="editToggle" class="profile__right__links__menu__item__link">Edit League</a>
                          </li>
                      </ul>
                  </div>
                  <dl class="profile__right__list">
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">League Name</dt>
                          <dd class="profile__right__list__item__data">{{league.name}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Number of Teams</dt>
                          <dd class="profile__right__list__item__data">{{league.teams.length}}</dd>
                      </div>
                      <div class="profile__right__list__item">
                          <dt class="profile__right__list__item__title">Created</dt>
                          <dd class="profile__right__list__item__data">{{league.createdDate}}</dd>
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
                      <li class="panel__list__item" v-for="team in league.teams">
                          <router-link :to="'/teams/profile/' + team.name.replace(/\s/g, '')" class="panel__list__item__title"><i class="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>
                            {{team.name}}
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
              <h1 class="profile__left__title">{{league.name}}</h1>
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
                    <a href="" class="profile__right__links__menu__item__link">Delete League</a>
                  </li>
                </ul>
              </div>
              <dl class="profile__right__list">
                <div class="profile__right__list__item">
                  <dt class="profile__right__list__item__title">League Name</dt>
                  <dd class="profile__right__list__item__data">
                    <input id="league-name" class="profile__right__list__item__data__field" v-model="league.name" />
                  </dd>
                </div>
                <div class="profile__right__list__item">
                  <dt class="profile__right__list__item__title">Number of Teams</dt>
                  <dd class="profile__right__list__item__data">{{league.teams.length}}</dd>
                </div>
                <div class="profile__right__list__item">
                  <dt class="profile__right__list__item__title">Created</dt>
                  <dd class="profile__right__list__item__data">
                    <input id="league-created-date" class="profile__right__list__item__data__field" v-model="league.createdDate" />
                  </dd>
                </div>
              </dl>
                <div id="delete-league"class="panel panel__full-width modal">
                  <div class="panel__header">
                    <h1 class="panel__title">Are you sure?</h1>
                  </div>
                  <div class="panel__body">
                    <div class="panel__message-wrapper">
                      <p class="panel__message">This action will delete this league which can&#39;t be undone. Delete this league?</p>
                      <div class="panel__actions">
                        <a href="" class="panel__actions__link">Yes</a>
                        <a href="" class="panel__actions__link">No</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="panel panel__full-width profile__panel">
              <div class="panel__header">
                <h1 class="panel__title">Standings</h1>
                <i class="fa fa-plus panel__header__add" v-on:click="revealAdd"></i>
              </div>
              <div class="panel__body">
                <ul class="panel__list">
                  <li class="panel__list__item" v-for="team in league.teams">
                      <router-link :to="'/teams/profile/' + team.name.replace(/\s/g, '')" class="panel__list__item__title"><i class="fa fa-futbol panel__list__item__title__icon" aria-hidden="true"></i>
                        {{team.name}}
                          <span class="right js-delete-team">
                            <i class="fa fa-times red"></i>
                          </span>
                      </router-link>
                  </li>
                  <li id="addForm" class="panel__list__item hidden">
                    <form class="panel__list__item__title" >
                      <input id="newTeam" class="panel__list__item__title__input" type="text" placeholder="Team Name"/>
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
</div>

</template>

<script>

import AppHeader from '../Header';
import rosteredData from '../../datasample.js';
import Router from 'vue-router';
import $ from 'jquery';

export default {
    name: 'LeagueProfile',
    components: {
        AppHeader
    },
    data: function() {
        let leagues = rosteredData.leagues;
        let leagueId;
        let currentLeague;

        leagues.map((league, i) => {
          if (league.name.replace(/\s/g, '') === this.$route.params.name) {
            leagueId = i;
            currentLeague = leagues[leagueId];
          }
        });

        const initialLeague = currentLeague;

        return {
            league: currentLeague,
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
        this.cachedLeague = Object.assign({}, this.league);
      },
      saveChange: function(e) {
        e.preventDefault();
        this.cachedLeague = Object.assign({}, this.league);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      cancelChange: function(e) {
        e.preventDefault();
        this.league = Object.assign({},this.cachedLeague);
        this.isEditing = !this.isEditing;
        $(".js-profile-options").hide();
      },
      revealAdd: function(e) {
        e.preventDefault();
        $("#addForm").slideToggle();
      }
    }
}

// let leagueId = this.$route;
// console.log(leagueId);

// let league = leagues[leagueId];

</script>
