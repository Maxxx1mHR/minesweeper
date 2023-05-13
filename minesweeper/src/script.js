// import './index.html';
// import './index.scss';
// import { createBaseLayout, creatField } from './modules/createBaseLayout';
import startGame from './modules/startGame';
// import { createLayout } from './createBaseLayout';
// import { createModal } from './modules/modal';
// import { createNode } from './modules/createBaseLayout';


window.addEventListener('DOMContentLoaded', () => {


  startGame(5, 3);

  document.addEventListener('click', (event) => {
    // console.log(event.target.closest('.modal__button'));
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(5, 3);
    }
  })

  // let time = 0;
  // let timerId = setInterval(() => console.log(time += 1), 1000);


  // document.addEventListener('click', (event) => {
  //   console.log(event.target);
  // })


});
