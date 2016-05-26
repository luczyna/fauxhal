var errors = [];
var self = this;
Object.keys(this._typeset).forEach(function(key) {
  var is = typeof data[key];
  var shouldbe = self._typeset[key];

  if (shouldbe !== is) {
    errors.push(key + ' should be ' + shouldbe + ', but is ' + is);
  }
});

if (errors.length) throw errors.join('\n');
