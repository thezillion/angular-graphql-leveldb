var express = require('express');
var router = express.Router();
var path = require('path');
var graphqlHTTP = require('express-graphql');
var { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');

const level = require('level')
const sublevel = require('level-sublevel')

const db = sublevel(level('./db'))
const bearsdb = db.sublevel('bears')
const regionsdb = db.sublevel('regions')

const RegionType = new GraphQLObjectType({
  name: 'Region',
  fields: {
    key: { type: GraphQLString },
    name: { type: GraphQLString },
  }
})

const BearType = new GraphQLObjectType({
  name: 'Bear',
  fields: {
    key: { type: GraphQLString },
    type: { type: GraphQLString },
    region: {
      type: RegionType,
      resolve(obj, args) {
        var region_key = obj.region;
        if (region_key) {
          return new Promise((resolve, reject) => {
            regionsdb.get(region_key, function(err, region) {
              region = JSON.parse(region)
              region.key = region_key
              resolve(region)
            });
          })
        } else {
          return false;
        }
      }
    }
  }
})


var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello World!';
        }
      },
      bears: {
        type: (BearType),
        args: {
          key: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          var key = params.key;
          if (key) {
            return new Promise((resolve, reject) => {
              bearsdb.get(key, function(err, bear) {
                bear = JSON.parse(bear)
                bear.key = key
                resolve(bear)
              });
            })
          } else {
            return false;
          }
        }
      }
    }
  })
});

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router;
