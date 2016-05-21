var package = require('../package.json');

module.exports = function(request, response) {
  response.send(package.version);
};
