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
  response.send('GET all notes');
}

function makeNewNote(request, response) {
  response.send('POST new note');
}

function getNote(request, response) {
  response.send('GET a note');
}

function updateNote(request, response) {
  response.send('PUT a note');
}

function deleteNote(request, response) {
  response.send('DELETE a note');
}
