if (document.querySelector('#progression')) {
  const apiKey = 'nsyrekgfx9hzwxkav7bzed8pxygzd7h8';

  const model = {
    init() {
      return fetch(`https://us.api.battle.net/wow/character/bronzebeard/Alazais?fields=progression&locale=en_US&apikey=${apiKey}`)
        .then(res => res.json())
        .then((res) => {
          this.data = res;
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    data: {}
  };

  const didStartRaid = R.complement(R.propEq('normal', 0));

  const controller = {
    init() {
      model.init().then(this.completeInit.bind(this));
    },
    completeInit() {
      view.init(this.getData());
    },
    getData() {
      return model.data;
    },
    findMostRecentRaid: R.findLast(didStartRaid),
  };

  const view = {
    init(data) {
      const mostRecentRaid = controller.findMostRecentRaid(data.progression.raids);
      const html = this.buildHtml(mostRecentRaid);
      const divtoBuild = document.querySelector('#progression');
      divtoBuild.innerHTML = html;
    },
    buildHtml(raid) {
      let html = `
        <h3 class="progression__raid-name">${raid.name}</h3>
      `;
      html += this.getRaidHtml(raid, 'normal');
      html += this.getRaidHtml(raid, 'heroic');
      return html;
    },
    getRaidHtml(raid, difficulty) {
      let html = '';
      const bossNumbers = this.getBossNumbers(raid.bosses, difficulty);
      // capitalize first letter of difficulty in h4
      html += `
        <h4 class="progression__raid-difficulty">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
      `;
      html += `<p>${bossNumbers}/${raid.bosses.length} ${bossNumbers < raid.bosses.length ? '' : ' - Complete!'}</p>`;
      if (bossNumbers < raid.bosses.length) {
        html += `
          <ul class="progression__list">${this.getBossKillHtml(raid.bosses, difficulty)}</ul>
          `;
      }
      return html;
    },
    getBossNumbers(bosses, difficulty) {
      const difficultyKills = `${difficulty}Kills`;
      const killedBosses = bosses.filter(boss => boss[difficultyKills] > 0);
      return killedBosses.length;
    },
    getBossKillHtml(bosses, difficulty) {
      let html = '';
      const difficultyKills = `${difficulty}Kills`;

      bosses.forEach((boss) => {
        html += `<li ${boss[difficultyKills] > 0 ? 'class="progression__defeated progression__boss"' : 'progression__boss'}>${boss.name}</li>`;
      });

      return html;
    }
  };

  controller.init();
}
