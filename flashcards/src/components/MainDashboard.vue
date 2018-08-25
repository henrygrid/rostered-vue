<style scoped>

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

</style>

<template>

<div>
    <appHeader></appHeader>
    <dashboard :stats="msg"></dashboard>
</div>

</template>

<script>

import AppHeader from './Header';
import Dashboard from './dashboard/Dashboard';
import rosteredData from '../datasample.js';
import firebase from 'firebase';

export default {
    name: 'MainDashboard',
    components: {
        AppHeader,
        Dashboard,
    },
    data() {
        return {
            msg: 'Hello',
            title: 'test',
            stats: {},
            // statsData: rosteredData,
        };
    },
};

</script>
