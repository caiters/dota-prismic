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
