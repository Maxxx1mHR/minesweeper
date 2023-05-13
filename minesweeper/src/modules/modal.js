import { createNode } from './createBaseLayout';

const createModal = () => {
  const modal = createNode('div', 'modal');
  modal.innerHTML = `
    <div class="modal__wrapper">
    <img src="assets/img/boom.png" alt="boom" class="modal__img">
     <button class="modal__button">
       <img src="assets/icons/again.png" alt="again" class="modal__arrow-again">
         <span>Игра окончена. Попробуйте еще раз</span>
     </button>
     </div>
   `;
  document.body.prepend(modal);
  // document.querySelector('.modal__button').addEventListener('click', () => {
  //   modal.classList.remove('modal__active');
  // });
};
export { createModal };
