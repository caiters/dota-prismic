(() => {
  const navToggle = document.querySelector('.js--nav-toggle');
  navToggle.addEventListener('click', (e) => {
    navToggle.classList.toggle('nav-toggle--open');
  });
})();
