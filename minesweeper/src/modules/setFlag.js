const setFlag = () => {
  let countFlags = 0;
  document.addEventListener('contextmenu', (event) => event.preventDefault());

  document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('minesweeper__button') && event.button === 2) {
      if (event.target.classList.contains('flag')) {
        event.target.classList.remove('flag');
        countFlags -= 1;
      } else {
        event.target.classList.add('flag');
        countFlags += 1;
      }
    }
    console.log(countFlags);
    return countFlags;
  });
};

export default setFlag;
