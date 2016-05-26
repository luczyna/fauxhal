# Preparing for Type Checking

If we want to enforce types with our faux API, there is setup we need to do to enable our endpoints to handle this extra requirement. Let's go through the setup for a **song**.

``` shell
$ node generate/restful song
  generated a song resource

$ node generate/model song title:string length:number fav:boolean
  generated a song model file
```

## Looking at the Model

If you look into the `./models/song.js` file, you'll see an object there describing the types for the keys we've designated. 

``` js
this._typeset = {
  title: 'string',
  length: 'number',
  fav: 'boolean'
};
```

That's our way of storing the type data for each key. We're not done, though, since we're not actively checking the input to the model and seeing if they are what they should be. We can do this with the following:

``` js
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
```

Now, if we test our model in the Node interactive shell, and try to feed the constructor a length of '12' instead of 12, it will fail and give us an error message. You can also find this snippet in `./generate/templates/model__typechecking.js`, and it's safe to stick it after the `_typeset` object declaration and before the `data.date` check.

## Looking at the Endpoints

Moving on to the `./api/songs.js` file, where the requests will get handled, we can look at all the functions for all the methods we're handling. If we start our server, we can now test some song creation.

``` shell
$ node server.js
```

In an app like [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop), you can make a `POST` request to `http://localhost:9000/song`, and fill out the body of the request, set to url-formencoded, to the following:

```
title    'Trouble Maker'
length   2
fav      true
```

Hit send on that sucker and... failure. The model type checking is doing it's job, and throwing a fit about the length and fav data, saying that it's being fed strings. Let's help our endpoint out:

``` js
// in ./api/songs.api
function makeNewSong(request, response) {
  var data = creatingData(request.body);
  var song = new Song(data);
  ...
}

function creatingData(body, isNew) {
  if (isNew === undefined) isNew = true;

  var data = {};
  var errors = [];

  if (body.title) {
    data.title = String(body.title);
  } else if (isNew) {
    errors.push('a title is required');
  }

  if (body.length) {
    data.length = Number(body.length);
  } else if (isNew) {
    data.length = null;
  }

  if (body.fav) {
    data.fav = (body.fav.toLowerCase() === 'true') ? Boolean(1) : Boolean(0);
  } else if (isNew) {
    data.fav = false;
  }

  if (errors.length) throw errors.join('\n');

  return data;
}
```

Here we're doing two things: checking for a required field (title) and converting data to their types. If the type conversion went wrong, then the model will still throw its fit about wrong types. If the value was missing but not required, then it will not complain about the value or type of that value.

We should also edit the function handling the `PUT` request, which will also be checking for data types:

``` js
function updateSong(request, response) {
  var directRequest = Number(request.params.nummer);
  var data = creatingData(request.body, false);

  ...
}
```

Passing the `false` value as the second parameter to the `creatingData` method will allow fields to be missing from the request. If you have an API that calls for the entire object to be sent when making updates to it, then this is less of a worry for you.
