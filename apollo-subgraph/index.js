const {   ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key","@shareable", "@shareable"])

    union ShipmentUnion = ShipmentPending | ShipmentShipped | ShipmentDelivered
    "A simple Address"
    type Address @key(fields: "addressId") {
        addressId: String!
        apolloState: String!
    }

    "A simple Customer"
    type Customer @key(fields: "customerId"){
        customerId: String!
        apolloLastname: String!
    }

    "An Item"
    type Item @key(fields: "itemId"){
        itemId: Int!
        "A Product"
        product: Product!
        apolloCount: Int!
    }

    "An Order"
    type Order @key(fields: "orderId"){
        orderId: String!
        customerId: String!
        items: [Item!]!
    }

    "A Product"
    type Product @key(fields: "productId"){
        productId: String!
        apolloBrand: String!
        apolloDecription: String!
    }

    "A delivered Shipment"
    type ShipmentDelivered @key(fields: "shipmentId"){
        orderId: String!
        shipmentId: String!
        status: String!
        apolloShipmentField: String!
    }

    "A pending Shipment"
    type ShipmentPending @key(fields: "shipmentId"){
        orderId: String!
        shipmentId: String!
        status: String!
        apolloShipmentField: String!
    }

    "A shipped Shipment"
    type ShipmentShipped @key(fields: "shipmentId"){
        orderId: String!
        shipmentId: String!
        status: String!
        apolloShipmentField: String!
    }


    type Query {
        addressesByCustomerId(customerId: String!): [Address!]
        addressByCustomerIdAndAddressId(customerId: String!, addressId: String!): Address
        ordersByCustomerId(customerId: String!, ordersCount: Int): [Order!]
        orderByCustomerIdAndOrderId(customerId: String!, orderId: String!): Order
        productsByCustomerIdAndOrderId(customerId: String!, orderId: String!, productsCounts: Int): [Product!]
        shipmentByShipmentId(shipmentId: String!): ShipmentUnion
    }
`;

const addressesByCustomer = [
    { customerId : "customerId1" , addresses : [{addressId : "addressId1", apolloState : "state1"}, {addressId : "addressId2", apolloState : "state2"}]},
    { customerId : "customerId2" , addresses : [{addressId : "addressId3", apolloState : "state3"}, {addressId : "addressId4", apolloState : "state4"}]},
    { customerId : "customerId3" , addresses : [{addressId : "addressId5", apolloState : "state5"}, {addressId : "addressId6", apolloState : "state6"}]},
    { customerId : "customerId4" , addresses : [{addressId : "addressId7", apolloState : "state7"}, {addressId : "addressId8", apolloState : "state8"}]},
    { customerId : "customerId5" , addresses : [{addressId : "addressId9", apolloState : "state9"}, {addressId : "addressId10", apolloState : "state10"}]},
    { customerId : "customerId6" , addresses : [{addressId : "addressId11", apolloState : "state11"}, {addressId : "addressId12", apolloState : "state12"}]},
    { customerId : "customerId7" , addresses : [{addressId : "addressId13", apolloState : "state13"}, {addressId : "addressId14", apolloState : "state14"}]},
    { customerId : "customerId8" , addresses : [{addressId : "addressId15", apolloState : "state15"}, {addressId : "addressId16", apolloState : "state16"}]},
    { customerId : "customerId9" , addresses : [{addressId : "addressId17", apolloState : "state17"}, {addressId : "addressId18", apolloState : "state18"}]},
    { customerId : "customerId10" , addresses : [{addressId : "addressId19", apolloState : "state19"}, {addressId : "addressId20", apolloState : "state20"}]},
]

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
    { customerId : "customerId10" , apolloLastname : "customerLastname10"},
];

const addresses = [
    {addressId : "addressId1", apolloState : "state1"}, {addressId : "addressId2", apolloState : "state2"},
    {addressId : "addressId3", apolloState : "state3"}, {addressId : "addressId4", apolloState : "state4"},
    {addressId : "addressId5", apolloState : "state5"}, {addressId : "addressId6", apolloState : "state6"},
    {addressId : "addressId7", apolloState : "state7"}, {addressId : "addressId8", apolloState : "state8"},
    {addressId : "addressId9", apolloState : "state9"}, {addressId : "addressId10", apolloState : "state10"},
    {addressId : "addressId11", apolloState : "state11"}, {addressId : "addressId12", apolloState : "state12"},
    {addressId : "addressId13", apolloState : "state13"}, {addressId : "addressId14", apolloState : "state14"},
    {addressId : "addressId15", apolloState : "state15"}, {addressId : "addressId16", apolloState : "state16"},
    {addressId : "addressId17", apolloState : "state17"}, {addressId : "addressId18", apolloState : "state18"},
    {addressId : "addressId19", apolloState : "state19"}, {addressId : "addressId20", apolloState : "state20"},
];

const items = [
    { itemId : 1, product: { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}}, { itemId : 2, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}},
    { itemId : 3, product: { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}}, { itemId : 4, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}},
    { itemId : 5, product: { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}}, { itemId : 6, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}},
    { itemId : 7, product: { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}}, { itemId : 8, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}},
    { itemId : 9, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}}, { itemId : 10, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}},
    { itemId : 11, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}}, { itemId : 12, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}},
    { itemId : 13, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}}, { itemId : 14, product: { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"}},
    { itemId : 15, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}}, { itemId : 16, product: { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"}},
    { itemId : 17, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}}, { itemId : 18, product: { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"}},
    { itemId : 19, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}}, { itemId : 20, product: { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"}},
]

const orders = [
    { orderId : "orderId1", customerId : "customerId1", items : [ { itemId : 1, product: { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}}, { itemId : 2, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}},]},
    { orderId : "orderId2", customerId : "customerId2", items : [ { itemId : 3, product: { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}}, { itemId : 4, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}},]},
    { orderId : "orderId3", customerId : "customerId3", items : [ { itemId : 5, product: { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}}, { itemId : 6, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}},]},
    { orderId : "orderId4", customerId : "customerId4", items : [ { itemId : 7, product: { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}}, { itemId : 8, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}},]},
    { orderId : "orderId5", customerId : "customerId5", items : [ { itemId : 9, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}}, { itemId : 10, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}},]},
    { orderId : "orderId6", customerId : "customerId6", items : [ { itemId : 11, product: { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}}, { itemId : 12, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}},]},
    { orderId : "orderId7", customerId : "customerId7", items : [ { itemId : 13, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}}, { itemId : 14, product: { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"}},]},
    { orderId : "orderId8", customerId : "customerId8", items : [ { itemId : 15, product: { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}}, { itemId : 16, product: { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"}},]},
    { orderId : "orderId9", customerId : "customerId9", items : [ { itemId : 17, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}}, { itemId : 18, product: { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"}},]},
    { orderId : "orderId10", customerId : "customerId10", items : [ { itemId : 19, product: { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}}, { itemId : 20, product: { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"}},]},
]

const products = [
    { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"},
    { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"},
    { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"},
    { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"},
    { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"},
    { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"},
    { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"},
]
 
const shipments = [
    { shipmentId : "shipmentId1", orderId : "orderId1", status : "SHIPPED", apolloShipmentField : "field1"},
    { shipmentId : "shipmentId2", orderId : "orderId3", status : "SHIPPED", apolloShipmentField : "field2"},
    { shipmentId : "shipmentId3", orderId : "orderId5", status : "SHIPPED", apolloShipmentField : "field3"},
    { shipmentId : "shipmentId4", orderId : "orderId1", status : "PENDING", apolloShipmentField : "field4"},
    { shipmentId : "shipmentId5", orderId : "orderId3", status : "PENDING", apolloShipmentField : "field5"},
    { shipmentId : "shipmentId6", orderId : "orderId5", status : "PENDING", apolloShipmentField : "field6"},
    { shipmentId : "shipmentId7", orderId : "orderId1", status : "DELIVERED", apolloShipmentField : "field7"},
    { shipmentId : "shipmentId8", orderId : "orderId3", status : "DELIVERED", apolloShipmentField : "field8"},
    { shipmentId : "shipmentId9", orderId : "orderId5", status : "DELIVERED", apolloShipmentField : "field9"},
]

const productsByCustomerAndOrder = [
    { orderId : "orderId1", customerId : "customerId1" , products : [ { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}, { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"} ]},
    { orderId : "orderId2", customerId : "customerId2" , products : [ { productId : "productId1", apolloBrand : "brand1", apolloDescription : "description1"}, { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"} ]},
    { orderId : "orderId3", customerId : "customerId3" , products : [ { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}, { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"} ]},
    { orderId : "orderId4", customerId : "customerId4" , products : [ { productId : "productId2", apolloBrand : "brand2", apolloDescription : "description2"}, { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"} ]},
    { orderId : "orderId5", customerId : "customerId5" , products : [ { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}, { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"} ]},
    { orderId : "orderId6", customerId : "customerId6" , products : [ { productId : "productId3", apolloBrand : "brand3", apolloDescription : "description3"}, { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"} ]},
    { orderId : "orderId7", customerId : "customerId7" , products : [ { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}, { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"} ]},
    { orderId : "orderId8", customerId : "customerId8" , products : [ { productId : "productId4", apolloBrand : "brand4", apolloDescription : "description4"}, { productId : "productId6", apolloBrand : "brand6", apolloDescription : "description6"} ]},
    { orderId : "orderId9", customerId : "customerId9" , products : [ { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}, { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"} ]},
    { orderId : "orderId10", customerId : "customerId10" , products : [ { productId : "productId5", apolloBrand : "brand5", apolloDescription : "description5"}, { productId : "productId7", apolloBrand : "brand7", apolloDescription : "description7"} ]},
]

const resolvers = {
    Query: {
        addressesByCustomerId(parent, args, context, info) {
            const addresses = addressesByCustomer.find(obj => obj.customerId == args.customerId).addresses
            return addresses;
        },
        addressByCustomerIdAndAddressId(parent, args, context, info) {
            const addresses = addressesByCustomer.find(obj => obj.customerId == args.customerId).addresses;
            return addresses.find(address => address.addressId == args.addressId);
        },
        ordersByCustomerId(parent, args, context, info){
            const ordersFilter = orders.collect(order => order.customerId == args.customerId);
            return ordersFilter;
        },
        orderByCustomerIdAndOrderId(parent, args, context, info){
            const order = orders.find(ord => ord.orderId == args.orderId && ord.customerId == args.customerId);
            return order;
        },
        productsByCustomerIdAndOrderId(parent, args, context, info){
            const productsResp = productsByCustomerAndOrder.find(obj => obj.customerId == args.customerId && obj.orderId == args.orderId).products;
            return productsResp;
        },
        shipmentsByShipmentId(parent, args, context, info){
            const shipment = shipments.find(ship => ship.shipmentId == args.shipmentId);
            return shipment;
        },
    },
    ShipmentUnion: {
        __resolveType(obj, context, info) {
            if(obj.status && obj.status == "PENDING")
                return "ShipmentPending";
            if(obj.status && obj.status == "SHIPPED")
                return "ShipmentShipped";
            if(obj.status && obj.status == "DELIVERED")
                return "ShipmentDelivered";

            return null;
        }
    },
    Address: {
      __resolveReference(addressRef){
            const address = address.find(a => a.addressId == addressRef.addressId);
            return address;
        }
      },
    Customer: {
    __resolveReference(customerRef){
            const customer = customers.find(c => c.customerId == customerRef.customerId);
            return customer;
        }
    },
    Item: {
        __resolveReference(itemRef){
            const item = items.find(item => item.itemId = itemRef.itemId);
            return item;
        }
    },
    Order: {
        __resolveReference(orderRef){
            const order = orders.find(ord => ord.orderId == orderRef.orderId);
            return order;q
        }
    },
    Product: {
        __resolveReference(productRef){
            const product = products.find(prod => prod.productId == productRef.productId);
            return product;
        }
    },
    ShipmentPending: {
        __resolveReference(shipmentRef){
            const shipment = shipments.find(ship => ship.status == "PENDING" && ship.shipmentId == shipmentRef.shipmentId);
            return shipment;
        }
    },
    ShipmentDelivered: {
        __resolveReference(shipmentRef){
            const shipment = shipments.find(ship => ship.status == "DELIVERED" && ship.shipmentId == shipmentRef.shipmentId);
            return shipment;
        }
    },
    ShipmentShipped: {
        __resolveReference(shipmentRef){
            const shipment = shipments.find(ship => ship.status == "SHIPPED" && ship.shipmentId == shipmentRef.shipmentId);
            return shipment;
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