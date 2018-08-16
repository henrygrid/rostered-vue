

<template>

<header class="App-header">
    <h1 class="App-title">Rostered</h1>
    <nav class="App-nav">
        <ul class="App-nav__list">
            <li class="App-nav__list__item"><router-link to="/" class="App-nav__list__item__link">Home</router-link></li>
            <li class="App-nav__list__item"><router-link to="/leagues" class="App-nav__list__item__link">Leagues</router-link></li>
            <li class="App-nav__list__item"><router-link to="/teams" class="App-nav__list__item__link">Teams</router-link></li>
            <li class="App-nav__list__item"><router-link to="/players" class="App-nav__list__item__link">Players</router-link></li>
            <li class="App-nav__list__item"><a href="" class="App-nav__list__item__link">Schedule</a></li>
            <li class="App-nav__list__item">
                <a href="" href="" class="App-nav__list__item__profile"></a>
                <ul class="App-nav__list__item__sublist">
                    <li class="App-nav__list__item__sublist__item"><a href="" class="App-nav__list__item__sublist__item__link">Profile</a></li>
                    <li class="App-nav__list__item__sublist__item"><a href="" class="App-nav__list__item__sublist__item__link">Settings</a></li>
                    <li class="App-nav__list__item__sublist__item"><a href="" class="App-nav__list__item__sublist__item__link">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</header>

</template>

<script type="text/javascript">

import Router from 'vue-router';

export default {
    name: 'Header'
}

</script>
