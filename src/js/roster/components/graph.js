var graph = Vue.component('graph', {
  template: `<svg width="800" height="800"></svg>`,
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
  mounted: function(){
    // const svg = d3.select("svg");
    // let pie = d3.pie()
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
