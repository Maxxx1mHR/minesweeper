import startGame from './modules/startGame';

window.addEventListener('load', () => {
  startGame(25, 55);
  document.addEventListener('click', (event) => {
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(25, 55);
    }
  });
});
