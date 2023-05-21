const switchTheme = () => {
  const theme = document.querySelector('#theme');
  if (localStorage.getItem('saveTheme') === null) {
    localStorage.setItem('saveTheme', 'light');
  }
  if (localStorage.getItem('saveTheme') === 'light') {
    theme.href = '../css/index.css';
  } else {
    theme.href = '../css/index-dark.css';
  }
  document.addEventListener('click', (event) => {
    if (event.target.closest('.settings__theme')) {
      if (localStorage.getItem('saveTheme') === 'light') {
        localStorage.setItem('saveTheme', 'dark');
        theme.href = '../css/index-dark.css';
      } else {
        localStorage.setItem('saveTheme', 'light');
        theme.href = '../css/index.css';
      }

      // const theme = document.querySelector('#theme');
      // if (localStorage.getItem('saveTheme') === 'light') {
      // theme.href = '../css/index.css';
      // } else {
      // theme.href = '../css/index-dark.css';
      // localStorage.setItem('saveTheme', 'dark');
      // }
      // if (theme.getAttribute('href') === '../css/index.css') {
      //   theme.href = '../css/index-dark.css';
      // } else {
      //   theme.href = '../css/index.css';
      // }
    }
  });
};

export default switchTheme;
