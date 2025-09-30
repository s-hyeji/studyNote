// navToggle.js


const navBtn = document.querySelector('.header__toggle');
const body = document.querySelector('.layout__body');

navBtn.addEventListener('click', () => {
  body.classList.toggle('--nav-open');
});