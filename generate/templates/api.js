var assert = require('assert');

var {{uppercase}} = require('../models/{{lowercase}}.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/fauxhal';

module.exports = {
  get: getAll{{uppercasePlural}},
  new: makeNew{{uppercase}},
  {{lowercase}}: get{{uppercase}},
  update: update{{uppercase}},
  delete: delete{{uppercase}}
};

//////

function getAll{{uppercasePlural}}(request, response) {
  connectTo{{uppercasePlural}}Collection(function(error, db) {
    assert.equal(error, null);

    var {{lowercasePlural}} = db.collection('{{lowercasePlural}}');
    {{lowercasePlural}}.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      db.close();
      console.log('GET {{lowercasePlural}}');
      
      response.send(docs);
    });
  });
}

function makeNew{{uppercase}}(request, response) {
  var {{lowercase}} = new {{uppercase}}(request.body);

  connectTo{{uppercasePlural}}Collection(function(error, db) {
    assert.equal(error, null);

    db.collection('{{lowercasePlural}}').insertOne({{lowercase}});
    db.close();
    console.log('POST {{lowercasePlural}}');

    response.status(200).end();
  });
}

function get{{uppercase}}(request, response) {
  var directRequest = Number(request.params.nummer);
  // var extraParameters = request.query;

  connectTo{{uppercasePlural}}Collection(function(error, db) {
    assert.equal(error, null);

    var {{lowercasePlural}} = db.collection('{{lowercasePlural}}');

    {{lowercasePlural}}.find({'_id': directRequest}).toArray(function(err, doc) {
      assert.equal(err, null);

      db.close();
      console.log('GET {{lowercase}}');

      response.send(doc);
    });
  });
}

function update{{uppercase}}(request, response) {
  var directRequest = Number(request.params.nummer);
  var data = request.body;

  connectTo{{uppercasePlural}}Collection(function(error, db) {
    assert.equal(error, null);

    var {{lowercasePlural}} = db.collection('{{lowercasePlural}}');

    var thisOne = { '_id': directRequest };
    var howToUpdate = { $set: data };
    {{lowercasePlural}}.updateOne(thisOne, howToUpdate, function(err, result) {
      assert.equal(err, null);

      db.close();
      console.log('PUT {{lowercase}}');

      response.status(200).end();
    });
  });
}

function delete{{uppercase}}(request, response) {
  var directRequest = Number(request.params.nummer);

  connectTo{{uppercasePlural}}Collection(function(error, db) {
    assert.equal(error, null);

    var {{lowercasePlural}} = db.collection('{{lowercasePlural}}');

    var thisOne = { '_id': directRequest };
    {{lowercasePlural}}.deleteOne(thisOne, function(err, result) {
      assert.equal(err, null);
      assert.equal(result.result.n, 1);

      db.close();
      console.log('DEL {{lowercase}}');

      response.status(200).end();
    });
  });
}

//////

function connectTo{{uppercasePlural}}Collection(callback) {
  MongoClient.connect(url, callback);
}
