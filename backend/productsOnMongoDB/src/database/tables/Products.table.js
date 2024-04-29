// import { Table } from 'dynamodb-toolbox';

// let tableInstance = null;

// const ProductsTable = (docClient) => {
//     if (!tableInstance) {
//         tableInstance = new Table({
//             name: 'products',
//             partitionKey: 'id', // Assuming productId is the partition key
//             DocumentClient: docClient,
//         });
//     }
//     return tableInstance;
// };

// export default ProductsTable;



import dynamoose from 'dynamoose';

let ProductsModel = null;

const initializeProductsModel = (docClient) => {
    if (!ProductsModel) {
        dynamoose.model.defaults.set({
            create: false, // Disable auto-creation of table
            update: false // Disable auto-update of table
        });

        ProductsModel = dynamoose.model('Product', {
            id: String // Assuming id is the partition key
        }, {
            create: false, // Disable auto-creation of table
            update: false, // Disable auto-update of table
            prefix: 'products_' // Optional prefix for table name
        });

        // Use the provided DocumentClient
        ProductsModel.$__.table = table;
    }
    return ProductsModel;
};

export default initializeProductsModel;

// import dynamoose from 'dynamoose';

// const initializeProductsModel = (table) => {
//     if (!ProductsModel) {
//         dynamoose.defaults.set({
//             create: false, // Disable auto-creation of table
//             update: false // Disable auto-update of table
//         });
        
//         ProductsModel = dynamoose.model('Products', {
//             // Schema definition
//         });

//         // Use the provided table
//         ProductsModel.$__.table = table;
//     }
//     return ProductsModel;
// };

// export default initializeProductsModel;
