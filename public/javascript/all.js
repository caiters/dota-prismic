(() => {
  const navToggle = document.querySelector('.js--nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.querySelector('body');
  const siteBody = document.querySelector('#siteBody');
  const siteWrapper = document.querySelector('.site-wrapper');
  const skipNav = document.querySelector('.js--skip-nav');

  // mobile nav
  function toggleMainNav() {
    mainNav.classList.toggle('main-nav--open');
    body.classList.toggle('nav-open');
  }

  // mobile nav
  navToggle.addEventListener('click', (e) => {
    navToggle.classList.toggle('nav-toggle--open');
    siteWrapper.classList.toggle('site-wrapper--nav-open');
    toggleMainNav();
  });

  // skip nav link
  skipNav.addEventListener('click', (e) => {
    e.preventDefault();
    siteBody.setAttribute('tabindex', '-1');
    siteBody.focus();
    siteBody.removeAttribute('tabindex');
  });
})();

if (document.querySelector('#progression')) {
  const apiKey = 'nsyrekgfx9hzwxkav7bzed8pxygzd7h8';

  const model = {
    init(callback) {
      fetch(`https://us.api.battle.net/wow/character/bronzebeard/Alazais?fields=progression&locale=en_US&apikey=${apiKey}`)
        .then(res => res.json())
        .then((res) => {
          this.data = res;
          callback(res);
          controller.completeInit();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    data: {}
  };

  const controller = {
    raidIdToCheck: 0,
    init() {
      model.init((data) => {
        this.raidIdToCheck = data.progression.raids.length - 1;
      });
    },
    completeInit() {
      view.init(this.getData());
    },
    getData() {
      return model.data;
    },
    getSpecificRaidData(id) {
      return model.data.progression.raids[id];
    },
    findMostRecentRaid(raids) {
      if (this.didStartRaid(raids[this.raidIdToCheck])) {
        return raids[this.raidIdToCheck];
      } else if (this.raidIdToCheck === 0) {
        return false;
      }
      this.raidIdToCheck -= 1;
      this.findMostRecentRaid(raids);
    },
    didStartRaid(raid) {
      if (raid.normal === 0) {
        return false;
      }
      return true;
    }
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
        <h3>${raid.name}</h3>
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
        <h4>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
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
