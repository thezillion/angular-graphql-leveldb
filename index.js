var express = require('express');
var path = require('path');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');
var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

var app = express();
app.use(cors());
app.use('/api', require('./schema'));
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(require('./schema.js'));

app.listen(4000, function(req, res) {
  console.log('Running the Client server at localhost:4000');
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
