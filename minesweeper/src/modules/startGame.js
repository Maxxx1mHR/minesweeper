import { createLayout, creatField } from './createBaseLayout';
import createModal from './modal';
import { setFlag } from './setFlag';

const startGame = (sizeField, countMines) => {
  let countMove = 0;
  let timeGame = 0;
  let timerId;
  let openCell = 0;


  createLayout();


  setFlag();

  creatField(sizeField);
  const minesweeper = document.querySelector('.minesweeper__wrapper');
  const cells = [...minesweeper.children]; // Получение дочерних элементов
  let mines = '';

  // Генерирует мины на поле.
  // excludeCell - первая активная ячейка - исключить из генерации на ее месте мины
  const generateMines = (countMine, excludeCell) => {
    const min = 0;
    const max = sizeField ** 2 - 1;
    const result = [];
    for (let i = 0; i < countMine; i += 1) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (result.includes(randomNumber) || randomNumber === excludeCell) {
        i -= 1;
      } else {
        result[i] = randomNumber;
      }
    }
    return result;
  };

  const IsExistCells = (row, column) => row >= 0 && row < sizeField && column >= 0 && column < sizeField;

  const isMine = (row, column) => {
    if (!IsExistCells(row, column)) return false;
    const index = row * sizeField + column;
    return mines.includes(index);
  };

  const getMinesCount = (row, column) => {
    let count = 0;

    if (isMine(row, column - 1)) {
      count += 1;
    }
    if (isMine(row, column + 1)) {
      count += 1;
    }
    if (isMine(row + 1, column - 1)) {
      count += 1;
    }
    if (isMine(row + 1, column)) {
      count += 1;
    }
    if (isMine(row + 1, column + 1)) {
      count += 1;
    }
    if (isMine(row - 1, column - 1)) {
      count += 1;
    }
    if (isMine(row - 1, column)) {
      count += 1;
    }
    if (isMine(row - 1, column + 1)) {
      count += 1;
    }
    return count;
  };

  const openBombsCells = (minesArray) => {
    // minesArray.forEach((index) => { cells[index].textContent = '1'; });
    minesArray.forEach((index) => {
      cells[index].innerHTML = `
      <img src="assets/icons/bomb_small.png" alt="bobm" />
    `;
    });
  };

  const openCells = (row, column) => {
    if (!IsExistCells(row, column)) {
      return;
    }

    const index = row * sizeField + column;
    const cell = cells[index];
    // console.log('cell', cell);
    // if (cell.disabled === true) {
    // return;
    // }
    if (cell.classList.contains('minesweeper__button_disabled')) {
      return;
    }

    // cell.disabled = true;
    cell.classList.add('minesweeper__button_disabled');
    cell.innerHTML = ''; // очистить, если флаг стоит

    openCell += 1;

    if (isMine(row, column)) {
      // cell.innerHTML = 'X';
      // cell.innerHTML = '<img src=\'assets/icons/bomb.png\' alt=\'bomb\' />';

      createModal(false, timerId);
      document.querySelector('.modal').classList.add('modal__active');
      openBombsCells(mines);
      return;
    }
    const count = getMinesCount(row, column);

    if (count !== 0) {
      cell.textContent = count;
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

  // Сработает один раз, после клика сгенерируются мины.
  document.querySelector('.minesweeper__wrapper').addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = cells.indexOf(event.target);
    mines = generateMines(countMines, clickedButton);
    console.log(mines);

    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);

    document.querySelector('.minesweeper__time span').textContent = timeGame;
    timerId = setInterval(() => {
      timeGame += 1;
      document.querySelector('.minesweeper__time span').textContent = timeGame;
    }, 1000);
  }, { once: true });

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }

    countMove += 1;
    document.querySelector('.minesweeper__count-moves span').textContent = countMove;

    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);
    const needOpenCellForWin = sizeField ** 2 - mines.length;

    if (openCell >= needOpenCellForWin && !isMine(row, column)) {
      if (timeGame === 0) {
        timeGame = 1;
        document.querySelector('.minesweeper__time span').textContent = timeGame;
      }
      createModal(true, timerId, timeGame, countMove);
      document.querySelector('.modal').classList.add('modal__active');
    }
  });
};
export default startGame;
