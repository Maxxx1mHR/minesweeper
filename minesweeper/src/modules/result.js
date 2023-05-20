import { createNode, appendNodeToDom } from './createBaseLayout';

const createScoreTable = () => {
  const score = createNode('div', 'score__wrapper');
  score.innerHTML = `
      <h2>Score table</h2>
        <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Count moves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>9.1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>9.1</td>
          </tr>
        </tbody>
      </table>
      <button class="score__button">Close</button>
   `;
  appendNodeToDom(document.querySelector('.score'), score);
  // document.body.prepend(score);
};

// const openScore = () => {

//   document.addEventListener('click', (event) => {

//     // console.log(event.target.closest('.score'));
//     // console.log(event.target);

//   });
// };

export default createScoreTable;
