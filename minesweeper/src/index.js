import './index.html';
import './index.scss';
import { createBaseLayout, creatField } from './modules/createBaseLayout';
import startGame from './modules/startGame';

window.addEventListener('DOMContentLoaded', () => {
  createBaseLayout();
  creatField(10);
  startGame(10, 10);
});
