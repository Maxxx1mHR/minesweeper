import clickSound from "../../assets/sound/click.mp3";
import addFlagSound from "../../assets/sound/flag.mp3";
import deleteFlagSound from "../../assets/sound/deleteFlag.mp3";
import boomSound from "../../assets/sound/boom.mp3";
import winSound from "../../assets/sound/win.mp3";

const addSoundByClick = () => {
  document.addEventListener("click", (event) => {
    const sound = new Audio();
    // sound.src = "sound/click.mp3";
    sound.src = clickSound;

    if (
      document
        .querySelector(".settings__sound")
        .classList.contains("settings__sound-off")
    ) {
      sound.volume = 0;
    } else {
      sound.volume = 0.5;
    }
    if (
      event.target.closest(".minesweeper__button") &&
      !event.target.classList.contains("flag")
    ) {
      sound.play();
    }
  });
};

const addSoundLose = () => {
  const sound = new Audio();
  sound.src = boomSound;
  if (
    document
      .querySelector(".settings__sound")
      .classList.contains("settings__sound-off")
  ) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
  document.addEventListener("click", (event) => {
    if (event.target.closest(".modal__button")) {
      sound.pause();
    }
  });
};

const addSoundWin = () => {
  const sound = new Audio();
  sound.src = winSound;
  if (
    document
      .querySelector(".settings__sound")
      .classList.contains("settings__sound-off")
  ) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
  document.addEventListener("click", (event) => {
    if (event.target.closest(".modal__button")) {
      sound.pause();
    }
  });
};

const addSondFlagSet = () => {
  const sound = new Audio();
  sound.src = addFlagSound;
  if (
    document
      .querySelector(".settings__sound")
      .classList.contains("settings__sound-off")
  ) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
};

const addSondFlagDelete = () => {
  const sound = new Audio();
  sound.src = deleteFlagSound;
  if (
    document
      .querySelector(".settings__sound")
      .classList.contains("settings__sound-off")
  ) {
    sound.volume = 0;
  } else {
    sound.volume = 0.5;
  }
  sound.play();
};

const offSound = () => {
  if (localStorage.getItem("saveSound") === null) {
    localStorage.setItem("saveSound", "on");
  }
  if (localStorage.getItem("saveSound") === "on") {
    document
      .querySelector(".settings__sound")
      .classList.remove("settings__sound-off");
  }
  if (localStorage.getItem("saveSound") === "off") {
    document
      .querySelector(".settings__sound")
      .classList.add("settings__sound-off");
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".settings__sound")) {
      if (localStorage.getItem("saveSound") === "on") {
        event.target.classList.add("settings__sound-off");
        localStorage.setItem("saveSound", "off");
      } else {
        event.target.classList.remove("settings__sound-off");
        localStorage.setItem("saveSound", "on");
      }
    }
  });
};

export {
  addSoundByClick,
  addSoundLose,
  addSoundWin,
  addSondFlagSet,
  addSondFlagDelete,
  offSound,
};
