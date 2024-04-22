// // User-defined table name
// const tableName = "ProductModelTable";

// const UserModel = {
//     AttributeDefinitions: [
//         { AttributeName: "ProductID", AttributeType: "S" }
//     ],
//     KeySchema: [
//         { AttributeName: "ProductID", KeyType: "HASH" },
//     ],
//     TableName: tableName,
//     // Set provisioned throughput based on your expected usage (optional)
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 2,
//     },
// };

// export { UserModel }

// /**
//  * const UserModel = {
//     AttributeDefinitions: [
//         { AttributeName: "ProductID", AttributeType: "S" }
//         // { AttributeName: "Username", AttributeType: "S" },
//         // { AttributeName: "Email", AttributeType: "S" },
//         // { AttributeName: "FirstName", AttributeType: "S" },
//         // { AttributeName: "LastName", AttributeType: "S" },
//         // { AttributeName: "Age", AttributeType: "N" }, // Numeric data
//         // { AttributeName: "IsAdmin", AttributeType: "B" }, // Boolean flag
//         // { AttributeName: "Roles", AttributeType: "S" }, // Set of strings
//         // { AttributeName: "Preferences", AttributeType: "S" }, // Nested key-value structure
//         // { AttributeName: "RoleType", AttributeType: "S" },
//         // { AttributeName: "Department", AttributeType: "S" },
//         // { AttributeName: "Region", AttributeType: "S" },
//         // { AttributeName: "InvitationDate", AttributeType: "S" },
//         // { AttributeName: "ActivationDate", AttributeType: "S" },
//         // { AttributeName: "TerminationDate", AttributeType: "S" },
//         // { AttributeName: "CreatedAt", AttributeType: "S" },
//         // { AttributeName: "UpdatedAt", AttributeType: "S" },
//     ],
//     KeySchema: [
//         { AttributeName: "ProductID", KeyType: "HASH" },
//     ],
//     TableName: tableName,
//     // Set provisioned throughput based on your expected usage (optional)
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 4,
//         WriteCapacityUnits: 4,
//     },
// };

//  */

// const { Entity, Table } = require('dynamodb-toolbox');
// const { DynamoDB } = require('aws-sdk');

// const DocumentClient = new DynamoDB.DocumentClient();
// const tableName = 'Products';


// const ProductsModel = new Entity({
//     name: 'Product',
//     attributes: {
//         id: { partitionKey: true, type: 'string' },
//         name: 'string',
//         price: 'number',
//         description: 'string',
//         category: 'string',
//         imageUrl: 'string'
//     },
//     table: myTable
// });

// export { ProductsModel }


// using dynamoDB - toolbox

// import { Entity } from 'dynamodb-toolbox';

// let productModelInstance = null;

// const ProductsModel = (table) => {
//     if (!productModelInstance) {
//         productModelInstance = new Entity({
//             name: 'Products',
//             attributes: {
//                 id: {
//                     partitionKey: true,
//                     type: 'string'
//                 },
//                 // created_at: {
//                 //     sortKey: true,
//                 //     type: 'string' // Assuming created_at is a string in ISO format
//                 // },
//                 name: 'string',
//                 description: 'string',
//                 price: 'number',
//                 category: 'string',
//                 imageUrl: 'string',
//                 brand: { type: 'string', map: 'data' },
//                 inventory_available: 'number',
//                 tags: {
//                     type: 'set',
//                     setType: 'string'
//                 },
//                 created_at: {
//                     default: () => new Date().toISOString()
//                 },
//                 updated_at: 'string',
//             },
//             table,
//         });
//     }
//     return productModelInstance;
// };

// export default ProductsModel;

