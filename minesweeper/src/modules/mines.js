// Генерирует мины на поле.
// excludeCell - первая активная ячейка - исключить из генерации на ее месте мины
const generateMines = (sizeField, countMines, excludeCell) => {
  // console.log('123');
  const min = 0;
  const max = sizeField ** 2 - 1;
  const result = [];
  for (let i = 0; i < countMines; i += 1) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (result.includes(randomNumber) || randomNumber === excludeCell) {
      i -= 1;
    } else {
      result[i] = randomNumber;
    }
  }
  return result;
};

// Существование ячейки
const IsExistCells = (sizeField, row, column) => row >= 0 && row < sizeField && column >= 0 && column < sizeField;

// Ячейка мина или нет
const isMine = (sizeField, mines, row, column) => {
  if (!IsExistCells(sizeField, row, column)) return false;
  const index = row * sizeField + column;
  return mines.includes(index);
};

// Количество мин около ячейки
const getMinesCount = (sizeField, mines, row, column) => {
  let count = 0;

  if (isMine(sizeField, mines, row, column - 1)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row, column + 1)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row + 1, column - 1)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row + 1, column)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row + 1, column + 1)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row - 1, column - 1)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row - 1, column)) {
    count += 1;
  }
  if (isMine(sizeField, mines, row - 1, column + 1)) {
    count += 1;
  }
  return count;
};

// Открыть все ячейки, в которых есть мины
{/* <img src="assets/icons/bomb_small.png" alt="bobm" /> */ }
const openMinesCells = (mines, cells) => {
  mines.forEach((index) => {
    cells[index].innerHTML = `
    <span class="bomb"></span>
  `;
  });
};

export {
  generateMines,
  IsExistCells,
  isMine,
  getMinesCount,
  openMinesCells,
};
