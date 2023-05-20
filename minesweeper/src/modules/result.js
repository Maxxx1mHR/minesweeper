import { createNode, appendNodeToDom } from './createBaseLayout';

const createScoreTable = () => {
  const score = createNode('div', 'score__wrapper');
  score.innerHTML = `
    <div class="score__table">
      <h2 class="score__header">Score table</h2>
      <div class="score__header-table">
        <span>№</span>
        <span>Difficult level</span>
        <span>Time (sec.)</span>
        <span>Mines count</span>
        <span>Count moves</span>
      </div>
      <ul class="score__list">
      </ul>
      <button class="score__button">Close</button>
    </div>
   `;

  appendNodeToDom(document.querySelector('.score'), score);
  if (localStorage.getItem('scoreTableResult') !== null) {
    let scoreResult = localStorage.getItem('scoreTableResult');
    scoreResult = JSON.parse(scoreResult);
    scoreResult.forEach((item, index) => {
      const result = createNode('li', 'score__item');
      result.innerHTML += `
        <span class="score__item-time">${index + 1})</span>
        <span class="score__item-time">${item.level}</span>
        <span class="score__item-move">${item.time}</span>
        <span class="score__item-time">${item.mines}</span>
        <span class="score__item-move">${item.move}</span>
       `;
      appendNodeToDom(document.querySelector('.score__list'), result);
    });
  }
};

export default createScoreTable;
