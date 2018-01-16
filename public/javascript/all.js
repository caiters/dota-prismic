(() => {
  const navToggle = document.querySelector('.js--nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const siteBody = document.querySelector('body');
  const siteWrapper = document.querySelector('.site-wrapper');

  // mobile nav
  function toggleMainNav() {
    mainNav.classList.toggle('main-nav--open');
    siteBody.classList.toggle('nav-open');
  }

  // mobile nav
  navToggle.addEventListener('click', (e) => {
    navToggle.classList.toggle('nav-toggle--open');
    siteWrapper.classList.toggle('site-wrapper--nav-open');
    toggleMainNav();
  });
})();
