const {   ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key","@shareable", "@external", "@provides", "@requires", "@inaccessible"])

    type Item @key(fields: "itemId product { productId }"){
        itemId: String!
        product: Product! 
        apolloBField: String!
    }

    type Product @key(fields: "productId"){
        productId: String!
        code: String!
    }
`;

const items = [
    { itemId : "itemId1",apolloBField: "apolloBField1", product: { productId : "productId1", code: "code1"}},
    { itemId : "itemId2",apolloBField: "apolloBField2", product: { productId : "productId2", code: "code2"}},
    { itemId : "itemId3",apolloBField: "apolloBField3", product: { productId : "productId3", code: "code3"}}, 
    { itemId : "itemId4",apolloBField: "apolloBField4", product: { productId : "productId4", code: "code4"}},
    { itemId : "itemId5",apolloBField: "apolloBField5", product: { productId : "productId5", code: "code5"}}, 
    { itemId : "itemId6",apolloBField: "apolloBField6", product: { productId : "productId6", code: "code6"}},
    { itemId : "itemId7",apolloBField: "apolloBField7", product: { productId : "productId7", code: "code7"}}, 
    { itemId : "itemId8",apolloBField: "apolloBField8", product: { productId : "productId8", code: "code8"}},
    { itemId : "itemId9",apolloBField: "apolloBField9", product: { productId : "productId9", code: "code9"}}, 
]
const products = [
    { productId : "productId1", apolloBrand : "apolloBrand1", apolloDecription : "description1"},
    { productId : "productId2", apolloBrand : "apolloBrand2", apolloDecription : "description2"},
    { productId : "productId3", apolloBrand : "apolloBrand3", apolloDecription : "description3"},
    { productId : "productId4", apolloBrand : "apolloBrand4", apolloDecription : "description4"},
    { productId : "productId5", apolloBrand : "apolloBrand5", apolloDecription : "description5"},
    { productId : "productId6", apolloBrand : "apolloBrand6", apolloDecription : "description6"},
    { productId : "productId7", apolloBrand : "apolloBrand7", apolloDecription : "description7"},
    { productId : "productId8", apolloBrand : "apolloBrand8", apolloDecription : "description8"},
    { productId : "productId9", apolloBrand : "apolloBrand9", apolloDecription : "description9"},
]
 

const resolvers = {
    Item: {
        __resolveReference(itemRef){
            const item = items.find(item => item.itemId = itemRef.itemId && item.product.productId == itemRef.product.productId);
            return item;
        }
    },
    Product: {
        __resolveReference(productRef){
            const product = products.find(prod => prod.productId == productRef.productId);
            return product;
        }
    }
};

    
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers})
  });
  
  // The `listen` method launches a web server.
  server.listen(8080).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });