const switchTheme = () => {
  // const theme = document.querySelector("#theme");
  const body = document.querySelector("body");
  if (localStorage.getItem("saveTheme") === null) {
    localStorage.setItem("saveTheme", "light");
  }
  if (localStorage.getItem("saveTheme") === "light") {
    body.classList.remove("dark");
    // theme.href = "src/sass/index.scss";
  } else {
    body.classList.add("dark");
    // theme.href = "src/sass/index-dark.scss";
  }
  document.addEventListener("click", (event) => {
    if (event.target.closest(".settings__theme")) {
      if (localStorage.getItem("saveTheme") === "light") {
        localStorage.setItem("saveTheme", "dark");
        body.classList.add("dark");

        // theme.href = "src/sass/index-dark.scss";
      } else {
        localStorage.setItem("saveTheme", "light");

        body.classList.remove("dark");

        // theme.href = "./sass/index.scss";
      }
    }
  });
};

export default switchTheme;
