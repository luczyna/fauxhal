var assert = require('assert');

var Note = require('../models/note.js');
var MongoClient = require('mongodb').MongoClient;
var faker = require('faker');

var url = 'mongodb://localhost:27017/fauxhal';

var params = getArguments();
if (!params) return;

addFakeData(params);

//////

function getArguments() {
  var argumentsToUse = process.argv.slice(2);

  if (!argumentsToUse.length) {
    argumentsToUse = false;
    console.log('you didn\'t ask for anything...');

  } else if (argumentsToUse.indexOf('--help') > -1) {
    argumentsToUse = false;
    provideManual();

  } else if (argumentsToUse.indexOf('--cleanup') > -1) {
    argumentsToUse = false;
    refreshNotes();

  } else {
    // we're expecting the argument to be a nummer, greater than 0
    var converted = Number(argumentsToUse[0]);
    if (argumentsToUse.length > 1 || typeof converted !== 'number' || converted === 0) {
      argumentsToUse = false;
      console.log('try that again, maybe ask for help...');
    }
  }

  return argumentsToUse;
}
//////

function refreshNotes() {
  MongoClient.connect(url, function(connectError, db) {
    assert.equal(connectError, null);

    var notes = db.collection('notes');
    notes.remove({}, function(removeError, result) {
      assert.equal(removeError, null);

      db.close();
      console.log('cleaned up the notes collection');
    });
  });
}

function addFakeData(howMany) {
  var fake = makeFakeData(howMany);

  MongoClient.connect(url, function(connectError, db) {
    assert.equal(connectError, null);

    var notes = db.collection('notes');
    notes.insertMany(fake, function(insertError, result) {
      assert.equal(insertError, null);
      assert.equal(result.result.n, howMany);

      db.close();
      console.log('added %s notes to start playing with', howMany);
    });
  });
}

function makeFakeData(howMany) {
  var data = [];
  for (var i = 0; i < howMany; i++) {
    var iteration = {
      title: faker.lorem.words(),
      content: faker.lorem.sentence()
    }

    data.push(new Note(iteration));
  }

  return data;
}

function provideManual() {
  var manual = [
    'provide a helping hand setting up some fake data',
    '  @param nummer',
    '  how many fake data entries you\'d like',
    '',
    'or optionally cleaning up after you made a boo boo',
    '  @param --cleanup'
  ];

  console.log(manual.join('\n'));
}
