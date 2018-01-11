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
