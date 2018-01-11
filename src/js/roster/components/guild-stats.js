var guildWrapper = Vue.component("guild-stats", {
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
  props: ["guildies", "levelLimit"],
  data: function() {
    return {
    };
  },
  created: function() {
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
