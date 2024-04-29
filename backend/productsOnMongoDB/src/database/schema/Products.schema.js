import pkg from 'dynamoose';
import { AppLogger, CallPointInfo } from '../../../../../others/advanceLog.js';
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
    price: Number,
    category: String,
    imageUrl: String,
});

export default productSchema;
