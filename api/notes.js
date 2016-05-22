var assert = require('assert');

var Note = require('../models/note.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/fauxhal';

module.exports = {
  get: getAllNotes,
  new: makeNewNote,
  note: getNote,
  update: updateNote,
  delete: deleteNote
};

//////

function getAllNotes(request, response) {
  connectToNotesCollection(function(error, db) {
    assert.equal(error, null);

    var notes = db.collection('notes');
    notes.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      db.close();
      console.log('GET notes');
      
      response.send(docs);
    });
  });
}

function makeNewNote(request, response) {
  var note = new Note(request.body);

  connectToNotesCollection(function(error, db) {
    assert.equal(error, null);

    db.collection('notes').insertOne(note);
    db.close();
    console.log('POST notes');

    response.status(200).end();
  });
}

function getNote(request, response) {
  var directRequest = Number(request.params.nummer);
  // TODO you might want a fancier query
  // var extraParameters = request.query;

  connectToNotesCollection(function(error, db) {
    assert.equal(error, null);

    var notes = db.collection('notes');

    notes.find({'_id': directRequest}).toArray(function(err, doc) {
      assert.equal(err, null);

      db.close();
      console.log('GET note');

      response.send(doc);
    });
  });
}

function updateNote(request, response) {
  var directRequest = Number(request.params.nummer);
  var data = request.body;

  connectToNotesCollection(function(error, db) {
    assert.equal(error, null);

    var notes = db.collection('notes');

    var thisOne = { '_id': directRequest };
    var howToUpdate = { $set: data };
    notes.updateOne(thisOne, howToUpdate, function(err, result) {
      assert.equal(err, null);

      db.close();
      console.log('PUT note');

      response.status(200).end();
    });
  });
}

function deleteNote(request, response) {
  var directRequest = Number(request.params.nummer);

  connectToNotesCollection(function(error, db) {
    assert.equal(error, null);

    var notes = db.collection('notes');

    var thisOne = { '_id': directRequest };
    notes.deleteOne(thisOne, function(err, result) {
      assert.equal(err, null);
      assert.equal(result.result.n, 1);

      db.close();
      console.log('DEL note');

      response.status(200).end();
    });
  });
}

//////

function connectToNotesCollection(callback) {
  MongoClient.connect(url, callback);
}
