

<template>

<div>
    <appHeader></appHeader>
    <div class="content">
    <div class="profile__container">
        <div class="profile">
            <div class="profile__left">
                <h1 class="profile__left__title">{{player.name}}</h1>
                <div class="profile__left__image">
                    <img src="http://via.placeholder.com/200x200" />
                </div>
            </div>
            <div class="profile__right">
                <div class="profile__right__links">
                    <a href="" class="profile__right__links__button"><i class="fa fa-ellipsis-v"></i></a>
                    <ul class="profile__right__links__menu js-profile-options">
                        <li class="profile__right__links__menu__item">
                            <a href="" class="profile__right__links__menu__item__link">Edit Player</a>
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
  </div>
</div>

</template>

<script>

import AppHeader from '../Header';
import rosteredData from '../../datasample.js';
import Router from 'vue-router';

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

      leagues.map((league, i) => {
        leagueId = i;
        league.teams.map((team, i) => {
          teamId = i;
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
        }
    }
}

</script>
