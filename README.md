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
mongod --dbpath ./data
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
