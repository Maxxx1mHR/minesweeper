import startGame from './modules/startGame';
// import setFlag from './modules/setFlag';

window.addEventListener('load', () => {
  let currentLevelGameDifficult = '';
  // Chose leleve ____
  // const optionMenu = document.querySelector('.select');
  // const selectBtn = document.querySelector('.select__button');
  // const options = document.querySelectorAll('.select__option');
  // const sBtn = document.querySelector('.select__text');

  // console.log(selectBtn);
  // selectBtn.addEventListener('click', () => optionMenu.classList.toggle('active'));

  // options.forEach((option) => {
  //   option.addEventListener('click', () => {
  //     const selectedOption = option.querySelector('.select__option-text').innerHTML;
  //     sBtn.innerText = selectedOption;

  //     optionMenu.classList.remove('active');
  //   });
  // });
  // ____

  startGame(25, 99);
  let countFlags;
  document.addEventListener('click', (event) => {
    // Клик по nee game
    if (event.target.closest('.minesweeper__new-game')) {
      document.body.innerHTML = '';
      startGame(25, 99);
    }

    // Клик по модалке (закрыть)
    if (event.target.closest('.modal__button')) {
      document.body.innerHTML = '';
      startGame(25, 99);
    }

    // console.log(event.target);

    const optionMenu = document.querySelector('.select');
    const selectBtn = document.querySelector('.select__button');
    // const options = document.querySelectorAll('.select__option');
    // const sBtn = document.querySelector('.select__text');



    if (event.target.closest('.select__button')) {
      event.target.closest('.select').classList.toggle('active');
    }
    if (event.target.closest('.select__option')) {

      // document.querySelector('.select__button');
      // console.log(event.target.closest('.select__option').children[0].textContent);
      console.log(currentLevelGameDifficult);
      if (event.target.closest('.select__option').children[0].textContent === currentLevelGameDifficult) {
        document.querySelector('.select').classList.remove('active');
        return;
      }

      if (event.target.closest('.select__option').children[0].textContent === 'Easy') {

        currentLevelGameDifficult = 'Easy';
        console.log(currentLevelGameDifficult);
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(10, 10);

      }
      if (event.target.closest('.select__option').children[0].textContent === 'Medium') {

        currentLevelGameDifficult = 'Medium';
        console.log(currentLevelGameDifficult);
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(15, 10);

      }
      if (event.target.closest('.select__option').children[0].textContent === 'Hard') {

        currentLevelGameDifficult = 'Hard';
        console.log(currentLevelGameDifficult);
        document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
        document.querySelector('.select').classList.remove('active');
        document.body.innerHTML = '';
        startGame(25, 10);

      }

      // console.log(document.querySelector('.select__button'));


      document.querySelector('.select__button').textContent = event.target.closest('.select__option').children[0].textContent;
      document.querySelector('.select').classList.remove('active');



      // console.log(event.target.closest('.select__option').innerHTML);
      // event.target.closest('.select__button').textContent = event.target.closest('.select__option').innerHTML;

    }
    // options.forEach((option) => {
    //   option.addEventListener('click', () => {
    //     const selectedOption = option.querySelector('.select__option-text').innerHTML;
    //     sBtn.innerText = selectedOption;

    //     optionMenu.classList.remove('active');
    //   });
    // });

    // console.log(document.querySelector('.select__text'));
    // document.querySelector('.select__text').innerText = event.target.innerText;
    // console.log(event.target.textContent);

    // const selectedOption = document.querySelector('.select__option-text').innerHTML;
    // event.target.closest('.select__text').textContent = 2;
    // console.log(event.target.closest('.select__option'))





  });

  // ПКМ. Добавление флагов и мин
  document.addEventListener('contextmenu', (event) => event.preventDefault());
  document.addEventListener('mousedown', (event) => {
    const count = +document.querySelector('.minesweeper__bombs span').textContent;

    if (event.target.classList.contains('minesweeper__button') && event.button === 2) {
      countFlags = +document.querySelector('.minesweeper__flags span').textContent;
      if (event.target.classList.contains('flag')) {
        event.target.classList.remove('flag');
        countFlags -= 1;
        document.querySelector('.minesweeper__bombs span').textContent = count + 1;
      } else {
        event.target.classList.add('flag');
        countFlags += 1;
        document.querySelector('.minesweeper__bombs span').textContent = count - 1;
      }
      document.querySelector('.minesweeper__flags span').textContent = countFlags;
    }
  });
});
