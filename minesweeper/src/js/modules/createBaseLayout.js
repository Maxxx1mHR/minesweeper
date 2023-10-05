import resultImg from "../../assets/icons/result.png";
import gameImg from "../../assets/icons/game.png";
import moveImg from "../../assets/icons/move.png";
import clockImg from "../../assets/icons/clock.png";
import bombImg from "../../assets/icons/bomb.png";
import flagImg from "../../assets/icons/flag.png";

const createNode = (element, ...classes) => {
  const node = document.createElement(element);
  node.classList.add(classes);
  return node;
};

const appendNodeToDom = (domNode, ...newNode) => {
  newNode.forEach((node) => {
    domNode.append(node);
  });
};

const creatField = (size) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const createButton = createNode("div", "minesweeper__button");
      appendNodeToDom(
        document.querySelector(".minesweeper__wrapper"),
        createButton
      );
    }
  }
  const minesweeper = document.querySelector(".minesweeper__wrapper");
  const cellButton = document.querySelector(".minesweeper__button");
  minesweeper.style.width = `${size * cellButton.offsetWidth}px`;
};

const createLayout = (size) => {
  document.body.innerHTML = "";
  const score = createNode("div", "score");
  appendNodeToDom(document.body, score);
  const createContainer = createNode("div", "container");
  appendNodeToDom(document.body, createContainer);

  const createMinesweeper = createNode("div", "minesweeper");
  createMinesweeper.innerHTML = `
    <div class="settings">
    <div class="select">
    <div class="select__button">
      <span class="sBtn-text">Difficult level</span>
    </div>
    <ul class="select__options">
      <li class="select__option">
        <span class="select__option-text">Easy</span>
      </li>
      <li class="select__option">
        <span class="select__option-text">Medium</span>
      </li>
      <li class="select__option">
        <span class="select__option-text">Hard</span>
      </li>
    </ul>
  </div>
    <div class="settings__mines">
      <span>Count mines</span>
      <input type="range" class="settings__range" value="0" min="10" max="99">
      <span class="settings__count-mines">10</span>
    </div>
    <div class="settings__score"><img src="${resultImg}" alt="result" class="settings__score-img"></div>
    <button class=settings__theme>Theme</button>
    <span class="settings__sound"></span>
  </div>


    <div class="minesweeper__panel">
    <img src="${gameImg}" alt="game" class="minesweeper__new-game">
      <div class="minesweeper__count-moves">
        <img src="${moveImg}" alt="move" class="minesweeper__count-moves-img">
        <span>0</span>
      </div>
      <div class="minesweeper__time">
        <img src="${clockImg}" alt="time" class="minesweeper__time-img">
        <span>0</span>
      </div>
      <div class="minesweeper__bombs">
        <img src="${bombImg}" alt="time" class="minesweeper__bomb-img">
        <span>0</span>
      </div>
      <div class="minesweeper__flags">
        <img src="${flagImg}" alt="time" class="minesweeper__flag-img">
        <span>0</span>
    </div>
    </div>
    <div class="minesweeper__wrapper"></div>
  `;
  appendNodeToDom(createContainer, createMinesweeper);
  creatField(size);
};

export { createLayout, createNode, appendNodeToDom };
