const ct = require('colorthief');
const process = require('process');
const fs = require('fs');
const _ = require('lodash');
const _path = require('path');
const { glob } = require('glob');
const getColors = require('get-image-colors');

const drivers = {
  'get-image-colors': (file) => {
    
  }
}


const matchWallpapers = async (paths) => {
  const files = _.flatten(_.compact(paths.map((path) => { 
    const p = fs.existsSync(path) && fs.lstatSync(path).isDirectory() ? (_path.resolve(path) + '/*') : path;
  
    return glob.sync(p) 
  })));

  const palettes = await Promise.all(files.map(async file => { 
    //const palette = await ct.getPalette(file, 5);

    //const palette = await Vibrant.from(file).getPalette();

    const palette = await getColors(file);
  
    return {
      file: file,
      palette: palette
    }
  }));

  console.log(palettes);
};

matchWallpapers(process.argv.slice(2))

// ct.getPalette(path, 5).then(palette => console.log(palette));
