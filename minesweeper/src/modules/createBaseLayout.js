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
        <span>0</span>
      </div>
      <div class="minesweeper__bombs">
        <img src="assets/icons/bomb.png" alt="time" class="minesweeper__bomb-img">
        <span>0</span>
      </div>
      <div class="minesweeper__flags">
        <img src="assets/icons/flag.png" alt="time" class="minesweeper__flag-img">
        <span>0</span>
    </div>
    </div>
    <div class="minesweeper__wrapper"></div>
  `;
  appendNodeToDom(createContainer, createMinesweeper);
};

const creatField = (size) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const createButton = createNode('div', 'minesweeper__button');
      appendNodeToDom(document.querySelector('.minesweeper__wrapper'), createButton);
    }
  }
  const minesweeper = document.querySelector('.minesweeper__wrapper');
  const cellButton = document.querySelector('.minesweeper__button');
  minesweeper.style.width = `${size * cellButton.offsetWidth}px`;
};

export { createLayout, creatField, createNode };
