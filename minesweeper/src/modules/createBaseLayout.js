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

const createBaseLayout = () => {
  const createContainer = createNode('div', 'container');
  appendNodeToDom(document.body, createContainer);
  const createMinesweeper = createNode('div', 'minesweeper');
  appendNodeToDom(createContainer, createMinesweeper);
};

const creatField = (size) => {
  for (let i = 0; i < size; i += 1) {
    document.querySelector('.minesweeper').innerHTML += '<br>';
    for (let j = 0; j < size; j += 1) {
      const createButton = createNode('button', 'minesweeper__button');
      appendNodeToDom(document.querySelector('.minesweeper'), createButton);
    }
  }
};

export { createBaseLayout, creatField };
