# Angular-GraphQL-LevelDB

This is an implementation of an Angular Service that queries a GraphQL endpoint, that in turn pulls data from a LevelDB instance.

## Setup

```sh
$ nvm use v7.10.0 # install this version
$ cd angular-graphql-leveldb
$ yarn install
$ cd client
$ yarn install
$ ng build --prod
$ cd ..
$ node ./db.js # setup leveldb
$ node index.js
```

## File structure

  - db.js contains the db setup. It saves the db to /db
  - client/ contains the static files for the server
  - index.js is the index file
  - schema.js contains the GraphQL schema
