<template>
  <div class="search__wrapper">
    <input type="text" class="search__input" v-on:keyup.enter="searchData"/>
    <a href="" class="search__submit" v-on:click="searchData"><span>Search</span></a>
    <div id="search-results">
            <div class="panel__body">
              <ul class="panel__list">
                 <li class="panel__list__item" v-for="result in results">
                   <router-link :to="'/' + result.path + '/profile/' + result.name.replace(/\s/g, '')" class="panel__list__item__title">{{result.category}}: {{result.name}}</router-link>
                 </li>
              </ul>
            </div>
        </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import $ from 'jquery';
import rosteredData from '../datasample.js';
import firebase from 'firebase';

export default {
    name: 'Search',
    data: function() {

      // let leagues = rosteredData.leagues;
      let leagueId;
      let teamId;
      let playerId;
      let currentPlayer;
      let teams;
      let players;
      let results = [];
      let stats;

      const dataBase = firebase.database().ref('data');
      dataBase.on('value', (snapshot) => {
        stats = snapshot.val();
      });

      let leagues = stats.leagues;

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
            leagues: leagues,
            players: players,
            teams: teams,
            isEditing: false,
            leagueId: leagueId,
            teamId: teamId,
            playerId: playerId,
            results: results,
        }
    },
    methods: {
      searchData(e) {
        e.preventDefault();
        let leagues = this.leagues;
        let toTitleCase = function(str) {
            return str.replace(/\w\S*/g, function(txt){
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }

        function getSearchValue() {
          var searchValue = document.querySelector(".search__input").value;
          searchValue = searchValue.toLowerCase();
          return searchValue;
        }

        let inputVal = getSearchValue();

        leagues.map((league, i) => {
          let leagueIndex = i;
          if (league.name.toLowerCase().indexOf(inputVal) > -1) {
            this.results.push(
              {
                path: "leagues",
                category: "League",
                name: league.name,
                leagueName: league.name,
                leagueId: leagueIndex
              }
            );
          }

          league.teams.map((team, i) => {
            let teamIndex = i;
            if (team.name.toLowerCase().indexOf(inputVal) > -1) {
              this.results.push(
                {
                  path: "teams",
                  category: "Team",
                  name: team.name,
                  teamName: team.name,
                  teamId: teamIndex,
                  leagueName: league.name,
                  leagueId: leagueIndex
                }
              );
            }

            team.players.map((player, i) => {
              let playerIndex = i;
              if (player.name.toLowerCase().indexOf(inputVal) > -1) {
                this.results.push(
                  {
                    path: "players",
                    category: "Player",
                    name: player.name,
                    playerName: player.name,
                    playerId: playerIndex,
                    teamName: team.name,
                    teamId: teamIndex,
                    leagueName: league.name,
                    leagueId: leagueIndex
                  }
                );
              }
            });

          });

        });
        $("#search-results").show();

      },
    },
}
</script>
