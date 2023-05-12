const startGame = (sizeField, countMine) => {
  const minesweeper = document.querySelector('.minesweeper');
  const minesweeperChildren = [...minesweeper.children]; // Получение дочерних элементов,включая<br>
  let btns = [];
  let mines = '';

  minesweeperChildren.forEach((item, index) => {
    if (item.classList.contains('minesweeper__button')) {
      btns[index] = item;
    } else {
      btns[index] = 0;
    }
  });
  btns = btns.filter(Boolean); // Удаление br. Остались только кнопки

  const generateMines = (count, clickedButton, max = 100, min = 0) => {
    const result = [];
    for (let i = 0; i < count; i += 1) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (result.includes(randomNumber) || randomNumber === clickedButton) {
        i -= 1;
      } else {
        result[i] = randomNumber;
      }
    }
    return result;
  };

  const isValidCells = (row, column) => row >= 0
    && row < sizeField
    && column >= 0
    && column < sizeField;

  const isMine = (row, column) => {
    if (!isValidCells(row, column)) return false;
    const index = row * sizeField + column;
    // console.log('index isMine', index);
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

  const openCells = (row, column) => {
    if (!isValidCells(row, column)) {
      return;
    }

    const index = row * sizeField + column;
    const btn = btns[index];

    if (btn.disabled === true) {
      return;
    }

    btn.disabled = true;

    if (isMine(row, column)) {
      btn.textContent = 'X';
      return;
    }
    const count = getMinesCount(row, column);

    if (count !== 0) {
      btn.textContent = count;
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

  // Сработает один раз, после клика сгенерируются мины.

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = btns.indexOf(event.target);
    // console.log('cout', countMine);
    mines = generateMines(countMine, clickedButton);

    // console.log(mines);
  }, { once: true });

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const index = btns.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);
  });
};
export default startGame;
