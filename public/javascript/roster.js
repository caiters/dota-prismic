var doughnutChart = Vue.component('doughnut-chart', {
  extends: VueChartJs.Doughnut,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data() {
    return {
    };
  },
  computed: {
    races() {
      return this.$store.state.races
    },
    classes() {
      return this.$store.state.classes
    },
    totalMembers() {
      return this.guildies.length
    }
  },
  methods: {
    numberOfRace(raceId) {
      var membersOfRace = this.guildies.filter(function(member){
        return member.character.race.toString() === raceId;
      });
      return membersOfRace.length;
    },
    numberOfClass(classId) {
      var membersOfClass = this.guildies.filter(function(member){
        return member.character.class.toString() === classId;
      });
      return membersOfClass.length;
    }
  }
});

var guildFilters = Vue.component("guild-filters", {
  template: `<div class="filters">
    <div class="filters__input-group input-group m-b-xs">
      <label for="minimumLevelFilter" class="input-group__label">Enter Minimum member level to filter by:</label>
      <input id="minimumLevelFilter" name="minimumLevelFilter" type="number" v-model.number="filters.level" class="input-group__input" />
    </div>
    <div class="filters__input-group input-group m-b-xs">
      <label for="raceFilter" class="input-group__label">Filter by Race:</label>
      <select id="raceFilter" name="raceFilter" v-model.number="filterBy.race" @change="updateFilters('race')" class="input-group__input input-group__input--select">
        <option></option>
        <option v-for="(race, key) in races" :value="key">{{race}}</option>
      </select>
    </div>
    <div class="filters__input-group input-group m-b-xs">
      <label for="classFilter" class="input-group__label">Filter by Class:</label>
      <select id="classFilter" name="classFilter" v-model.number="filterBy.classId" @change="updateFilters('classId')" class="input-group__input input-group__input--select">
        <option></option>
        <option v-for="(classId, key) in classes" :value="key">{{classId}}</option>
      </select>
    </div>
  </div>`,
  created: function(){
    var app = this;
    if(app.rank){
      app.filterBy.rank = app.rank;
      app.updateFilters('rank');
    }
  },
  props: ["rank"],
  data: function() {
    return {
      filterBy: {},
      urlParams: {}
    };
  },
  watch: {
    rank: function(newval, oldval) {
      this.filterBy.rank = newval;
      this.updateFilters('rank');
    }
  },
  computed: {
    filters() {
      return this.$store.state.filters
    },
    races() {
      return this.$store.state.races
    },
    classes() {
      return this.$store.state.classes
    }
  },
  methods: {
    updateFilters(filterName){
      var app = this;
      this.$store.dispatch("updateFilters", {filterName, filter: app.filterBy[filterName]});
    }
  }
});

var guildWrapper = Vue.component('guild-stats', {
  template: `<div>
  <h2>{{totalMembers}} Members (at least level {{levelLimit}})</h2>
  <div class="guild-stats" v-if="guildies.length > 0">
    <h2 class="guild-stats__heading">Races</h2>
    <ul class="guild-stats__list">
      <li class="guild-stats__list-item" v-for="(race, key) in races" v-show="numberOfRace(key) > 0">
        <span class="guild-stats__item">{{race}}</span> <span class="guild-stats__number">{{numberOfRace(key)}}</span>
      </li>
    </ul>

    <h2 class="guild-stats__heading">Classes</h2>
    <ul class="guild-stats__list">
      <li class="guild-stats__list-item" v-for="(characterClass, key) in classes" v-show="numberOfClass(key) > 0">
        <span class="guild-stats__item">{{characterClass}}</span> <span class="guild-stats__number">{{numberOfClass(key)}}</span>
      </li>
    </ul>
  </div>
  </div>`,
  props: ['guildies', 'levelLimit'],
  data: function() {
    return {
    };
  },
  computed: {
    races() {
      return this.$store.state.races
    },
    classes() {
      return this.$store.state.classes
    },
    totalMembers() {
      return this.guildies.length
    }
  },
  methods: {
    numberOfRace(raceId) {
      var membersOfRace = this.guildies.filter(function(member){
        return member.character.race.toString() === raceId;
      });
      return membersOfRace.length;
    },
    numberOfClass(classId) {
      var membersOfClass = this.guildies.filter(function(member){
        return member.character.class.toString() === classId;
      });
      return membersOfClass.length;
    }
  }
});

