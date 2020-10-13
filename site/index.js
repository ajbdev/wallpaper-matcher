const Matcher = require('../dist/Matcher').default;

document.addEventListener('DOMContentLoaded', () => {
  const $input = document.getElementById('matcher-files');
  const wallpapers = {};

  const $wallpapers = document.querySelector('#wallpapers');

  const rowSet = [];
  const columnSet = [];

  const m = new Matcher([]);

  $input.addEventListener('change', () => {
    if (!$input.files.length) {
      return;
    }

    const sets = [];

    $tbl = el('table');
    $wallpapers.appendChild($tbl)
    for (let f=0;f<$input.files.length;f++) {
      const file = $input.files[f];
      const fr = new FileReader();
      const set = [];

      fr.onload = () => {
        const img = el('img', { src: fr.result, className: 'wallpaper' })

        wallpapers[file.name] = img;
        addToSet(set, file, $tbl);
      }

      fr.readAsDataURL(file);
      sets.push(set);
    }
  });

  function addToSet(set, file, $tbl) {

    m.getColorPalette(wallpapers[file.name]).then((palette) => {
      //document.querySelector(`palette-${ident(file.name])}`)
      palette.map((c) => console.log(c));
      const $tr = el('tr',[
        el('td',[
          wallpapers[file.name]
        ]),
        el('td', palette.map(c => el('div', { className: 'color', style: `background-color:${c.hex()}` })))
      ]);
      $tbl.appendChild($tr);
    });

    set.push(file);
  }
});

function ident(fileName) {
  return fileName.replace(/\W/g, '');
}

function el(tagName, opt1, opt2 = []) {
  const children = Array.isArray(opt1) ? opt1 : opt2;
  const attributes = !Array.isArray(opt1) ? opt1 : {};
  
  const ele = attributes === (void 0)
      ? document.createElement(tagName)
      : Object.assign(document.createElement(tagName), attributes);
  if (children) {
      for (let i = 0, length = children.length; i < length; i++) {
          const child = children[i];
          ele.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
      }
  }
  return ele;
}