const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key","@shareable", "@shareable"])

  type User @key(fields: "userId") @shareable{
    userId: String!
    name: String!
    surname: String!
  }

  type Query {
    userByUserId(userId: String!): User  @shareable
  }
`;

const users = [
  {
    userId: 'userId1',
    name: 'Tony',
    surname: 'Stark'
  },
  {
      userId: 'userId2',
      name: 'Steve',
      surname: 'Rogers'
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    userByUserId(parent, args, context, info) {
      if(args.userId == 'userId1'){
        return users[0]
      }else{
        return users[1]
      }
    }
  },
  User: {
    __resolveReference(user){
        if(user.userId == 'userId1'){
          return {...user, ...users[0]}
        }else{
          return {...user, ...users[1]}
        }
      }
    }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

// The `listen` method launches a web server.
server.listen(8080).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
