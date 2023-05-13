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

const createLayout = () => {
  // const modal = createNode('div', 'modal');
  // modal.innerHTML = `
  // <div class="modal__wrapper">
  //  <img src="assets/img/boom.png" alt="boom" class="modal__img">
  //    <button class="modal__button">
  //      <img src="assets/icons/again.png" alt="again" class="modal__arrow-again">
  //        <span>Игра окончена. Попробуйте еще раз</span>
  //    </button>
  // </div >
  //  `;
  // appendNodeToDom(document.body, modal);
  const createContainer = createNode('div', 'container');
  appendNodeToDom(document.body, createContainer);

  const createMinesweeper = createNode('div', 'minesweeper');
  createMinesweeper.innerHTML = `
    <div class="minesweeper__panel">
      <div class="minesweeper__count-moves">
        <img src="assets/icons/move.png" alt="move" class="minesweeper__count-moves-img">
        <span>0</span>
      </div>
      <img src="assets/icons/game.png" alt="game" class="minesweeper__new-game">
      <div class="minesweeper__time">
        <img src="assets/icons/clock.png" alt="time" class="minesweeper__time-img">
        <span>000</span>
      </div>
    </div>
    <div class="minesweeper__wrapper"></div>
  `;

  // const createMinesweeperWrapper = createNode('div', 'minesweeper__wrapper');
  appendNodeToDom(createContainer, createMinesweeper);
};

const creatField = (size) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const createButton = createNode('button', 'minesweeper__button');
      // console.log(createButton.style.width);
      appendNodeToDom(document.querySelector('.minesweeper__wrapper'), createButton);
    }
  }
  const minesweeper = document.querySelector('.minesweeper__wrapper');
  const cellButton = document.querySelector('.minesweeper__button');
  minesweeper.style.width = `${size * cellButton.offsetWidth}px`;
};

export { createLayout, creatField, createNode };
