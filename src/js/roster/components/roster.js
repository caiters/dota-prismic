var guildWrapper = Vue.component("guild-wrapper", {
  template: `<div>
  <h1>Guild Stats</h1>
  <guild-filters :rank="rank"></guild-filters>

  <guild-stats :guildies="filteredGuildies" :levelLimit="filters.level"></guild-stats>
  <h1>List of {{memberRank}}</h1>
  <div class="input-group">
  <label for="sortBy">Sort by...</label>
  <select name="sortBy" id="sortBy" v-model="sortBy" @change="sortGuildies()">
    <option value="level" selected>Level</option>
    <option value="alphabetical">Alphabetical</option>
  </select>
  </div>
  <ul class="member-list">
    <li v-for="member in filteredGuildies" class="member-list__member">
      <img src="data:image/gif;base64,R0lGODlhVABUAJEAAKurq76+vs7Ozp2dnSH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI5QjQxNjlEMjZDMTFFNzhERTNGNkEzMzkyMjc3NDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjI5QjQxNkFEMjZDMTFFNzhERTNGNkEzMzkyMjc3NDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjlCNDE2N0QyNkMxMUU3OERFM0Y2QTMzOTIyNzc0MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MjlCNDE2OEQyNkMxMUU3OERFM0Y2QTMzOTIyNzc0MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAABUAFQAAAL/lI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuSwXyLMNhAADDzg9AYOvgesTdDxi8DItMHzJJ0TWbP+hEOqUCrBBsdlrlLgLfsk+sWJqzT7TAu6a6Der4dP62l9vWup65hUb2lxXGBUdYxBfkl0gU2Of4tQiDKNkDmWR5aUTZMsjZ5MkCGqqY1GhqxLipOorSqnr2UipbZEhqW/hKUqv7mHlTg+D7i8mboYMba3yEXCFlyGzs4xOsARpGbXedzHM0vc3zHBEuLip07kj+oO7Y/TBsYO5+yy5AViVTvx4TTc/PngQZOQJygkcMB0CDbB4sZPgFlwKItiQioKhL3kWMShUz7eOoC9xDkCRLfjP56wfKjgJW2gLiUpbKmDRjjqx5qyXOSzB3SprpM6jQoUSLGj2KNKnSpUyH3hTas+kpnVIfRa36CKvWOAUAADs="
        :data-src="'https://us.battle.net/static-render/us/' + member.character.thumbnail" 
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
      sortBy: 'alphabetical'
    };
  },
  created: function() {
  },
  mounted: function(){
    
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
    }
  },
  methods: {
    replaceImage: function(event) {
      // if the image returns a 404 we'll replace it with a placeholder
      event.target.src = "http://www.placeunicorn.com/84x84";
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
          } else if( typeof(app.filters[filtersArray[i]] === 'number') && filtersArray[i] === 'level'){
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
        return typeof(filteredMember) === "undefined" ? filteredMembers : filteredMembers.concat(filteredMember);
      }, []);

      if(app.sortBy) {
        return app.sortGuildies(filtered);
      }
      return filtered;
    }
  }
});