var guildWrapper = Vue.component("guild-wrapper", {
  template: `<div>
  <h1>Guild Stats</h1>
  <guild-filters :rank="rank"></guild-filters>
  <div style="width: 500px">
    <doughnut-chart :chart-data="datacollection" :options="chartTestOptions" />
  </div>

  <guild-stats :guildies="filteredGuildies" :levelLimit="filters.level"></guild-stats>
  <h1>List of {{memberRank}}</h1>
  <div class="input-group m-t-sm m-b-sm">
  <label for="sortBy">Sort by...</label>
  <select name="sortBy" id="sortBy" v-model="sortBy" @change="sortGuildies()">
    <option value="level" selected>Level</option>
    <option value="alphabetical">Alphabetical</option>
  </select>
  </div>
  <ul class="member-list">
    <li v-for="member in filteredGuildies" class="member-list__member">
      <img :src="'https://us.battle.net/static-render/us/' + member.character.thumbnail"
        v-on:error="replaceImage($event)"
        alt=""
        class="member-list__image" />
      <p class="member-list__name">{{ member.character.name }}</p>
      <p class="member-list__desc">Level {{member.character.level}} {{getRaceName(member.character.race)}} {{getClassName(member.character.class)}}</p>
    </li>
  </ul>
  </div>`,
  props: ["rank", "memberRankTitle"],
  data: function() {
    return {
      sortBy: 'alphabetical',
      chartTestOptions: {
        responsive: true
      }
    };
  },
  computed: {
    memberRank: function(){
      switch(this.rank) {
        case '1,2,3':
          return 'Officers';
        case '4':
          return 'Big Sisters';
        default:
          return 'Guild Members';
      }
    },
    guild: function(){
      return this.$store.state.guild
    },
    races: function(){
      return this.$store.state.races
    },
    classes: function(){
      return this.$store.state.classes
    },
    filters: function(){
      return this.$store.state.filters
    },
    filteredGuildies: function (){
      return this.filterGuildies()
    },
    classArray() {
      let classArr = [];
      const that = this;
      Object.keys(that.classes).forEach(function(key) {
        classArr.push(that.classes[key]);
      });
      console.log(classArr);
      return classArr;
    },
    datacollection() {
      return {
        labels: this.classArray,
        datasets: [
          {
            backgroundColor: this.generateChartColors(),
            data: this.generateChartData()
          }
        ]
      }
    }
  },
  methods: {
    generateChartColors() {
      const classObj = this.classes;
      const colorObj = this.$store.state.classColors;
      const colors = [];
      Object.keys(classObj).forEach((key) => {
        colors.push(colorObj[key]);
      });
      return colors;
    },
    generateChartData() {
      const that = this;
      const classObj = this.classes;
      const dataPoints = [];
      Object.keys(classObj).forEach(function(key) {
        dataPoints.push(that.numberOfClass(key));
      });
      return dataPoints;
    },
    numberOfClass(classId) {
      const membersOfClass = this.filteredGuildies.filter(function(member){
        return member.character.class.toString() === classId;
      });
      return membersOfClass.length;
    },
    replaceImage(event) {
      // if the image returns a 404 we'll replace it with a placeholder
      event.target.src = "data:image/gif;base64,R0lGODlhVABUAJEAAKurq76+vs7Ozp2dnSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI5QjQxNjlEMjZDMTFFNzhERTNGNkEzMzkyMjc3NDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI5QjQxNkFEMjZDMTFFNzhERTNGNkEzMzkyMjc3NDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjlCNDE2N0QyNkMxMUU3OERFM0Y2QTMzOTIyNzc0MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MjlCNDE2OEQyNkMxMUU3OERFM0Y2QTMzOTIyNzc0MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAABUAFQAAAL/lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuSwXyLMNhAADDzg9AYOvgesTdDxi8DItMHzJJ0TWbP+hEOqUCrBBsdlrlLgLfsk+sWJqzT7TAu6a6Der4dP62l9vWup65hUb2lxXGBUdYxBfkl0gU2Of4tQiDKNkDmWR5aUTZMsjZ5MkCGqqY1GhqxLipOorSqnr2UipbZEhqW/hKUqv7mHlTg+D7i8mboYMba3yEXCFlyGzs4xOsARpGbXedzHM0vc3zHBEuLip07kj+oO7Y/TBsYO5+yy5AViVTvx4TTc/PngQZOQJygkcMB0CDbB4sZPgFlwKItiQioKhL3kWMShUz7eOoC9xDkCRLfjP56wfKjgJW2gLiUpbKmDRjjqx5qyXOSzB3SprpM6jQoUSLGj2KNKnSpUyH3hTas+kpnVIfRa36CKvWOAUAADs=";
    },
    sortGuildies(members = this.filteredGuildies) {
      var app = this;
      return members.sort(function(a, b){
        //sort by level
        if(app.sortBy === 'level') {
          if(a.character.level < b.character.level) {
            return 1;
          }
          if(a.character.level > b.character.level) {
            return -1;
          }
          if(a.character.name < b.character.name) {
            return -1;
          }
          if(a.character.name > b.character.name) {
            return 1;
          }
          return 0;
        }
        if(app.sortBy === 'alphabetical') {
          if(a.character.name < b.character.name) {
            return -1;
          }
          if(a.character.name > b.character.name) {
            return 1;
          }
          return 0;
        }
      })
    },
    getRaceName: function(raceId) {
      return this.races[raceId]
    },
    getClassName: function(classId) {
      return this.classes[classId]
    },
    filterGuildies: function(){
      const app = this;

      let members = app.$store.state.guild.members || [];

      function filterMember(member) {
        let returnMember;
        let filtersArray = Object.keys(app.filters);

        for(let i = 0; i < filtersArray.length; i++){
          if(typeof(app.filters[filtersArray[i]]) === 'string' || (typeof(app.filters[filtersArray[i]] === 'number') && filtersArray[i] !== 'level')) {
            // rank is the only top level filter so treat it separately
            if(filtersArray[i] === 'rank') {
              let ranks = app.filters[filtersArray[i]].split(',');
              if (ranks.indexOf(member[filtersArray[i]].toString()) > -1) {
                returnMember = member;
              } else {
                returnMember = undefined;
                break;
              }
            } else if(filtersArray[i] === 'classId') {
              // because classId !== class, we have to do this special check...
              if(member.character['class'] === app.filters[filtersArray[i]]) {
                returnMember = member;
              } else {
                returnMember = undefined;
                break;
              }
            } else { // not class
              if(member.character[filtersArray[i]] === app.filters[filtersArray[i]]) {
                returnMember = member;
              } else {
                returnMember = undefined;
                break;
              }
            }
            // level
          } else if( typeof (app.filters[filtersArray[i]] === 'number') && filtersArray[i] === 'level'){
            if(member.character[filtersArray[i]] >= app.filters[filtersArray[i]]) {
              returnMember = member;
            } else {
              returnMember = undefined;
              break;
            }
          }
        }

        return returnMember;
      }

      let filtered = members.reduce(function(filteredMembers, member) {
        let filteredMember = filterMember(member);
        return typeof (filteredMember) === "undefined" ? filteredMembers : filteredMembers.concat(filteredMember);
      }, []);

      if(app.sortBy) {
        return app.sortGuildies(filtered);
      }
      return filtered;
    }
  }
});

