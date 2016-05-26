var fs = require('fs');

module.exports = makeRoutesFile;

//////

function makeRoutesFile(routerStack) {
  var routes = [];

  routerStack.forEach(function(rt) {
    if (rt.route !== undefined) {
      routes.push([rt.route.stack[0].method.toUpperCase(), rt.route.path]);
    }
  });

  writeFile(routes);
}

function writeFile(contents) {
  fs.writeFile('./routes/.routes.json', JSON.stringify(contents, null, 2), function(writeError) {
    if (writeError) throw writeError;
  });
}
