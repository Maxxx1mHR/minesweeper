import startGame from './modules/startGame';

window.addEventListener('load', () => {
  startGame(10, 5);
  document.addEventListener('click', (event) => {
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(10, 5);
    }
  });
});
