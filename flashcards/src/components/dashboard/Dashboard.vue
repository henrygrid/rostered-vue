

<template>

<div class="content">
    <search></search>
    <h1 class="content__header">Dashboard</h1>
    <article class="panel">
        <div class="panel__header">
            <h1 class="panel__title">Stats</h1>
        </div>
        <div class="panel__body">
            <ul class="panel__list">
                <li class="panel__list__item">
                    <h2 class="panel__list__item__title" v-on:click="toggleStats">Standings</h2>
                    <ul class="panel__sublist">
                        <li class="panel__sublist__item">
                            <div class="panel__list__item__header">
                                <span class="panel__list__item__header--rank">Rank</span>
                                <span class="panel__list__item__header--team">Team</span>
                                <span class="panel__list__item__header--record">Record</span>
                            </div>
                            <div class="panel__field">
                                <div class="panel__field__stats">
                                    <span class="panel__field__stat panel__field__stat__rank">1</span>
                                    <p class="panel__field__stat panel__field__stat__name">2</p>
                                    <p class="panel__field__stat panel__field__stat__value">3</p>
                                    <div class="panel__field__links">
                                        <i class="fa fa-edit" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="panel__list__item">
                    <h2 class="panel__list__item__title" v-on:click="toggleStats">Top Scorers</h2>
                    <ul class="panel__sublist">
                        <li class="panel__sublist__item">
                            <div class="panel__field">
                                <div class="panel__field__column column-two-thirds">
                                    <p class="panel__field__stat__name"></p>
                                </div>
                                <div class="panel__field__column column-one-third">
                                    <p class="panel__field__stat__value"></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </article>
</div>

</template>

<script>
import Search from '../Search.vue';
import $ from 'jquery';
import rosteredData from '../../datasample.js';

export default {
    name: 'Dashboard',
    components: {
      Search,
    },
    methods: {
        toggleStats: function(e) {
            var el = e.target;
            $(el).next(".panel__sublist").slideToggle();
        },
    },
    data: function() {
        return {
            stats: rosteredData
        }
    }
}

</script>
