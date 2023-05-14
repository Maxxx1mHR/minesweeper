import { createLayout, creatField } from './createBaseLayout';
import createModal from './modal';
import { setFlag } from './setFlag';
import {
  generateMines, IsExistCells, isMine, getMinesCount, openMinesCells,
} from './mines';

const startGame = (sizeField, countMines) => {
  let countMove = 0;
  let timeGame = 0;
  let timerId;
  let openCell = 0;
  let statusGenerateMines = true;

  createLayout();
  creatField(sizeField);

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

    cell.classList.add('minesweeper__button_disabled');

    if (isMine(sizeField, mines, row, column)) {
      cell.innerHTML = '<img src=\'assets/icons/bomb_small.png\' alt=\'bomb\' />';
      return;
    }

    const count = getMinesCount(sizeField, mines, row, column);

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

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = cells.indexOf(event.target);
    if (statusGenerateMines) {
      mines = generateMines(sizeField, countMines, clickedButton);
    }
    statusGenerateMines = false;
    console.log('мины', mines);

    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    console.log(event.target);
    openCells(row, column);
  });
};
export default startGame;
