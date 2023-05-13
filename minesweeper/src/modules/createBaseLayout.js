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
  // createMinesweeper.style.width = '300px';
  appendNodeToDom(createContainer, createMinesweeper);
};

const creatField = (size) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const createButton = createNode('button', 'minesweeper__button');
      // console.log(createButton.style.width);
      appendNodeToDom(document.querySelector('.minesweeper'), createButton);
    }
  }
  const minesweeper = document.querySelector('.minesweeper');
  const cellButton = document.querySelector('.minesweeper__button');
  minesweeper.style.width = `${size * cellButton.offsetWidth}px`;
};

export { createLayout, creatField };
