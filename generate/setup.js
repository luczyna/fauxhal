var fs = require('fs');

var generateWithThese = {
  setup: './generate/templates/setup.js'
};
var findWithThese = getRegExed();

var params = getArguments();
if (!params) process.exit();

generateSetup();

//////

function generateSetup() {
  var destination = './setup/' + params.plural.lowercase + '.js';

  fs.readFile(generateWithThese.setup, {encoding: 'utf-8'}, function(error, data) {
    if (error) throw error;

    var thisIsFile = data.replace(findWithThese.lowercase, params.lowercase);
    thisIsFile = thisIsFile.replace(findWithThese.uppercase, params.uppercase);
    thisIsFile = thisIsFile.replace(findWithThese.plural.lowercase, params.plural.lowercase);
    thisIsFile = thisIsFile.replace(findWithThese.plural.uppercase, params.plural.uppercase);

    fs.writeFile(destination, thisIsFile, function(writeError) {
      if (writeError) throw writeError;

      console.log('generated %s setup file, go in and edit its fake data generation', params.plural.lowercase);
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

    var generatedNames = {
      uppercase: null,
      lowercase: null,
      plural: {
        uppercase: null,
        lowercase: null
      }
    };

    generatedNames.lowercase = argumentsToUse[0].toLowerCase();
    generatedNames.uppercase = generatedNames.lowercase[0].toUpperCase() + generatedNames.lowercase.slice(1);

    if (argumentsToUse.length === 1) {
      generatedNames.plural.lowercase = generatedNames.lowercase + 's';
      generatedNames.plural.uppercase = generatedNames.uppercase + 's';
    } else {
      generatedNames.plural.lowercase = argumentsToUse[1].toLowerCase();
      generatedNames.plural.uppercase = generatedNames.plural.lowercase[0].toUpperCase() + generatedNames.plural.lowercase.slice(1);
    }

    argumentsToUse = generatedNames;
  }

  return argumentsToUse;
}

function getRegExed() {
  return {
    lowercase: new RegExp('{{lowercase}}', 'g'),
    uppercase: new RegExp('{{uppercase}}', 'g'),
    plural: {
      lowercase: new RegExp('{{lowercasePlural}}', 'g'),
      uppercase: new RegExp('{{uppercasePlural}}', 'g'),  
    }
  };
}

function provideManual() {
  var manual = [
    'generate an setup script for a certain resource',
    '  helps you to create some fake data in your database, or clean it up',
    '  you will need to customise it with fake data for your model',
    '  just look for the TODO',
    '',
    '  @param single',
    '  provide the name of the modal in the ./models directory',
    '  this will name the api single',
    '',
    '  @param plural',
    '  pluralise the api name, will default to add an "s" to @param `single`'
  ];

  console.log(manual.join('\n'));
}
