const addSoundByClick = () => {
  document.addEventListener('click', (event) => {
    const sound = new Audio();
    sound.src = 'assets/sound/click.mp3';
    if (document.querySelector('.settings__sound').classList.contains('settings__sound-off')) {
      sound.volume = 0;
    } else {
      sound.volume = 0.5;
    }
    if (event.target.closest('.minesweeper__button') && !event.target.classList.contains('flag')) {
      sound.play();
    }
  });
};

const addSoundLose = () => {
  const sound = new Audio();
  sound.src = 'assets/sound/boom.mp3';
  if (document.querySelector('.settings__sound').classList.contains('settings__sound-off')) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
  document.addEventListener('click', (event) => {
    if (event.target.closest('.modal__button')) {
      sound.pause();
    }
  });
};

const addSoundWin = () => {
  const sound = new Audio();
  sound.src = 'assets/sound/win.mp3';
  if (document.querySelector('.settings__sound').classList.contains('settings__sound-off')) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
  document.addEventListener('click', (event) => {
    if (event.target.closest('.modal__button')) {
      sound.pause();
    }
  });
};

const addSondFlagSet = () => {
  const sound = new Audio();
  sound.src = 'assets/sound/flag.mp3';
  if (document.querySelector('.settings__sound').classList.contains('settings__sound-off')) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
};

const addSondFlagDelete = () => {
  const sound = new Audio();
  sound.src = 'assets/sound/deleteFlag.mp3';
  if (document.querySelector('.settings__sound').classList.contains('settings__sound-off')) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
};

const offSound = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.settings__sound')) {
      event.target.classList.toggle('settings__sound-off');
    }
  });
};

export { addSoundByClick, addSoundLose, addSoundWin, addSondFlagSet, addSondFlagDelete, offSound };
