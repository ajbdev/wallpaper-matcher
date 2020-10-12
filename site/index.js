const Matcher = require('../dist/Matcher').default;

document.addEventListener('DOMContentLoaded', () => {
  const $input = document.getElementById('matcher-files');
  const wallpapers = {};

  const $tblWallpapers = document.querySelector('#wallpapers tbody');

  const rowSet = [];
  const columnSet = [];

  const m = new Matcher([]);

  $input.addEventListener('change', () => {
    if (!$input.files.length) {
      return;
    }

    let nextSet = !rowSet.length ? rowSet : columnSet;

    for (let f=0;f<$input.files.length;f++) {
      const file = $input.files[f];
      const fr = new FileReader();

      fr.onload = () => {
        const img = document.createElement('img');

        img.src = fr.result;
        img.className = 'wallpaper';

        wallpapers[file.name] = img;
        addSet(nextSet, file);
      }

      fr.readAsDataURL(file);
    }
  })

  function addSet(set, file) {
    const $tr = document.createElement('tr');
    const $td1 = document.createElement('td');


    $tr.appendChild($td1);
    $td1.appendChild(wallpapers[file.name]);

    const palette = m.getColorPalette(wallpapers[file.name]);

    $tblWallpapers.appendChild($tr);

    set.push(file);
  }
})