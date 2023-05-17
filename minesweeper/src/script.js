import startGame from './modules/startGame';
// import setFlag from './modules/setFlag';

window.addEventListener('load', () => {
  let currentLevelGameDifficult = '';
  // let timerId;

  startGame(25, 99);
  let countFlags;
  document.addEventListener('click', (event) => {
    // Клик по nee game
    if (event.target.closest('.minesweeper__new-game')) {
      document.body.innerHTML = '';
      startGame(25, 99);
    }

    // Клик по модалке (закрыть)
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(25, 99);
    }

    // Выбор уровня сложнолсти
    if (event.target.closest('.select__button')) {
      event.target.closest('.select').classList.toggle('active');
    }
    if (event.target.closest('.select__option')) {
      if (event.target.closest('.select__option').children[0].textContent === currentLevelGameDifficult) {
        document.querySelector('.select').classList.remove('active');
        return;
      }

      if (event.target.closest('.select__option').children[0].textContent === 'Easy') {
        currentLevelGameDifficult = 'Easy';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(10, 10);
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Medium') {
        currentLevelGameDifficult = 'Medium';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(15, 10);
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Hard') {
        currentLevelGameDifficult = 'Hard';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(25, 10);
      }

      document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
      document.querySelector('.select').classList.remove('active');
    }
  });

  // ПКМ. Добавление флагов и мин
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
