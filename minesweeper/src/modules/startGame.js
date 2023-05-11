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

  const index = 0; // Значение индекса, которое будет вычисляться при клике по кнопке
  // const getRandomValue = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);
  // console.log(getRandomValue(10));

  minesweeper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('minesweeper__button')) {
      return;
    }
    const generateMines = (count, max, min = 0) => {
      const result = [];
      for (let i = 0; i < count; i += 1) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        if (result.includes(randomNumber) || randomNumber === index) {
          i -= 1;
        } else {
          result[i] = randomNumber;
        }

        // console.log(getRandomValue(10));
      }
      return result;
    };
    console.log(generateMines(3, 7));
  });
};
export default startGame;
