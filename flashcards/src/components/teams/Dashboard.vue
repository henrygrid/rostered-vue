

<template>

<div>
    <appHeader></appHeader>
    <div class="content">
        <div class="panel panel__full-width">
            <div class="panel__header">
                <h1 class="panel__title">Teams</h1>
            </div>
            <div class="panel__body">
                <ul class="panel__list">
                    <li class="panel__list__item" v-for="team in teams">
                        <router-link :to="'/teams/profile/' + team.name.replace(/\s/g, '')" class="panel__list__item__title">{{team.name}}</router-link>
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

var teams = [];

rosteredData.leagues.map((league) => {
    league.teams.map((team) => {
        teams.push(team);
    });
});
console.log(teams);

export default {
    name: 'TeamDashboard',
    components: {
        AppHeader,
    },
    data: function() {
        return {
            teams: teams
        }
    }
}

</script>
