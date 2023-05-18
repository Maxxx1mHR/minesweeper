const switchTheme = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.settings__theme')) {
      const theme = document.querySelector('#theme');
      // console.log(theme);
      // console.log(event.target.closest('.settings__theme'));
      if (theme.getAttribute('href') === '../css/index.css') {
        theme.href = '../css/index-dark.css';
      } else {
        theme.href = '../css/index.css';
      }
    }
  });
};

export default switchTheme;
