import { createLayout, creatField } from './createBaseLayout';
// import { openModal } from './modal';

const startGame = (sizeField, countMines) => {
  createLayout();
  creatField(sizeField);
  const minesweeper = document.querySelector('.minesweeper');
  const cells = [...minesweeper.children]; // Получение дочерних элементов
  let mines = '';

  // Генерирует мины на поле.
  // excludeCell - первая активная ячейка - исключить из генерации на ее месте мины
  const generateMines = (countMine, excludeCell) => {
    const min = 0;
    const max = sizeField ** 2;
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

  const IsExistCells = (row, column) => row >= 0
    && row < sizeField && column >= 0 && column < sizeField;

  const isMine = (row, column) => {
    if (!IsExistCells(row, column)) return false;
    const index = row * sizeField + column;
    return mines.includes(index);
  };

  const getMinesCount = (row, column) => {
    let count = 0;
    if (isMine(row - 1, column)) {
      count += 1;
    }
    if (isMine(row - 1, column + 1)) {
      count += 1;
    }
    if (isMine(row - 1, column - 1)) {
      count += 1;
    }
    if (isMine(row, column + 1)) {
      count += 1;
    }
    if (isMine(row, column - 1)) {
      count += 1;
    }
    if (isMine(row + 1, column)) {
      count += 1;
    }
    if (isMine(row + 1, column + 1)) {
      count += 1;
    }
    if (isMine(row + 1, column - 1)) {
      count += 1;
    }
    return count;
  };

  const openBombsCells = (minesArray) => {
    minesArray.forEach((index) => { cells[index].textContent = 'X'; });
  };

  const openCells = (row, column) => {
    if (!IsExistCells(row, column)) {
      return;
    }

    const index = row * sizeField + column;
    const cell = cells[index];
    // console.log(cells);

    if (cell.disabled === true) {
      return;
    }

    cell.disabled = true;

    if (isMine(row, column)) {
      cell.textContent = 'X';
      // openModal();
      openBombsCells(mines);
      // return;
    }
    const count = getMinesCount(row, column);

    if (count !== 0) {
      cell.textContent = count;
      return;
    }
    openCells(row - 1, column);
    openCells(row - 1, column + 1);
    openCells(row - 1, column - 1);
    openCells(row, column + 1);
    openCells(row, column - 1);
    openCells(row + 1, column);
    openCells(row + 1, column + 1);
    openCells(row + 1, column - 1);
  };

  // // Сработает один раз, после клика сгенерируются мины.

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = cells.indexOf(event.target);
    mines = generateMines(countMines, clickedButton);
  }, { once: true });

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);
  });
};
export default startGame;
