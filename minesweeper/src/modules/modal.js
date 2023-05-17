import { createNode } from './createBaseLayout';

const createModal = (resultGame, stopInterval, ...params) => {
  const modal = createNode('div', 'modal');
  const lose = `
    <div class="modal__wrapper">
    <img src="assets/img/boom.png" alt="boom" class="modal__img">
     <button class="modal__button">
       <img src="assets/icons/again.png" alt="again" class="modal__arrow-again">
         <span>Game over. Try again</span>
     </button>
     </div>
   `;
  const win = `
  <div class="modal__wrapper">
  <img src="assets/img/win.png" alt="boom" class="modal__img">
   <button class="modal__button">
     <img src="assets/icons/again.png" alt="again" class="modal__arrow-again">
       <span>Hooray! You found all mines in ${params[0]} seconds and ${params[1]} moves!</span>
   </button>
   </div>
   `;
  if (resultGame === true) {
    modal.innerHTML = win;
    clearInterval(stopInterval);
  }
  if (resultGame === false) {
    modal.innerHTML = lose;
    clearInterval(stopInterval);
  }

  document.body.prepend(modal);
};
export default createModal;
