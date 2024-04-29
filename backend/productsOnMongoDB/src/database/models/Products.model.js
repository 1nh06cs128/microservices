import dynamoose from 'dynamoose';
import productsSchema from '../schema/Products.schema.js'; // Import the schema

// Define the model using the schema where dynamoose.model takes argument as (tableName, schema)
// const ProductsModel = dynamoose.model('products', productsSchema);
const ProductsModel = dynamoose.model('products1', productsSchema, { create: true });



export default ProductsModel;
