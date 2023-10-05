import winImg from "../../assets/img/win.png";
import againImg from "../../assets/icons/again.png";
import boomImg from "../../assets/img/boom.png";

import { createNode } from "./createBaseLayout";
import { addSoundLose, addSoundWin } from "./clickSound";

const createModal = (resultGame, stopInterval, ...params) => {
  const modal = createNode("div", "modal");
  const lose = `
    <div class="modal__wrapper">
    <img src="${boomImg}" alt="boom" class="modal__img">
     <button class="modal__button">
       <img src="${againImg}" alt="again" class="modal__arrow-again">
         <span>Game over. Try again</span>
     </button>
     </div>
   `;
  const win = `
  <div class="modal__wrapper">
  <img src="${winImg}" alt="boom" class="modal__img">
   <button class="modal__button">
     <img src="${againImg}" alt="again" class="modal__arrow-again">
       <span>Hooray! You found all mines in ${params[0]} seconds and ${params[1]} moves!</span>
   </button>
   </div>
   `;
  if (resultGame === true) {
    modal.innerHTML = win;
    clearInterval(stopInterval);
    addSoundWin();
  }
  if (resultGame === false) {
    modal.innerHTML = lose;
    clearInterval(stopInterval);
    addSoundLose();
  }

  document.body.prepend(modal);
};
export default createModal;
