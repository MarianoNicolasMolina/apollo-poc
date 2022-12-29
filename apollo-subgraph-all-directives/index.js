const {   ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key","@shareable", "@external", "@provides", "@requires", "@inaccessible"])

    union ShipmentUnion = ShipmentPending | ShipmentShipped | ShipmentDelivered
    "A simple Address"
    type Address @key(fields: "addressId") {
        addressId: String!
        apolloState: String! @inaccessible
    }

    "A simple Customer"
    type Customer @key(fields: "customerId address { addressId }"){
        customerId: String!
        name: String! @external
        apolloLastname: String!
        address: Address!
        fullname: String! @requires(fields: "name")
    }

    "An Item"
    type Item @key(fields: "itemId"){
        itemId: Int!
        "A Product"
        product: Product! @provides(fields : "apolloBrand")
        apolloCount: Int!
    }

    "An Order"
    type Order @key(fields: "orderId orderCode"){
        orderId: String!
        orderCode: String!
        customerId: String!
        items: [Item!]!
    }

    "A Product"
    type Product @key(fields: "productId"){
        productId: String!
        apolloBrand: String @external
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
        addressByCustomerId(customerId: String!): Address
        ordersByCustomerId(customerId: String!, ordersCount: Int): [Order!]
        orderByCustomerIdAndOrderId(customerId: String!, orderId: String!): Order
        productsByCustomerIdAndOrderId(customerId: String!, orderId: String!, productsCounts: Int): [Product!]
        shipmentByShipmentId(shipmentId: String!): ShipmentUnion
    }
`;

const customers = [
    { customerId : "customerId1" , name: "customerName1", apolloLastname : "customerLastname1", address: {addressId : "addressId1", apolloState : "state1"}},
    { customerId : "customerId2" , name: "customerName2", apolloLastname : "customerLastname2", address: {addressId : "addressId2", apolloState : "state2"}},
    { customerId : "customerId3" , name: "customerName3", apolloLastname : "customerLastname3", address: {addressId : "addressId3", apolloState : "state3"}},
    { customerId : "customerId4" , name: "customerName4", apolloLastname : "customerLastname4", address: {addressId : "addressId4", apolloState : "state4"}},
    { customerId : "customerId5" , name: "customerName5", apolloLastname : "customerLastname5", address: {addressId : "addressId5", apolloState : "state5"}},
    { customerId : "customerId6" , name: "customerName6", apolloLastname : "customerLastname6", address: {addressId : "addressId6", apolloState : "state6"}},
    { customerId : "customerId7" , name: "customerName7", apolloLastname : "customerLastname7", address: {addressId : "addressId7", apolloState : "state7"}},
    { customerId : "customerId8" , name: "customerName8", apolloLastname : "customerLastname8", address: {addressId : "addressId8", apolloState : "state8"}},
    { customerId : "customerId9" , name: "customerName9", apolloLastname : "customerLastname9", address: {addressId : "addressId9", apolloState : "state9"}},
    { customerId : "customerId10", name: "customerName10" , apolloLastname : "customerLastname10", address: {addressId : "addressId10", apolloState : "state10"}},
];

const addresses = [
    {addressId : "addressId1", apolloState : "state1"}, {addressId : "addressId2", apolloState : "state2"},
    {addressId : "addressId3", apolloState : "state3"}, {addressId : "addressId4", apolloState : "state4"},
    {addressId : "addressId5", apolloState : "state5"}, {addressId : "addressId6", apolloState : "state6"},
    {addressId : "addressId7", apolloState : "state7"}, {addressId : "addressId8", apolloState : "state8"},
    {addressId : "addressId9", apolloState : "state9"}, {addressId : "addressId10", apolloState : "state10"}
];

const items = [
    { itemId : 1, product: { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}}, { itemId : 2, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}},
    { itemId : 3, product: { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}}, { itemId : 4, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}},
    { itemId : 5, product: { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}}, { itemId : 6, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}},
    { itemId : 7, product: { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}}, { itemId : 8, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}},
    { itemId : 9, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}}, { itemId : 10, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}},
    { itemId : 11, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}}, { itemId : 12, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}},
    { itemId : 13, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}}, { itemId : 14, product: { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"}},
    { itemId : 15, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}}, { itemId : 16, product: { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"}},
    { itemId : 17, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}}, { itemId : 18, product: { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"}},
    { itemId : 19, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}}, { itemId : 20, product: { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"}},
]

const orders = [
    { orderId : "orderId2",orderCode: "orderCode1", customerId : "customerId2", items : [ { itemId : 3, apolloCount: 5, product: { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}}, { itemId : 4, apolloCount: 5, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}},]},
    { orderId : "orderId1",orderCode: "orderCode2", customerId : "customerId1", items : [ { itemId : 1, apolloCount: 5, product: { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}}, { itemId : 2, apolloCount: 5, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}},]},
    { orderId : "orderId3",orderCode: "orderCode3", customerId : "customerId3", items : [ { itemId : 5, apolloCount: 5, product: { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}}, { itemId : 6, apolloCount: 5, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}},]},
    { orderId : "orderId4",orderCode: "orderCode4", customerId : "customerId4", items : [ { itemId : 7, apolloCount: 5, product: { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}}, { itemId : 8, apolloCount: 5, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}},]},
    { orderId : "orderId5",orderCode: "orderCode5", customerId : "customerId5", items : [ { itemId : 9, apolloCount: 5, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}}, { itemId : 10, apolloCount: 5, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}},]},
    { orderId : "orderId6",orderCode: "orderCode6", customerId : "customerId6", items : [ { itemId : 11, apolloCount: 5, product: { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}}, { itemId : 12, apolloCount: 5, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}},]},
    { orderId : "orderId7",orderCode: "orderCode7", customerId : "customerId7", items : [ { itemId : 13, apolloCount: 5, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}}, { itemId : 14, apolloCount: 5, product: { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"}},]},
    { orderId : "orderId8",orderCode: "orderCode8", customerId : "customerId8", items : [ { itemId : 15, apolloCount: 5, product: { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}}, { itemId : 16, apolloCount: 5, product: { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"}},]},
    { orderId : "orderId9",orderCode: "orderCode9", customerId : "customerId9", items : [ { itemId : 17, apolloCount: 5, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}}, { itemId : 18, apolloCount: 5, product: { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"}},]},
    { orderId : "orderId10",orderCode: "orderCode10", customerId : "customerId10", items : [ { itemId : 19, apolloCount: 5, product: { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}}, { itemId : 20, apolloCount: 5, product: { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"}},]},
]

const products = [
    { productId : "productId1", apolloBrand : null, apolloDecription : "description1"},
    { productId : "productId2", apolloBrand : null, apolloDecription : "description2"},
    { productId : "productId3", apolloBrand : null, apolloDecription : "description3"},
    { productId : "productId4", apolloBrand : null, apolloDecription : "description4"},
    { productId : "productId5", apolloBrand : null, apolloDecription : "description5"},
    { productId : "productId6", apolloBrand : null, apolloDecription : "description6"},
    { productId : "productId7", apolloBrand : null, apolloDecription : "description7"},
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
    { orderId : "orderId1", customerId : "customerId1" , products : [ { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}, { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"} ]},
    { orderId : "orderId2", customerId : "customerId2" , products : [ { productId : "productId1", apolloBrand : "brand1", apolloDecription : "description1"}, { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"} ]},
    { orderId : "orderId3", customerId : "customerId3" , products : [ { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}, { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"} ]},
    { orderId : "orderId4", customerId : "customerId4" , products : [ { productId : "productId2", apolloBrand : "brand2", apolloDecription : "description2"}, { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"} ]},
    { orderId : "orderId5", customerId : "customerId5" , products : [ { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}, { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"} ]},
    { orderId : "orderId6", customerId : "customerId6" , products : [ { productId : "productId3", apolloBrand : "brand3", apolloDecription : "description3"}, { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"} ]},
    { orderId : "orderId7", customerId : "customerId7" , products : [ { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}, { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"} ]},
    { orderId : "orderId8", customerId : "customerId8" , products : [ { productId : "productId4", apolloBrand : "brand4", apolloDecription : "description4"}, { productId : "productId6", apolloBrand : "brand6", apolloDecription : "description6"} ]},
    { orderId : "orderId9", customerId : "customerId9" , products : [ { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}, { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"} ]},
    { orderId : "orderId10", customerId : "customerId10" , products : [ { productId : "productId5", apolloBrand : "brand5", apolloDecription : "description5"}, { productId : "productId7", apolloBrand : "brand7", apolloDecription : "description7"} ]},
]

const resolvers = {
    Query: {
        addressesByCustomerId(parent, args, context, info) {
            const address = customers.find(obj => obj.customerId == args.customerId).address;
            return address;
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
            const address = addresses.find(a => a.addressId == addressRef.addressId);
            return address;
        }
      },
    Customer: {
    __resolveReference(customerRef){
            const customer = customers.find(c => c.customerId == customerRef.customerId && c.address.addressId == customerRef.address.addressId);
            return customer;
        },
    fullname(customer){
        if(customer.name)
            return customer.apolloLastname + " " + customer.name;
        else
            return customer.apolloLastname + " FalseName";
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
            const order = orders.find(ord => ord.orderId == orderRef.orderId && ord.orderCode == orderRef.orderCode);
            return order;
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