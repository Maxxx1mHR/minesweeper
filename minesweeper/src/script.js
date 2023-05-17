import { createLayout, creatField } from './modules/createBaseLayout';
import startGame from './modules/startGame';
// import setFlag from './modules/setFlag';

window.addEventListener('load', () => {
  let currentLevelGameDifficult = '';
  let countMines = 10;

  // createLayout();
  // creatField(10);
  startGame(10, 10);

  // startGame(10, 10);
  // startGame(10, countMines);

  // document.querySelector('.minesweeper__wrapper').addEventListener('click', (event) => {
  //   if (event.target.closest('.minesweeper__wrapper')) {
  //     console.log(countMines);
  //     // startGame(10, 10);
  //   }
  // });

  let countFlags;
  document.addEventListener('click', (event) => {

    if (event.target.closest('.minesweeper__wrapper')) {
      console.log(countMines);
      // document.body.innerHTML = '';
      // createLayout();
      // creatField(10);
      // startGame(10, countMines);
    }


    // Клик по nee game
    if (event.target.closest('.minesweeper__new-game')) {
      document.body.innerHTML = '';
      // createLayout();
      // creatField(10);
      startGame(10, countMines);
    }

    // Клик по модалке (закрыть)
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      // createLayout();
      // creatField(10);
      startGame(10, countMines);
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
        // createLayout();
        // creatField(10);
        startGame(10, 10);
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Medium') {
        currentLevelGameDifficult = 'Medium';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        // createLayout();
        // creatField(15);
        startGame(15, 40);
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Hard') {
        currentLevelGameDifficult = 'Hard';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        // createLayout();
        // creatField(25);
        startGame(25, 99);
      }

      document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
      document.querySelector('.select').classList.remove('active');
    }
  });


  // document.addEventListener('mousemove', (event) => {
  //   if (event.target.closest('.settings__range')) {
  //     // console.log(event.target.closest('.settings__range').value);
  //     document.querySelector('.settings__count-mines').textContent = event.target.closest('.settings__range').value;
  //     countMines = document.querySelector('.settings__count-mines').textContent;
  //   }
  // });
  // document.querySelector('.settings__count-mines').textContent = countMines;

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