const get = path => fetch(path, { credentials: 'same-origin' }).then(res => res.json());

const store = new Vuex.Store({
  state: {
    classColors: {
      1: '#c79c6e', /* warrior */
      2: '#f58cba', /* paladin */
      3: '#abd473', /* hunter */
      4: '#fff569', /* rogue */
      5: '#ffffff', /* priest */
      6: '#c41f3b', /* death knight */
      7: '#0070de', /* shaman */
      8: '#69ccf0', /* mage */
      9: '#9482c9', /* warlock */
      10: '#00ff96', /* monk */
      11: '#ff7d0a', /* druid */
      12: '#a330c9' /* demon hunter */
    },
    guild: {},
    races: {},
    classes: {},
    filters: {
      level: 110,
    },
    loading: 0,
  },
  mutations: {
    loading: (state) => {
      return Object.assign(state, { loading: state.loading + 1 });
    },
    doneLoading: (state) => {
      return Object.assign(state, { loading: Math.max(0, state.loading - 1) });
    },
    setGuildMembers: (state, data) => {
      return Object.assign(state, { guild: data });
    },
    setRaces: (state, data) => {
      let allianceRaces = {};

      // get only races marked as alliance
      let allianceRaceArray = data.races.filter(function(race){
        return race.side === "alliance";
      });

      // update allianceRaces object with each alliance race in the format we want
      allianceRaceArray.forEach(function(race){
        allianceRaces[race.id] = race.name;
      });

      return Object.assign(state, { races: allianceRaces });
    },
    setClasses: function(state, data){
      let classes = {};

      // update classes object with each class in the format we want
      data.classes.forEach(function(classObj){
        classes[classObj.id] = classObj.name;
      });
      return Object.assign(state, { classes: classes });
    },
    setFilter: function(state, filterObj) {
      let name = filterObj.filterName;
      let filter = filterObj.filter;
      return Vue.set(state.filters, name, filter);
    },
    removeFilter: function(state, filterObj) {
      return Vue.delete(state.filters, filterObj.filterName);
    }
  },
  actions: {
    load: function(context) {
      context.commit('loading');
      let guildies = get('https://us.api.battle.net/wow/guild/Bronzebeard/Daughters%20OfThe%20Alliance?fields=members&locale=en_US&apikey=cb6fsvp6pvf5h7hz9sw2th4p9aax4ywp')
        .then(function(guildies) {
          context.commit('setGuildMembers', guildies);
        });
      let races = get('https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=cb6fsvp6pvf5h7hz9sw2th4p9aax4ywp')
        .then(function(races){
          context.commit('setRaces', races);
        });
      let classes = get('https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=cb6fsvp6pvf5h7hz9sw2th4p9aax4ywp')
        .then(function(classes){
          context.commit('setClasses', classes);
          console.log(classes);
        });
      return Promise.all([guildies, races, classes]).then(function() {
        context.commit('doneLoading');
      });
    },
    updateFilters: function(context, filterObj) {
      if(filterObj.filter){
        // if the filter itself is set to something, we add/update it
        context.commit('setFilter', filterObj);
      } else {
        // if the filter is empty, we'll remove it from the filters
        context.commit('removeFilter', filterObj);
      }
    }
  }
});

const routes = [
  { path: '/', component: guildWrapper, props: (route) => ({ rank: route.query.rank || '' }) },
];

const router = new VueRouter({
  routes: routes,
});

const app = new Vue({
  el: '#dotaRoster',
  router,
  store,
  mounted: () => store.dispatch('load'),
  computed: {
  },
  methods: {
  },
}).$mount('#dotaRoster');
