import startGame from './modules/startGame';
// import setFlag from './modules/setFlag';

window.addEventListener('load', () => {
  startGame(25, 99);
  let countFlags;
  document.addEventListener('click', (event) => {
    if (event.target.closest('.minesweeper__new-game')) {
      document.body.innerHTML = '';
      startGame(25, 99);
    }

    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(25, 99);
      // countFlags = 0;
    }
  });

  document.addEventListener('contextmenu', (event) => event.preventDefault());
  document.addEventListener('mousedown', (event) => {
    const count = +document.querySelector('.minesweeper__bombs span').textContent;

    if (event.target.classList.contains('minesweeper__button') && event.button === 2) {
      countFlags = +document.querySelector('.minesweeper__flags span').textContent;
      if (event.target.classList.contains('flag')) {
        event.target.classList.remove('flag');
        countFlags -= 1;
        document.querySelector('.minesweeper__bombs span').textContent = count + 1;
      } else {
        event.target.classList.add('flag');
        countFlags += 1;
        document.querySelector('.minesweeper__bombs span').textContent = count - 1;
      }
      document.querySelector('.minesweeper__flags span').textContent = countFlags;
    }
  });
});
