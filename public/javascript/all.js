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
  const firstRaidToCheck = 35; // Emerald Nightmare
  const apiKey = 'nsyrekgfx9hzwxkav7bzed8pxygzd7h8';

  const model = {
    init() {
      fetch(`https://us.api.battle.net/wow/character/bronzebeard/Alazais?fields=progression&locale=en_US&apikey=${apiKey}`)
        .then(res => res.json())
        .then((res) => {
          this.data = res;
          controller.completeInit();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    data: {}
  };

  const controller = {
    init() {
      model.init();
    },
    completeInit() {
      console.log('finish initialization');
      view.init(this.getData());
    },
    getData() {
      return model.data;
    }
  };

  const view = {
    init(data) {
      console.log('view init');
      console.log(data);
      console.log(data.progression.raids.length)
      let raidIdToCheck = data.progression.raids.length - 1;
      const lastRaid = data.progression.raids[raidIdToCheck];
      if (lastRaid.normal === 0) {
        console.log('did not complete last raid');
        raidIdToCheck -= raidIdToCheck;
      } else {
        console.log('last raid completed');
      }
    }
  };

  controller.init();
}
