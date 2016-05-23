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
