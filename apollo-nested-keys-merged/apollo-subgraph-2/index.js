const {   ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key","@shareable", "@external", "@provides", "@requires", "@inaccessible"])

    type Customer @key(fields: "customerId"){
        customerId: String!
        name: String! @external
        apolloLastname: String!
        fullname: String! @requires(fields: "name")
    }

    type Item @key(fields: "itemId product { productId }"){
        itemId: String!
        product: Product! 
        apolloAField: String!
    }

    type Product @key(fields: "productId"){
        productId: String!
        apolloBrand: String
        apolloDecription: String!
    }
`;

const customers = [
    { customerId : "customerId1" , apolloLastname : "customerLastname1"},
    { customerId : "customerId2" , apolloLastname : "customerLastname2"},
    { customerId : "customerId3" , apolloLastname : "customerLastname3"},
    { customerId : "customerId4" , apolloLastname : "customerLastname4"},
    { customerId : "customerId5" , apolloLastname : "customerLastname5"},
    { customerId : "customerId6" , apolloLastname : "customerLastname6"},
    { customerId : "customerId7" , apolloLastname : "customerLastname7"},
    { customerId : "customerId8" , apolloLastname : "customerLastname8"},
    { customerId : "customerId9" , apolloLastname : "customerLastname9"},
    { customerId : "customerId10", apolloLastname : "customerLastname10"},
];

const items = [
    { itemId : "itemId1",apolloAField: "apolloAField1", product: { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}},
    { itemId : "itemId2",apolloAField: "apolloAField2", product: { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}},
    { itemId : "itemId3",apolloAField: "apolloAField3", product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}}, 
    { itemId : "itemId4",apolloAField: "apolloAField4", product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}},
    { itemId : "itemId5",apolloAField: "apolloAField5", product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}}, 
    { itemId : "itemId6",apolloAField: "apolloAField6", product: { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"}},
    { itemId : "itemId7",apolloAField: "apolloAField7", product: { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"}}, 
    { itemId : "itemId8",apolloAField: "apolloAField8", product: { productId : "productId8", apolloBrand : "brand8", apolloDecription : "description8"}},
    { itemId : "itemId9",apolloAField: "apolloAField9", product: { productId : "productId9", apolloBrand : "brand9", apolloDecription : "description9"}}, 
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
    Customer: {
    __resolveReference(customerRef){
            const customer = customers.find(c => c.customerId == customerRef.customerId);
            return {...customer,customerRef};
        },
    fullname(customerRef){
        return customerRef.name + " " + customerRef.apolloLastname;
    }
    },
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