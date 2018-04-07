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
