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
