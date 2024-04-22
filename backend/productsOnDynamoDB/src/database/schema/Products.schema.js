import pkg from 'dynamoose';
const { Schema } = pkg;

const productSchema = new Schema({
    id: {
        type: String,
        hashKey: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: String,
    imageUrl: String,
    brand: String,
    inventory_available: {
        type: Number,
        default: 0
    },
    tags: {
        type: Set,
        schema: [String]
    },
    created_at: {
        type: String,
        default: () => new Date().toISOString()
    },
    updated_at: String
});

export default productSchema;
