const Matcher = require('./dist/Matcher').default;
const process = require('process');
const fs = require('fs');
const _ = require('lodash');
const _path = require('path');
const { glob } = require('glob');

(async function() {

  const files = _.compact(process.argv.slice(2).map((path) => { 
    const p = fs.existsSync(path) && fs.lstatSync(path).isDirectory() ? (_path.resolve(path) + '/*') : path;
  
    return glob.sync(p) 
  }));

  const matcher = new Matcher(...files);

  const results = await matcher.match();
})();

