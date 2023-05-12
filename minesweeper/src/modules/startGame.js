const startGame = (size, countMine) => {
  const minesweeper = document.querySelector('.minesweeper');
  const minesweeperChildren = [...minesweeper.children]; // Получение дочерних элементов,включая<br>
  let btns = [];

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

  // Сработает один раз, после клика сгенерируются мины.
  let mines = '';
  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const clickedButton = btns.indexOf(event.target);
    console.log('cout', countMine);
    mines = generateMines(countMine, clickedButton, size * size);

    console.log(clickedButton);
    // generateMines(3, clickedButton, 4);
    console.log(mines);
  }, { once: true });

  // const isMine = (event) => mines.includes(event);
  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    // console.log('123');
    // event.target.textContent = isMine(event.target) ? 'X' : ' ';
    const clickedButton = btns.indexOf(event.target);
    console.log(clickedButton);
    if (mines.includes(clickedButton)) {
      event.target.textContent = 'X';
    } else {
      event.target.innerHTML = '';
    }
    event.target.disabled = true;
  });
};
export default startGame;

  // const index = 0; // Значение индекса, которое будет вычисляться при клике по кнопке
  // const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);
  // console.log(getRandomValue(10));

  // minesweeper.addEventListener('click', (event) => {
  //   if (!event.target.classList.contains('minesweeper__button')) {
  //     return;
  //   }
  //   const generateMines = (count, max, min = 0) => {
  //     const result = [];
  //     for (let i = 0; i < count; i += 1) {
  //       const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  //       if (result.includes(randomNumber) || randomNumber === index) {
  //         i -= 1;
  //       } else {
  //         result[i] = randomNumber;
  //       }
  //     }
  //     return result;
  //   };
  //   console.log(generateMines(3, 7));
  // });