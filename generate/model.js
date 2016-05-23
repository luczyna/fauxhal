var fs = require('fs');

var generateWithThese = {
  modal: './generate/templates/model.js'
};

var params = getArguments();
if (!params) process.exit();

generateModel();

//////

function generateModel() {
  var destination = './models/' + params.name + '.js';

  fs.readFile(generateWithThese.modal, {encoding: 'utf-8'}, function(error, data) {
    if (error) throw error;

    var allTheThings = '';

    params.keys.forEach(function(key, index) {
      if (index !== 0) {
        // helpful serving of tabs
        allTheThings += '  ';
      }
      allTheThings += 'this.' + key + ' = data.' + key + ';\n';
    });

    var thisIsFile = data.replace(new RegExp('{{goodness}}', 'g'), allTheThings);

    fs.writeFile(destination, thisIsFile, function(writeError) {
      if (writeError) throw writeError;

      console.log('generated %s modal file', params.name);
      process.exit(0);
    });
  });
}

//////

function getArguments() {
  var argumentsToUse = process.argv.slice(2);

  if (!argumentsToUse.length) {
    argumentsToUse = false;
    console.log('you didn\'t ask for anything...');

  } else if (argumentsToUse.indexOf('--help') > -1) {
    argumentsToUse = false;
    provideManual();

  } else {
    // TODO perform parameter checking after this
    // console.log('try that again, maybe ask for help...');
    // argumentsToUse = false;

    var whatToUse = {
      name: null,
      keys: []
    };

    whatToUse.name = argumentsToUse[0].toLowerCase();
    for (var i = 1; i < argumentsToUse.length; i++) {
      whatToUse.keys.push(argumentsToUse[i].toLowerCase());
    }

    argumentsToUse = whatToUse;
  }

  return argumentsToUse;
}

function provideManual() {
  var manual = [
    'generate a model for a certain resource',
    '  @param name',
    '  provide the name of the modal',
    '  this will name the api single',
    '',
    '  @param ...keys',
    '  list out any keys this model should have'
  ];

  console.log(manual.join('\n'));
}
