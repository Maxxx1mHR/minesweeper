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

import {
  addSoundByClick,
  addSondFlagSet,
  addSondFlagDelete,
  offSound,
} from './modules/clickSound';
import createScoreTable from './modules/result';

window.addEventListener('load', () => {
  switchTheme();
  offSound();
  addSoundByClick();
  let sizeField = 10; // размер поля
  let mines = ''; // мины на поле
  let timerId; // установка таймера
  let countMove = 0; // счетчик ходов
  let countMines = 10; // количество мин
  let countFlags;
  let openCell = 0; // счетчик открытых ячеек
  let currentLevelGameDifficult = 'Easy';
  let timeGame = 0;
  let statusGenerateMines = true;
  let scoreResult = [];

  createLayout(sizeField);
  const openCells = (row, column) => {
    const minesweeper = document.querySelector('.minesweeper__wrapper');
    const cells = [...minesweeper.children]; // Получение всех ячеек поля

    if (!IsExistCells(sizeField, row, column)) return;

    const index = row * sizeField + column;
    const cell = cells[index];

    if (cell.classList.contains('minesweeper__button_disabled')) {
      return;
    }
    if (cell.classList.contains('flag')) {
      return;
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

  document.addEventListener('click', (event) => {
    // Клик по ячейкам
    if (event.target.closest('.minesweeper__wrapper')) {
      const minesweeper = document.querySelector('.minesweeper__wrapper');
      const cells = [...minesweeper.children]; // Получение всех ячеек поля

      // Выполнится один раз. Генерация бомб и запуск таймера при первом клике
      if (statusGenerateMines) {
        const clickedButton = cells.indexOf(event.target);
        mines = generateMines(sizeField, countMines, clickedButton);
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
        if (localStorage.getItem('scoreTableResult') === null) {
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem('scoreTableResult', JSON.stringify(scoreResult));
        } else if (JSON.parse(localStorage.getItem('scoreTableResult')).length < 10) {
          scoreResult = JSON.parse(localStorage.getItem('scoreTableResult'));
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem('scoreTableResult', JSON.stringify(scoreResult));
        } else {
          scoreResult = JSON.parse(localStorage.getItem('scoreTableResult'));
          scoreResult.splice(0, 1);
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem('scoreTableResult', JSON.stringify(scoreResult));
        }
      }
    }

    // Клик по модалке (закрыть)
    if (event.target.closest('.modal__button')) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      openCell = 0;
      countMove = 0;
      timeGame = 0;
      countMines = 10;
      document.querySelector('.select__button').textContent = currentLevelGameDifficult;
    }

    // Клик новая игра
    if (event.target.closest('.minesweeper__new-game')) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      openCell = 0;
      countMove = 0;
      timeGame = 0;
      countMines = 10;
      document.querySelector('.select__button').textContent = currentLevelGameDifficult;
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

        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 10;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Medium') {
        currentLevelGameDifficult = 'Medium';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 15;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
      }
      if (event.target.closest('.select__option').children[0].textContent === 'Hard') {
        currentLevelGameDifficult = 'Hard';
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 25;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
      }

      document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
      document.querySelector('.select').classList.remove('active');
    }
    // Клик по теблице результатов
    if (event.target.closest('.settings__score-img')) {
      document.querySelector('.score').innerHTML = '';
      document.querySelector('.score').classList.add('score__active');
      createScoreTable();
    }
    if (event.target.closest('.score__button')) {
      document.querySelector('.score').classList.remove('score__active');
    }
  });

  // Изменение количества мин
  document.addEventListener('mousemove', (event) => {
    if (event.target.closest('.settings__range')) {
      document.querySelector('.settings__count-mines').textContent = event.target.closest('.settings__range').value;
      countMines = document.querySelector('.settings__count-mines').textContent;
    }
  });

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
        addSondFlagSet();
        document.querySelector('.minesweeper__bombs span').textContent = count - 1;
      }
      document.querySelector('.minesweeper__flags span').textContent = countFlags;
    }
  });
});
