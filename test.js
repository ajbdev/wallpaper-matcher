const Matcher = require('./dist/Matcher').default;

(async function() {
  const matcher = new Matcher(process.argv.slice(2));

  const results = await matcher.match();

  console.log(results);
})();

