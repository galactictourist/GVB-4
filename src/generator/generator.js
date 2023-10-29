const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/generator/build.js`);

(() => {
  buildSetup();
  startCreating();
})();
