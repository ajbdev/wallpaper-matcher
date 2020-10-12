const Matcher = require('../dist/Matcher');

document.addEventListener('DOMContentLoaded', () => {
  console.log(Matcher);

  const input = document.getElementById('matcher-files');

  input.addEventListener('change', () => {
    console.log(input.files);
  })
})