import "../sass/index.scss";

import { createLayout } from "./modules/createBaseLayout";
import createModal from "./modules/modal";
import {
  generateMines,
  IsExistCells,
  isMine,
  getMinesCount,
  openMinesCells,
} from "./modules/mines";
import switchTheme from "./modules/theme";

import {
  addSoundByClick,
  addSondFlagSet,
  addSondFlagDelete,
  offSound,
} from "./modules/clickSound";
import createScoreTable from "./modules/result";

window.addEventListener("load", () => {
  let sizeField; // размер поля
  let mines = ""; // мины на поле
  let timerId; // установка таймера
  let countMove; // счетчик ходов
  let countMines; // количество мин
  let countFlags;
  let openCell = 0; // счетчик открытых ячеек
  let currentLevelGameDifficult;
  let timeGame;
  let statusGenerateMines = true;
  let scoreResult = [];
  let arrayForOpenedCelss;
  let arrayForFlags;

  // document.addEventListener("click", (event) => {
  //   import("../sass/index-dark.scss");
  // });

  const openCells = (row, column) => {
    const minesweeper = document.querySelector(".minesweeper__wrapper");
    const cells = [...minesweeper.children]; // Получение всех ячеек поля

    if (!IsExistCells(sizeField, row, column)) return;

    const index = row * sizeField + column;
    const cell = cells[index];

    if (cell.classList.contains("minesweeper__button_disabled")) {
      return;
    }
    if (cell.classList.contains("flag")) {
      return;
    }

    cell.classList.add("minesweeper__button_disabled");
    openCell += 1;

    if (isMine(sizeField, mines, row, column)) {
      openMinesCells(mines, cells);
      createModal(false, timerId);
      document.querySelector(".modal").classList.add("modal__active");
      // arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
      // arrayForFlags = []; // очистка позиий флагов в случае поражения
      // localStorage.removeItem('saveGenerateMinesPosition'); // Удаление из ls позиции мин
      // localStorage.removeItem('saveOpenedCells');
      // localStorage.removeItem('saveFlagsPosition');

      return;
    }

    const count = getMinesCount(sizeField, mines, row, column);

    if (count === 1) {
      cell.classList.add("one_blue");
    }
    if (count === 2) {
      cell.classList.add("two_green");
    }
    if (count === 3) {
      cell.classList.add("three_red");
    }
    if (count === 4) {
      cell.classList.add("four_dark-blue");
    }
    if (count === 5) {
      cell.classList.add("five_brown");
    }
    if (count === 6) {
      cell.classList.add("six_turquoise");
    }
    if (count === 7) {
      cell.classList.add("seven_black");
    }
    if (count === 8) {
      cell.classList.add("eight_white");
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

  // Установка уровня сложности из ls
  if (localStorage.getItem("currentLevelGameDifficult") === null) {
    currentLevelGameDifficult = "Easy";
    sizeField = 10;
  } else {
    currentLevelGameDifficult = localStorage.getItem(
      "currentLevelGameDifficult"
    );
    if (currentLevelGameDifficult === "Easy") {
      currentLevelGameDifficult = "Easy";
      sizeField = 10;
    }
    if (currentLevelGameDifficult === "Medium") {
      currentLevelGameDifficult = "Medium";
      sizeField = 15;
    }
    if (currentLevelGameDifficult === "Hard") {
      currentLevelGameDifficult = "Hard";
      sizeField = 25;
    }
  }
  createLayout(sizeField);
  document.querySelector(".select__button").textContent =
    currentLevelGameDifficult;
  switchTheme();
  offSound();
  addSoundByClick();

  // Устновка количества шагов из ls
  if (localStorage.getItem("saveCountMove") === null) {
    countMove = 0;
  } else {
    countMove = +localStorage.getItem("saveCountMove");
    document.querySelector(".minesweeper__count-moves span").textContent =
      countMove;
  }

  // Установка времени
  if (localStorage.getItem("saveTimeGame") === null) {
    timeGame = 0;
  } else {
    timeGame = +localStorage.getItem("saveTimeGame");
    document.querySelector(".minesweeper__time span").textContent = timeGame;
  }

  // Установка мин
  if (localStorage.getItem("saveCountMines") === null) {
    countMines = 10;
  } else {
    countMines = +localStorage.getItem("saveCountMines");
    document.querySelector(".minesweeper__bombs span").textContent = countMines;
  }

  // Установка флагов из ls
  if (localStorage.getItem("saveFlagsPosition") === null) {
    arrayForFlags = [];
  } else {
    arrayForFlags = JSON.parse(localStorage.getItem("saveFlagsPosition"));
    document.querySelector(".minesweeper__flags span").textContent =
      arrayForFlags.length;
    const minesweeper = document.querySelector(".minesweeper__wrapper");
    arrayForFlags.forEach((flag) => {
      minesweeper.children[flag].classList.add("flag");
    });
  }

  // Открывать ячейки, если есть в ls и записывать сохраненные минны
  if (localStorage.getItem("saveOpenedCells") === null) {
    arrayForOpenedCelss = [];
  } else {
    arrayForOpenedCelss = JSON.parse(localStorage.getItem("saveOpenedCells"));
    mines = JSON.parse(localStorage.getItem("saveGenerateMinesPosition"));
    arrayForOpenedCelss.forEach((cell) => {
      openCells(cell[0], cell[1]);
    });
  }

  document.addEventListener("click", (event) => {
    // Клик по ячейкам
    if (event.target.closest(".minesweeper__wrapper")) {
      const minesweeper = document.querySelector(".minesweeper__wrapper");
      const cells = [...minesweeper.children]; // Получение всех ячеек поля

      // Выполнится один раз. Генерация бомб и запуск таймера при первом клике
      if (statusGenerateMines) {
        const clickedButton = cells.indexOf(event.target);

        // Если мин в ls нет, тогда генерирую, иначе беру из ls
        if (localStorage.getItem("saveGenerateMinesPosition") === null) {
          mines = generateMines(sizeField, countMines, clickedButton);
          localStorage.setItem(
            "saveGenerateMinesPosition",
            JSON.stringify(mines)
          );
        } else {
          mines = JSON.parse(localStorage.getItem("saveGenerateMinesPosition"));
        }

        document.querySelector(".settings__range").disabled = true;

        timerId = setInterval(() => {
          timeGame += 1;

          // Сохранение количества времени в ls
          localStorage.setItem("saveTimeGame", timeGame);

          document.querySelector(".minesweeper__time span").textContent =
            timeGame;
        }, 1000);
        statusGenerateMines = false;
        document.querySelector(".minesweeper__bombs span").textContent =
          countMines;

        // Оставшееся количество бомб
        countFlags = +document.querySelector(".minesweeper__flags span")
          .textContent;
        document.querySelector(".minesweeper__bombs span").textContent =
          mines.length - countFlags;

        // Сохранение мин в ls
        localStorage.setItem("saveCountMines", mines.length - countFlags);
      }
      // Количество ходов
      if (
        event.target.closest(".minesweeper__button") &&
        !event.target.classList.contains("flag")
      ) {
        countMove += 1;

        // Сохранене ходов в ls
        localStorage.setItem("saveCountMove", countMove);
        document.querySelector(".minesweeper__count-moves span").textContent =
          countMove;
      }

      // Открытие ячеек при клике
      const index = cells.indexOf(event.target);
      const column = index % sizeField;
      const row = Math.floor(index / sizeField);

      // Сохранение ячеек в массив и local storage
      arrayForOpenedCelss.push([row, column]);
      localStorage.setItem(
        "saveOpenedCells",
        JSON.stringify(arrayForOpenedCelss)
      );

      openCells(row, column);

      // Открытие ячеек в случае победы
      const needOpenCellForWin = sizeField ** 2 - mines.length;
      if (
        openCell >= needOpenCellForWin &&
        !isMine(sizeField, mines, row, column)
      ) {
        if (timeGame === 0) {
          timeGame = 1;
          document.querySelector(".minesweeper__time span").textContent =
            timeGame;
        }
        openMinesCells(mines, cells);
        createModal(true, timerId, timeGame, countMove);
        document.querySelector(".modal").classList.add("modal__active");

        // Сохрание результата в local storage, если победа
        if (localStorage.getItem("scoreTableResult") === null) {
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem("scoreTableResult", JSON.stringify(scoreResult));
        } else if (
          JSON.parse(localStorage.getItem("scoreTableResult")).length < 10
        ) {
          scoreResult = JSON.parse(localStorage.getItem("scoreTableResult"));
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem("scoreTableResult", JSON.stringify(scoreResult));
        } else {
          scoreResult = JSON.parse(localStorage.getItem("scoreTableResult"));
          scoreResult.splice(0, 1);
          scoreResult.push({
            level: currentLevelGameDifficult,
            time: timeGame,
            mines: countMines,
            move: countMove,
          });
          localStorage.setItem("scoreTableResult", JSON.stringify(scoreResult));
        }
      }
    }

    // Клик по модалке (закрыть)
    if (event.target.closest(".modal__button")) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      openCell = 0;
      countMove = 0;
      timeGame = 0;
      countMines = 10;
      document.querySelector(".select__button").textContent =
        currentLevelGameDifficult;
      arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
      arrayForFlags = [];
      localStorage.removeItem("saveGenerateMinesPosition"); // Удаление из ls позиции мин
      localStorage.removeItem("saveOpenedCells");
      localStorage.removeItem("saveCountMove");
      localStorage.removeItem("saveTimeGame");
      localStorage.removeItem("saveCountMines");
      localStorage.removeItem("saveFlagsPosition");

      // Проверка на звук в ls
      if (localStorage.getItem("saveSound") === "on") {
        document
          .querySelector(".settings__sound")
          .classList.remove("settings__sound-off");
      }
      if (localStorage.getItem("saveSound") === "off") {
        document
          .querySelector(".settings__sound")
          .classList.add("settings__sound-off");
      }
    }

    // Клик новая игра
    if (event.target.closest(".minesweeper__new-game")) {
      clearInterval(timerId);
      statusGenerateMines = true;
      createLayout(sizeField);
      openCell = 0;
      countMove = 0;
      timeGame = 0;
      countMines = 10;
      arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
      arrayForFlags = [];
      localStorage.removeItem("saveGenerateMinesPosition"); // Удаление из ls позиции мин
      localStorage.removeItem("saveOpenedCells");
      localStorage.removeItem("saveCountMove");
      localStorage.removeItem("saveTimeGame");
      localStorage.removeItem("saveCountMines");
      localStorage.removeItem("saveFlagsPosition");
      // Проверка на звук в ls
      if (localStorage.getItem("saveSound") === "on") {
        document
          .querySelector(".settings__sound")
          .classList.remove("settings__sound-off");
      }
      if (localStorage.getItem("saveSound") === "off") {
        document
          .querySelector(".settings__sound")
          .classList.add("settings__sound-off");
      }
    }

    // Выбор уровня сложнолсти
    if (event.target.closest(".select__button")) {
      event.target.closest(".select").classList.toggle("active");
    }
    if (event.target.closest(".select__option")) {
      if (
        event.target.closest(".select__option").children[0].textContent ===
        currentLevelGameDifficult
      ) {
        document.querySelector(".select").classList.remove("active");
        return;
      }

      if (
        event.target.closest(".select__option").children[0].textContent ===
        "Easy"
      ) {
        currentLevelGameDifficult = "Easy";

        // Установка уровня сложности в ls
        localStorage.setItem("currentLevelGameDifficult", "Easy");

        document.querySelector(".select__button").textContent =
          event.target.closest(".select__option").children[0].textContent;
        document.querySelector(".select").classList.remove("active");

        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 10;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
        arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
        arrayForFlags = [];
        localStorage.removeItem("saveGenerateMinesPosition"); // Удаление из ls позиции мин
        localStorage.removeItem("saveOpenedCells");
        localStorage.removeItem("saveCountMove");
        localStorage.removeItem("saveTimeGame");
        localStorage.removeItem("saveCountMines");
        localStorage.removeItem("saveFlagsPosition");
        // Проверка на звук в ls
        if (localStorage.getItem("saveSound") === "on") {
          document
            .querySelector(".settings__sound")
            .classList.remove("settings__sound-off");
        }
        if (localStorage.getItem("saveSound") === "off") {
          document
            .querySelector(".settings__sound")
            .classList.add("settings__sound-off");
        }
      }
      if (
        event.target.closest(".select__option").children[0].textContent ===
        "Medium"
      ) {
        currentLevelGameDifficult = "Medium";

        // Установка уровня сложности в ls
        localStorage.setItem("currentLevelGameDifficult", "Medium");

        document.querySelector(".select__button").textContent =
          event.target.closest(".select__option").children[0].textContent;
        document.querySelector(".select").classList.remove("active");
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 15;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
        arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
        arrayForFlags = [];
        localStorage.removeItem("saveGenerateMinesPosition"); // Удаление из ls позиции мин
        localStorage.removeItem("saveOpenedCells");
        localStorage.removeItem("saveCountMove");
        localStorage.removeItem("saveTimeGame");
        localStorage.removeItem("saveCountMines");
        localStorage.removeItem("saveFlagsPosition");
        // Проверка на звук в ls
        if (localStorage.getItem("saveSound") === "on") {
          document
            .querySelector(".settings__sound")
            .classList.remove("settings__sound-off");
        }
        if (localStorage.getItem("saveSound") === "off") {
          document
            .querySelector(".settings__sound")
            .classList.add("settings__sound-off");
        }
      }
      if (
        event.target.closest(".select__option").children[0].textContent ===
        "Hard"
      ) {
        currentLevelGameDifficult = "Hard";

        // Установка уровня сложности в ls
        localStorage.setItem("currentLevelGameDifficult", "Hard");

        document.querySelector(".select__button").textContent =
          event.target.closest(".select__option").children[0].textContent;
        document.querySelector(".select").classList.remove("active");
        clearInterval(timerId);
        statusGenerateMines = true;
        sizeField = 25;
        createLayout(sizeField);
        countMove = 0;
        openCell = 0;
        timeGame = 0;
        countMines = 10;
        arrayForOpenedCelss = []; // очистка открытых ячеек в случае поражения
        arrayForFlags = [];
        localStorage.removeItem("saveGenerateMinesPosition"); // Удаление из ls позиции мин
        localStorage.removeItem("saveOpenedCells");
        localStorage.removeItem("saveCountMove");
        localStorage.removeItem("saveTimeGame");
        localStorage.removeItem("saveCountMines");
        localStorage.removeItem("saveFlagsPosition");
        // Проверка на звук в ls
        if (localStorage.getItem("saveSound") === "on") {
          document
            .querySelector(".settings__sound")
            .classList.remove("settings__sound-off");
        }
        if (localStorage.getItem("saveSound") === "off") {
          document
            .querySelector(".settings__sound")
            .classList.add("settings__sound-off");
        }
      }

      document.querySelector(".select__button").textContent =
        event.target.closest(".select__option").children[0].textContent;
      document.querySelector(".select").classList.remove("active");
    }
    // Клик по теблице результатов
    if (event.target.closest(".settings__score-img")) {
      document.querySelector(".score").innerHTML = "";
      document.querySelector(".score").classList.add("score__active");
      createScoreTable();
    }
    if (event.target.closest(".score__button")) {
      document.querySelector(".score").classList.remove("score__active");
    }
  });

  // Изменение количества мин
  document.addEventListener("mousemove", (event) => {
    if (event.target.closest(".settings__range")) {
      document.querySelector(".settings__count-mines").textContent =
        event.target.closest(".settings__range").value;
      countMines = +document.querySelector(".settings__count-mines")
        .textContent;
    }
  });

  // ПКМ.Добавление флагов и мин
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("mousedown", (event) => {
    const minesweeper = document.querySelector(".minesweeper__wrapper");
    const cells = [...minesweeper.children]; // Получение всех ячеек поля
    const index = cells.indexOf(event.target);

    const count = +document.querySelector(".minesweeper__bombs span")
      .textContent;

    if (
      event.target.classList.contains("minesweeper__button") &&
      event.button === 2
    ) {
      countFlags = +document.querySelector(".minesweeper__flags span")
        .textContent;
      if (event.target.classList.contains("flag")) {
        event.target.classList.remove("flag");
        countFlags -= 1;
        addSondFlagDelete();
        document.querySelector(".minesweeper__bombs span").textContent =
          count + 1;

        // Сохранение мин в ls
        localStorage.setItem("saveCountMines", count + 1);

        // Удаление позиций флагов из массива
        for (let i = 0; i < arrayForFlags.length; i += 1) {
          if (arrayForFlags[i] === index) {
            arrayForFlags.splice(i, 1);
            localStorage.setItem(
              "saveFlagsPosition",
              JSON.stringify(arrayForFlags)
            );
          }
        }
      } else {
        event.target.classList.add("flag");
        countFlags += 1;
        addSondFlagSet();
        document.querySelector(".minesweeper__bombs span").textContent =
          count - 1;

        // Сохранение мин в ls
        localStorage.setItem("saveCountMines", count - 1);

        // Сохранение позиций флагов в массив и ls
        arrayForFlags.push(index);
        localStorage.setItem(
          "saveFlagsPosition",
          JSON.stringify(arrayForFlags)
        );
      }
      document.querySelector(".minesweeper__flags span").textContent =
        countFlags;
    }
  });
});
