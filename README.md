# FauxHAL

A faux API for development purposes. The intention here is to create the API structure you expect to use, but don't have access to yet. Is there a 2nd or 3rd party that your team is relying on to build the APIs your app needs? That sh*t is probably in the works, and threatens to change on you. 

Build your app they way you need it to work, and fake out your data calls. 

## Getting Started

We're using [Mongo](https://docs.mongodb.com/manual/installation/?jmp=footer) to store the data we create for our faux API. We're also using [Node](https://nodejs.org/en/) to run our server. Please make sure you have them installed. Then the usual:

```
npm install
```

## Using

In terminal #1, start our server:

```
node server.js
```

You can now access some endpoints at [http://localhost:9000](http://localhost:9000).

In terminal #2, start our mongo database:

```
npm run db
```

This simply runs:

```
mkdir -p data && mongod --dbpath ./data
```

## Try an endpoint

There is a sample endpoint created for you, which allows us to get and manipulate notes. You can get all notes, add a note, get that single note, update that note, and delete that note. Try it out in your app or in Postman.

To get yourself started with some base data, you can run a handy little script to populate some note data for you. You can optionally clean up after yourself after you may have played around too much, and need a fresh start.

``` shell
$ node setup/notes 4
 #will add 4 notes to the notes collection in our mongo database

$ node setup/notes --cleanup
 #will cleanup the notes collection in our mongo database
```

## Generate an endpoint

To quickly create an endpoint for development, you can use the generate script.

``` shell
$ node generate/restful song
```

This will create a starter file in `./api` for you containing the bare functionality to do all the good RESTful things to a song. It will also hook it up to the `./hal.js` file to create our middlewear underwear, and assign that middlewear to the appropriate requests in our `./server.js` file. All this to get you started right. It is assuming you've created a model for this, to be found in `./models/song.js`.

Additionally, you can tell it the correct pluralised version of your endpoint, if it's not so easily transformed with a simple 's' at the end.

``` shell
$ node generate/restful entry entries
```

Find the `./api/entries.js` file and start customising. If you don't want a PUT request for your entries endpoint, for example, remove it from `./server.js`.

### Generate a model to base your endpoint off of

You can quickly get started with your model by using our model generator, which creates an exportable constructor. It will contain, by default, the `_id` and `date` key. You feed to the generator the name of the model, and then any number of keys you'd like this model to have. 

``` shell
$ node generate/model song title artist length album
```

This creates a `./models/song.js` file for you, which would be referenced in the restful endpoint file you may generate, as well as the following setup file you can also generate.

### Generate the setup file for that endpoint

Just like you can setup some fake data for yourself for the notes resource, there is a way to quickly generate a start setup file for your endpoints, too.

``` shell
$ node generate/setup song
```

This will create the `./setup/song.js` file for you to customise to your liking. You can use the `--cleanup` flag, like with the starter `notes.js` setup, to cleanup the mongo collection dedicated to your resource. Look for the **TODO** in the newly generated file, and you will find where to mock out the data to enter into the database.

## Customise it to your needs

This is only a start, and you can and should customise the behaviors of the endpoints of this tool to your needs. 

You can customise the routes and their methods available to development in the `./server.js` file. Don't want to `GET` a single resource? Delete or comment that line out:

``` js
/* 
 * notes information
 */
app
  .get('/notes', fauxhal.notes.get)
  .post('/note', fauxhal.notes.new)
  //.get('/note/:nummer', fauxhal.notes.note) // we never wanted you, anyway
  .put('/note/:nummer', fauxhal.notes.update)
  .delete('/note/:nummer', fauxhal.notes.delete);
```

Do you want to edit the names of available endpoint behaviors, maybe switching out certain endpoints with alternative versions for the simple heck of it? Edit the `./hal.js` file -- this is referenced in the `./server.js` file to provide all the route behaviors.

``` js
var underwear = {
  version: require('./api/version.js'),
  // notes:   require('./api/notes.js')
  notes:   require('./api/alternative-better-notes.js')
};
```

Generated a RESTful endpoint but need it to do moar? Find it in the `./api` directory and edit it directly: maybe you want the GET request of a single resource to watch query paramters for pass back multiple notes. Do it. 

``` js
function getNote(request, response) {
  var directRequest = Number(request.params.nummer);
  var extraParameters = request.query;

  if (extraParameters.start) { ... }
```
