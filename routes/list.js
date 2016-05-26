// Let's list out all the routes we have added
// in a pretty fashion
var data = require('./.routes.json');

data.forEach(function(d, index) {
  data[index] = d.join('\t');
});

console.log(data.join('\n'));
