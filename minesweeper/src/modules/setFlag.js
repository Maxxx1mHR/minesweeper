const setFlag = () => {
  let countFlags = 0;
  document.addEventListener('contextmenu', (event) => event.preventDefault());

  document.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (event.button === 1 || event.button === 0) {
      return;
      console.log('123');
    }
    if (event.target.closest('.minesweeper__button') && event.button === 2) {
      // event.target.closest('.minesweeper__button').innerHTML = '<img src="assets/icons/flag_small.png" alt="flag" class="flag"/>';
      event.target.closest('.minesweeper__button').classList.add('flag');
      countFlags += 1;
    }
    console.log('флаги', countFlags);
    return countFlags;
  });




};

export { setFlag };
