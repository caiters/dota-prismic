const get = path => fetch(path, { credentials: 'same-origin' }).then(res => res.json());

const store = new Vuex.Store({
  state: {
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
