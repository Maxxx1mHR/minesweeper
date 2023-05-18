import { createLayout } from './modules/createBaseLayout';
import createModal from './modules/modal';
import {
  generateMines,
  IsExistCells,
  isMine,
  getMinesCount,
  openMinesCells,
} from './modules/mines';
import switchTheme from './modules/theme';

import startGame from './modules/startGame';
import { addSoundByClick, addSondFlagSet, addSondFlagDelete, offSound } from './modules/clickSound';

// import setFlag from './modules/setFlag';

window.addEventListener('load', () => {
  switchTheme();
  offSound();
  addSoundByClick();
  // let statusGenerateMines = true;
  let sizeField = 10;
  let mines = '';
  let timerId;
  let countMove = 0; // счетчик ходов
  // let timeGame = 0;
  let countMines = 10;
  let countFlags;
  let openCell = 0; // счетчик открытых ячеек
  let currentLevelGameDifficult = 'Easy';
  // let countMines = 10;
  let statusGenerateMines = true;

  // startGame(10, 10);

  createLayout(sizeField);
  // document.querySelector('.settings__count-mines').textContent = countMines;


  const openCells = (row, column) => {
    const minesweeper = document.querySelector('.minesweeper__wrapper');
    const cells = [...minesweeper.children]; // Получение всех ячеек поля
    // console.log('cells1 ', cells);

    if (!IsExistCells(sizeField, row, column)) return;

    const index = row * sizeField + column;
    const cell = cells[index];

    if (cell.classList.contains('minesweeper__button_disabled')) {
      return;
    }
    if (cell.classList.contains('flag')) {
      return;
      // const flag = document.querySelector('.minesweeper__flags span').textContent;
      // document.querySelector('.minesweeper__flags span').textContent = flag - 1;
    }

    cell.classList.add('minesweeper__button_disabled');
    openCell += 1;

    if (isMine(sizeField, mines, row, column)) {
      openMinesCells(mines, cells);
      createModal(false, timerId);

      document.querySelector('.modal').classList.add('modal__active');

      return;
    }

    const count = getMinesCount(sizeField, mines, row, column);

    if (count === 1) {
      cell.classList.add('one_blue');
    }
    if (count === 2) {
      cell.classList.add('two_green');
    }
    if (count === 3) {
      cell.classList.add('three_red');
    }
    if (count === 4) {
      cell.classList.add('four_dark-blue');
    }
    if (count === 5) {
      cell.classList.add('five_brown');
    }
    if (count === 6) {
      cell.classList.add('six_turquoise');
    }
    if (count === 7) {
      cell.classList.add('seven_black');
    }
    if (count === 8) {
      cell.classList.add('eight_white');
    }

    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }

    openCells(row, column - 1);
    openCells(row, column + 1);
    openCells(row + 1, column - 1);
    openCells(row + 1, column);
    openCells(row + 1, column + 1);
    openCells(row - 1, column - 1);
    openCells(row - 1, column);
    openCells(row - 1, column + 1);
  };

  // document.querySelector('.minesweeper__wrapper').addEventListener('click', (event) => {
  //   // Выполнится один раз. Генерация бомб и запуск таймера при первом клике
  //   if (statusGenerateMines) {
  //     const clickedButton = cells.indexOf(event.target);
  //     mines = generateMines(sizeField, countMines, clickedButton);

  //     timerId = setInterval(() => {
  //       timeGame += 1;
  //       document.querySelector('.minesweeper__time span').textContent = timeGame;
  //     }, 1000);
  //     statusGenerateMines = false;
  //     // Оставшееся количество бомб
  //     // const countFlags = +document.querySelector('.minesweeper__flags span').textContent;
  //     // document.querySelector('.minesweeper__bombs span').textContent = mines.length - countFlags;
  //   }
  //   // Количество ходов
  //   countMove += 1;
  //   document.querySelector('.minesweeper__count-moves span').textContent = countMove;

  //   // Открытие ячеек при клике
  //   const index = cells.indexOf(event.target);
  //   const column = index % sizeField;
  //   const row = Math.floor(index / sizeField);
  //   openCells(row, column);

  // });

  document.addEventListener('click', (event) => {

    // console.log(currentLevelGameDifficult);
    // let currentLevelGameDifficult = '';
    // console.log(sizeField);
    let timeGame = 0;
    // Клик по ячейкам
    if (event.target.closest('.minesweeper__wrapper')) {
      // console.log(event.target.classList.contains('minesweeper__button'));
      const minesweeper = document.querySelector('.minesweeper__wrapper');
      const cells = [...minesweeper.children]; // Получение всех ячеек поля
      // console.log('cells2 ', cells);
      // Выполнится один раз. Генерация бомб и запуск таймера при первом клике
      if (statusGenerateMines) {
        // console.log('test');
        const clickedButton = cells.indexOf(event.target);
        // console.log(clickedButton);
        // console.log('123', countMines);
        mines = generateMines(sizeField, countMines, clickedButton);
        // console.log('Мины', mines);
        document.querySelector('.settings__range').disabled = true;

        timerId = setInterval(() => {
          timeGame += 1;
          document.querySelector('.minesweeper__time span').textContent = timeGame;
        }, 1000);
        statusGenerateMines = false;
        document.querySelector('.minesweeper__bombs span').textContent = countMines;

        // Оставшееся количество бомб
        countFlags = +document.querySelector('.minesweeper__flags span').textContent;
        document.querySelector('.minesweeper__bombs span').textContent = mines.length - countFlags;
      }
      // Количество ходов
      if (event.target.closest('.minesweeper__button') && !event.target.classList.contains('flag')) {
        countMove += 1;
        document.querySelector('.minesweeper__count-moves span').textContent = countMove;
      }

      // Открытие ячеек при клике
      const index = cells.indexOf(event.target);
      const column = index % sizeField;
      const row = Math.floor(index / sizeField);
      openCells(row, column);

      // Открытие ячеек в случае победы
      // console.log(openCell);
      const needOpenCellForWin = sizeField ** 2 - mines.length;
      if (openCell >= needOpenCellForWin && !isMine(sizeField, mines, row, column)) {
        if (timeGame === 0) {
          timeGame = 1;
          document.querySelector('.minesweeper__time span').textContent = timeGame;
        }
        openMinesCells(mines, cells);
        createModal(true, timerId, timeGame, countMove);
        document.querySelector('.modal').classList.add('modal__active');
        openCell = 0;
      }
    }

    // Клик по модалке (закрыть)
    if (event.target.closest('.modal__button')) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      // document.querySelector('.settings__count-mines').textContent = countMines;
      openCell = 0;
      countMove = 0;
      document.querySelector('.select__button').textContent = currentLevelGameDifficult;
    }

    // Клик новая игра
    if (event.target.closest('.minesweeper__new-game')) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      // document.querySelector('.settings__count-mines').textContent = countMines;
      openCell = 0;
      countMove = 0;
      document.querySelector('.select__button').textContent = currentLevelGameDifficult;
    }

    // Выбор уровня сложнолсти
    if (event.target.closest('.select__button')) {
      event.target.closest('.select').classList.toggle('active');
    }
    // console.log('test', event.target);
    // console.log(event.target.closest('.select__option').children[0].textContent);
    // console.log('123', currentLevelGameDifficult);
    if (event.target.closest('.select__option')) {
      if (event.target.closest('.select__option').children[0].textContent === currentLevelGameDifficult) {
        console.log('tru');
        document.querySelector('.select').classList.remove('active');
        return;
      }

      if (event.target.closest('.select__option').children[0].textContent === 'Easy') {
        // console.log('1');
        currentLevelGameDifficult = 'Easy';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        // document.body.innerHTML = '';

        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 10;
        createLayout(sizeField);

        openCell = 0;
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Medium') {
        // console.log('2');
        currentLevelGameDifficult = 'Medium';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        // document.body.innerHTML = '';
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 15;
        createLayout(sizeField);

        openCell = 0;
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Hard') {
        currentLevelGameDifficult = 'Hard';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        // document.body.innerHTML = '';
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 25;
        createLayout(sizeField);

        openCell = 0;
      }

      document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
      document.querySelector('.select').classList.remove('active');
    }
  });

  // document.addEventListener('click', (event) => {
  // if (statusGenerateMines) {
  //   const clickedButton = cells.indexOf(event.target);
  //   mines = generateMines(sizeField, countMines, clickedButton);

  //   timerId = setInterval(() => {
  //     timeGame += 1;
  //     document.querySelector('.minesweeper__time span').textContent = timeGame;
  //   }, 1000);
  //   statusGenerateMines = false;

  //   // Оставшееся количество бомб
  //   const countFlags = +document.querySelector('.minesweeper__flags span').textContent;
  //   document.querySelector('.minesweeper__bombs span').textContent = mines.length - countFlags;
  // }



  // if (event.target.closest('.minesweeper__wrapper')) {
  //   console.log(countMines);
  //   // document.body.innerHTML = '';
  //   // createLayout();
  //   // creatField(10);
  //   // startGame(10, countMines);
  // }


  // // Клик по nee game
  // if (event.target.closest('.minesweeper__new-game')) {
  //   document.body.innerHTML = '';
  //   // createLayout();
  //   // creatField(10);
  //   startGame(10, countMines);
  // }

  // // Клик по модалке (закрыть)
  // if (event.target.closest('.modal__button')) {
  //   document.body.innerHTML = '';
  //   // createLayout();
  //   // creatField(10);
  //   startGame(10, countMines);
  // }

  // Выбор уровня сложнолсти
  // if (event.target.closest('.select__button')) {
  //   event.target.closest('.select').classList.toggle('active');
  // }
  // if (event.target.closest('.select__option')) {
  //   if (event.target.closest('.select__option').children[0].textContent === currentLevelGameDifficult) {
  //     document.querySelector('.select').classList.remove('active');
  //     return;
  //   }

  //   if (event.target.closest('.select__option').children[0].textContent === 'Easy') {
  //     currentLevelGameDifficult = 'Easy';
  //     document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
  //     document.querySelector('.select').classList.remove('active');
  //     document.body.innerHTML = '';
  //     // createLayout();
  //     // creatField(10);
  //     startGame(10, 10);
  //   }
  //   if (event.target.closest('.select__option').children[0].textContent === 'Medium') {
  //     currentLevelGameDifficult = 'Medium';
  //     document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
  //     document.querySelector('.select').classList.remove('active');
  //     document.body.innerHTML = '';
  //     // createLayout();
  //     // creatField(15);
  //     startGame(15, 40);
  //   }
  //   if (event.target.closest('.select__option').children[0].textContent === 'Hard') {
  //     currentLevelGameDifficult = 'Hard';
  //     document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
  //     document.querySelector('.select').classList.remove('active');
  //     document.body.innerHTML = '';
  //     // createLayout();
  //     // creatField(25);
  //     startGame(25, 99);
  //   }

  //   document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
  //   document.querySelector('.select').classList.remove('active');
  // }

  // Изменение количества мин
  document.addEventListener('mousemove', (event) => {
    if (event.target.closest('.settings__range')) {
      // console.log(event.target.closest('.settings__range').value);
      document.querySelector('.settings__count-mines').textContent = event.target.closest('.settings__range').value;

      countMines = document.querySelector('.settings__count-mines').textContent;
      // console.log (countMines);
    }
  });
  // document.querySelector('.settings__count-mines').textContent = countMines;

  // ПКМ.Добавление флагов и мин
  document.addEventListener('contextmenu', (event) => event.preventDefault());
  document.addEventListener('mousedown', (event) => {

    const count = +document.querySelector('.minesweeper__bombs span').textContent;

    if (event.target.classList.contains('minesweeper__button') && event.button === 2) {
      countFlags = +document.querySelector('.minesweeper__flags span').textContent;
      if (event.target.classList.contains('flag')) {
        event.target.classList.remove('flag');
        countFlags -= 1;
        addSondFlagDelete();
        document.querySelector('.minesweeper__bombs span').textContent = count + 1;
      } else {
        event.target.classList.add('flag');
        countFlags += 1;
        console.log('123');
        addSondFlagSet();
        document.querySelector('.minesweeper__bombs span').textContent = count - 1;
      }
      document.querySelector('.minesweeper__flags span').textContent = countFlags;
    }
  });
});

// });
