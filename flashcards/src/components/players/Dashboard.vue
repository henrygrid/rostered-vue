

<template>

<div>
    <appHeader></appHeader>
    <div class="content">
        <search></search>
        <div class="panel panel__full-width">
            <div class="panel__header">
                <h1 class="panel__title">Players</h1>
            </div>
            <div class="panel__body">
                <ul class="panel__list">
                    <li class="panel__list__item" v-for="player in players">
                        <router-link :to="'/players/profile/' + player.name.replace(/\s/g, '')" class="panel__list__item__title">{{player.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import AppHeader from '../Header';
import rosteredData from '../../datasample.js';
import Router from 'vue-router';
import Search from '../Search.vue';

var players = [];

rosteredData.leagues.map((league) => {
    league.teams.map((team) => {
        team.players.map((player) => {
            players.push(player);
        });
    });
});

export default {
    name: 'PlayerDashboard',
    components: {
        AppHeader,
        Search,
    },
    data: function() {
        return {
            players: players
        }
    }
}

</script>
