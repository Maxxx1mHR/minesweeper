import { createLayout, creatField } from './createBaseLayout';
import { createModal } from './modal';

const startGame = (sizeField, countMines) => {
  // document.querySelector('.modal').classList.remove('modal__active');
  let countMove = 0;
  let timeGame = 0;
  let timerId;
  createModal();
  createLayout();


  // TimeGame and Count move
  // const test = document.querySelector('.minesweeper__count-moves span');
  // test.textContent = countMove;
  // let timerId = setInterval(() => timeGame += 1, 1000);
  const test2 = document.querySelector('.minesweeper__time span');




  creatField(sizeField);
  const minesweeper = document.querySelector('.minesweeper__wrapper');
  const cells = [...minesweeper.children]; // Получение дочерних элементов
  let mines = '';


  // Генерирует мины на поле.
  // excludeCell - первая активная ячейка - исключить из генерации на ее месте мины
  const generateMines = (countMine, excludeCell) => {
    console.log('не бомба', excludeCell);
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

  const IsExistCells = (row, column) => row >= 0
    && row < sizeField && column >= 0 && column < sizeField;

  const isMine = (row, column) => {
    if (!IsExistCells(row, column)) return false;
    const index = row * sizeField + column;
    // console.log(index);
    // console.log(mines);
    // console.log(mines.includes(index));
    return mines.includes(index);
  };

  const getMinesCount = (row, column) => {
    let count = 0;
    // if (isMine(row - 1, column)) {
    //   count += 1;
    // }
    // if (isMine(row - 1, column + 1)) {
    //   count += 1;
    // }
    // if (isMine(row - 1, column - 1)) {
    //   count += 1;
    // }
    // if (isMine(row, column + 1)) {
    //   count += 1;
    // }
    // if (isMine(row, column - 1)) {
    //   count += 1;
    // }
    // if (isMine(row + 1, column)) {
    //   count += 1;
    // }
    // if (isMine(row + 1, column + 1)) {
    //   count += 1;
    // }
    // if (isMine(row + 1, column - 1)) {
    //   count += 1;
    // }

    //
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
    // for (let x = -1; x <= 1; x += 1) {
    //   for (let y = -1; y <= 1; y += 1) {
    //     if (isMine(row + y, column + x)) {
    //       count += 1;
    //     }
    //   }
    // }
    return count;
  };





  let testCOUNT = 0;

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
    testCOUNT += 1;  // ЕСЛИ ЭТОТ caount === sizeField - 1, тогда победа
    console.log('TEST COUNT', testCOUNT);



    if (isMine(row, column)) {
      console.log('cell', cell);
      cell.innerHTML = 'X';

      // createModal();
      // document.body.children[0].classList.add('modal__active');
      document.querySelector('.modal').classList.add('modal__active');
      clearInterval(timerId);
      openBombsCells(mines);
      return;
    }
    const count = getMinesCount(row, column);

    if (count !== 0) {
      cell.textContent = count;
      return;
    }


    // openCells(row - 1, column);
    // openCells(row - 1, column + 1);
    // openCells(row - 1, column - 1);
    // openCells(row, column + 1);
    // openCells(row, column - 1);
    // openCells(row + 1, column);
    // openCells(row + 1, column + 1);
    // openCells(row + 1, column - 1);

    openCells(row, column - 1);
    openCells(row, column + 1);
    openCells(row + 1, column - 1);
    openCells(row + 1, column);
    openCells(row + 1, column + 1);
    openCells(row - 1, column - 1);
    openCells(row - 1, column);
    openCells(row - 1, column + 1);
  };

  // // Сработает один раз, после клика сгенерируются мины.

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = cells.indexOf(event.target);
    mines = generateMines(countMines, clickedButton);



    //
    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);
    //
    timerId = setInterval(() => {
      timeGame += 1;
      document.querySelector('.minesweeper__time span').textContent = timeGame;
    }, 1000);
    // console.log(mines);
  }, { once: true });

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
      // const index = cells.indexOf(event.target);
      // const column = index % sizeField;
      // const row = Math.floor(index / sizeField);
      // openCells(row, column);
    }
    //
    countMove += 1;
    document.querySelector('.minesweeper__count-moves span').textContent = countMove;

    const index = cells.indexOf(event.target);
    const column = index % sizeField;
    const row = Math.floor(index / sizeField);
    openCells(row, column);
    let test = [...Array(sizeField ** 2 - 1).keys()].map(i => i + 1);
    // console.log(test);
    // console.log(mines);
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 4];

    const s = new Set(mines);
    let res = test.filter(e => !s.has(e));

    res.forEach(item => {
      console.log('DISABLE', cells[item].disabled);
    })

  });
};
export default startGame;
