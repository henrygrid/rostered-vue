

<template>

<div>
    <appHeader></appHeader>
    <div class="content">
        <search></search>
        <div class="panel panel__full-width">
            <div class="panel__header">
                <h1 class="panel__title">Leagues</h1>
            </div>
            <div class="panel__body">
                <ul class="panel__list">
                    <li class="panel__list__item" v-for="league in leagues">
                        <router-link :to="'/leagues/profile/' + league.name.replace(/\s/g, '')" class="panel__list__item__title"><i v-bind:class="league.icon" aria-hidden="true"></i> {{league.name}}</router-link>
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
import firebase from 'firebase';

export default {
    name: 'LeagueDashboard',
    components: {
        AppHeader,
        Search
    },
    data: function() {
        // let leagues = rosteredData.leagues;

        let stats;

        const dataBase = firebase.database().ref('data');
        dataBase.on('value', (snapshot) => {
          stats = snapshot.val();
        });

        let leagues = stats.leagues;

        return {
            leagues: leagues
        }
    }
}

</script>
