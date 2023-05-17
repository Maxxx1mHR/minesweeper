import { createLayout, creatField } from './createBaseLayout';
import createModal from './modal';
// import setFlag from './setFlag';
import {
  generateMines, IsExistCells, isMine, getMinesCount, openMinesCells,
} from './mines';

let currentLevelGameDifficult = '';
const startGame = (sizeField, countMines) => {
  let countMove = 0; // счетчик ходов
  let timeGame = 0;
  let timerId;
  let openCell = 0; // счетчик открытых ячеек

  let statusGenerateMines = true;

  createLayout();
  creatField(sizeField);

  const mainMine = document.querySelector('.minesweeper');
  const minesweeper = document.querySelector('.minesweeper__wrapper');
  const cells = [...minesweeper.children]; // Получение дочерних элементов

  let mines = '';

  const openCells = (row, column) => {
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

  // document.addEventListener('contextmenu', (event) => event.preventDefault());

  mainMine.addEventListener('click', (event) => {
    // Остановить таймер при смене уровня сложности
    if (event.target.closest('.select__option')) {
      console.log('Curr', currentLevelGameDifficult);
      if (event.target.closest('.select__option').innerText === currentLevelGameDifficult) {
        console.log('1');
        return;
      }
      if (event.target.closest('.select__option').innerText === 'Easy') {
        currentLevelGameDifficult = 'Easy';
        console.log('2');
        clearInterval(timerId);
      }
      if (event.target.closest('.select__option').innerText === 'Medium') {
        currentLevelGameDifficult = 'Medium';
        console.log('3');
        clearInterval(timerId);
      }
      if (event.target.closest('.select__option').innerText === 'Hard') {
        currentLevelGameDifficult = 'Hard';
        console.log('4');
        clearInterval(timerId);
      }
    }

    // Остановить таймер при клике new game
    if (event.target.classList.contains('minesweeper__new-game')) {
      clearInterval(timerId);
    }

    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    if (event.target.classList.contains('flag') && event.button === 0) {
      return;
    }

    // Блок выполнится один раз
    if (statusGenerateMines) {
      const clickedButton = cells.indexOf(event.target);
      mines = generateMines(sizeField, countMines, clickedButton);

      timerId = setInterval(() => {
        timeGame += 1;
        document.querySelector('.minesweeper__time span').textContent = timeGame;
      }, 1000);
      statusGenerateMines = false;

      // Оставшееся количество бомб
      const countFlags = +document.querySelector('.minesweeper__flags span').textContent;
      document.querySelector('.minesweeper__bombs span').textContent = mines.length - countFlags;
    }

    // Увеличить счечик ячеек
    countMove += 1;
    document.querySelector('.minesweeper__count-moves span').textContent = countMove;

    // Открывать ячейки, в которых пусто
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
    }
  });
};

export default startGame;
